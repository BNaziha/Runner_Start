class cal {

    static speed(distance, time) {
        return distance / time;
    }

    static BMI(weight, height) {
        return weight / (height * height);
    }

    static BMR(weight, height, age) {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    }

    static caloriesBurned(weight, distance, time) {
        var Met = 0.2 + (0.9 * (speed(distance, time) / 3.6));
        return Met * weight * time;
    }

    static TDEE(weight, height, age, distance, time) {
        return BMR(weight, height, age) + caloriesBurned(weight, distance, time);
    }

}

let dataArrDist = new Array(12).fill(0);
// let dataArr = [];

$(document).ready(function () {

    let urlParams = new URLSearchParams(window.location.search);
    let myID = urlParams.get('id');
    if (myID == null) {
        window.location.href = "./login.html";
    }

    CaloriesChart();
    // DistChart();

    let user;
    $.get("../server/getUser.php?id=" + myID, function (data) {
        user = JSON.parse(data);
        console.log(user);
    });

    $.get("../server/dashboard.php?id=" + myID, function (data) {
        let obj = JSON.parse(data);
        let totalDistance = 0;
        let totalCalories = 0;
        let totalTime = 0;
        let totalSpeed = 0;
        console.log(obj);
        obj.data.forEach(element => {
            totalDistance += parseFloat(element.Distance);   
            totalTime += parseFloat(element.Temps);
            totalCalories += parseInt(element.calories_burned);
            totalSpeed += parseFloat(element.speed);
        });

        totalSpeed /= obj.data.length;
        $("#totalTime").html(totalTime.toFixed(2));
        $("#totalDist").html(totalDistance.toFixed(2));
        $("#totalCal").html(totalCalories);
        $("#avgSpeed").html(totalSpeed.toFixed(2));
        // $("#totalDistance").html(data);
    })

    $.get("../server/dashboardMonthly.php?id=" + myID, function (data) {
        let obj = JSON.parse(data);
        console.log(obj);
        console.log(somDist(obj.Jan));
        dataArrDist[0] = parseFloat(somDist(obj.Jan));
        dataArrDist[1] = parseFloat(somDist(obj.Feb));
        dataArrDist[2] = parseFloat(somDist(obj.Mar));
        dataArrDist[3] = parseFloat(somDist(obj.Apr));
        dataArrDist[4] = parseFloat(somDist(obj.May));
        dataArrDist[5] = parseFloat(somDist(obj.Jun));
        dataArrDist[6] = parseFloat(somDist(obj.Jul));
        dataArrDist[7] = parseFloat(somDist(obj.Aug));
        dataArrDist[8] = parseFloat(somDist(obj.Sep));
        dataArrDist[9] = parseFloat(somDist(obj.Oct));
        dataArrDist[10] = parseFloat(somDist(obj.Nov));
        dataArrDist[11] = parseFloat(somDist(obj.Dec));

        DistChart();
    });
});

function somDist(arr)
{
    if(arr == null)
    {
        return 0;
    }
    let sum = 0;
    arr.forEach(element => {
        sum += element.Distance;
    });
    return sum;
}

function DistChart() {
    const ctx = $('#Dist-graph');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Distance',
                    data: dataArrDist,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                // {
                //     label: 'Total Minutes',
                //     data: [120, 150, 180, 160, 200, 190, 220, 210, 240, 230, 250, 270],
                //     backgroundColor: 'rgba(192, 75, 192, 0.2)',
                //     borderColor: 'rgba(192, 75, 192, 1)',
                //     borderWidth: 1
                // },
                // {
                //     label: 'Total Calories',
                //     data: [500, 600, 550, 700, 650, 600, 750, 800, 750, 900, 850, 950],
                //     backgroundColor: 'rgba(192, 192, 75, 0.2)',
                //     borderColor: 'rgba(192, 192, 75, 1)',
                //     borderWidth: 1
                // }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function CaloriesChart() {
    const ctx = $('#Calories-Graph');
    const myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'],
            datasets: [
                {
                    label: 'Total Calories',
                    data: [500, 600, 550, 700, 650, 600, 750, 800, 750, 900, 850, 950],
                    backgroundColor: 'rgba(192, 75, 192, 0.2)',
                    borderColor: 'rgba(192, 75, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}