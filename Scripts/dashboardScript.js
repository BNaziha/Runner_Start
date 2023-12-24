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

$(document).ready(function () {

    let urlParams = new URLSearchParams(window.location.search);
    let myID = urlParams.get('id');
    if (myID == null) {
        window.location.href = "./login.html";
    }

    CaloriesChart();
    DistChart();

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
});



function DistChart() {
    const ctx = $('#Dist-graph');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Distance',
                    data: [10, 20, 15, 25, 30, 20, 35, 40, 45, 50, 40, 55],
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
        // options: {
        //     scales: {
        //         y: {
        //             beginAtZero: true
        //         }
        //     }
        // }
    });
}