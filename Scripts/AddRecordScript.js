$(document).ready(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let myID = urlParams.get('id');
    $("#dashboard").attr("href", "./dashboard.html?id=" + myID);

    const BMI_HEADS = $('.bmi-head');
    const BMI_USC = $('#bmi-usc');
    const BMI_SI = $('#bmi-si');
    const CALC_BTN = $('#calc-btn');
    const CLR_BTN = $('#clr-btn');
    let activeForm;
    
    function getTimeAndDistance() {
        const h = $('#hours').val();
        const m = $('#minutes').val();
        const s = $('#seconds').val();
        
        const time = h * 10000 + m * 100 + s * 1;
        const distance = $('#distance').val();
        return { time, distance };
    }

    function add()
    {
        let urlParams = new URLSearchParams(window.location.search);
        let myID = urlParams.get('id');
        // console.log(myID);


        const timeAndDistance = getTimeAndDistance();
        const url = `../server/addRecord.php`;
        const params = {
            UserID: myID,
            time: timeAndDistance.time,
            distance: timeAndDistance.distance
        };
        $.get(url, params, function(response) {
            if(response == true)
            {
                $('#hours').val('');
                $('#minutes').val('');
                $('#seconds').val('');
                $('#distance').val('');
                $('#message').html('Record added successfully!');
            }
            else
            {
                alert("Error: " + response);
            }
        });
        
    }

    // event listeners
    $(window).on('DOMContentLoaded', function() {
        BMI_USC.addClass('show-bmi');
        activeForm = "bmi-usc";
    });

    CALC_BTN.on('click', add);
    CLR_BTN.on('click', function() {
        $('form').each(function() {
            this.reset();
        });
        clearBMIInfo();
    });

    // clear BMI Info
    function clearBMIInfo() {
        $('#bmi-value').html("");
        $('#bmi-category').html("");
        $('#bmi-gender').html("");
    }

    // bmi calculation form toggle
    BMI_HEADS.on('click', function() {
        if ($(this).attr('id') === "bmi-usc-head") {
            removeActiveClass();
            clearBMIInfo();
            $(this).addClass('active-head');
            BMI_SI.removeClass('show-bmi');
            BMI_USC.addClass('show-bmi');
            activeForm = "bmi-usc";
        }
        if ($(this).attr('id') === "bmi-si-head") {
            removeActiveClass();
            clearBMIInfo();
            $(this).addClass('active-head');
            BMI_USC.removeClass('show-bmi');
            BMI_SI.addClass('show-bmi');
            activeForm = "bmi-si";
        }
    });

    // remove active class from heads
    function removeActiveClass() {
        BMI_HEADS.removeClass('active-head');
    }

    // main bmi calculation function
    function performBMICalc() {
        let BMIInfo = getUserInput();
        if (BMIInfo) printBMIResult(BMIInfo);
    }

    // get input values
    function getUserInput() {
        let status;
        // get input values from us units
        if (activeForm === "bmi-usc") {
            let age = $('#age1').val();
            let gender = $('input[name="gender"]:checked').val();
            let heightFeet = $('#feet').val();
            let heightInches = $('#inches').val();
            let weightPounds = $('#pounds').val();

            status = checkInputStatus([age, heightFeet, heightInches, weightPounds]);

            if (status == true) {
                return calculateBMI({
                    gender,
                    age,
                    height: parseFloat(heightFeet) * 12 + parseFloat(heightInches),
                    weight: parseFloat(weightPounds)
                });
            }
        }

        // get input values form metric units
        if (activeForm === "bmi-si") {
            let age = $('#age2').val();
            let gender = $('input[name="gender"]:checked').val();
            let heightCm = $('#cm').val();
            let weightKg = $('#kg').val();

            status = checkInputStatus([age, heightCm, weightKg]);

            if (status === true) {
                return calculateBMI({
                    gender,
                    age,
                    height: parseFloat(heightCm) / 100,
                    weight: parseFloat(weightKg)
                });
            }
        }

        $('.alert-error').css('display', 'block');
        setTimeout(function() {
            $('.alert-error').css('display', 'none');
        }, 1000);
        return false;
    }

    function checkInputStatus(inputs) {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].trim() === "" || isNaN(inputs[i])) return false;
        }
        return true;
    }

    // calculate BMI Value
    function calculateBMI(values) {
        let BMI;
        if (activeForm === 'bmi-usc') {
            BMI = (703 * (values.weight / Math.pow(values.height, 2))).toFixed(2);
        } else {
            BMI = (values.weight / Math.pow(values.height, 2)).toFixed(2);
        }
        return {
            gender: values.gender,
            BMI
        };
    }

    // print BMI result information
    function printBMIResult(BMIInfo) {
        $('#bmi-value').html(`${BMIInfo.BMI} kg/m<sup>2</sup>`);

        let bmiCategory;
        if (BMIInfo.BMI < 18.5) {
            bmiCategory = "Underweight";
        } else if (BMIInfo.BMI >= 18.5 && BMIInfo.BMI <= 24.9) {
            bmiCategory = "Normal Weight";
        } else if (BMIInfo.BMI >= 25 && BMIInfo.BMI <= 29.9) {
            bmiCategory = "Overweight";
        } else {
            bmiCategory = "Obesity";
        }

        $('#bmi-category').html(`${bmiCategory}`);
        $('#bmi-gender').html(BMIInfo.gender);
    }
});
