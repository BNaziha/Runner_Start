
$(document).ready(function() {
    const sign_in_btn = $("#sign-in-btn");
    const sign_up_btn = $("#sign-up-btn");
    const container = $(".container");
    const sign_in_btn2 = $("#sign-in-btn2");
    const sign_up_btn2 = $("#sign-up-btn2");

    sign_up_btn.on("click", function() {
        container.addClass("sign-up-mode");
    });

    sign_in_btn.on("click", function() {
        container.removeClass("sign-up-mode");
    });

    sign_up_btn2.on("click", function() {
        container.addClass("sign-up-mode2");
    });

    sign_in_btn2.on("click", function() {
        container.removeClass("sign-up-mode2");
    });

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    $(".email").keydown(function() {
        let email = $(".email").val();
        if (validateEmail(email)) {
            $(".input-email").css("border", "2px solid rgb(129, 197, 154)");
            
        } else {
            $(".input-email").css("border", "2px solid red");   
        }
            
    });
    
    
    function validatePasscode(passcode) {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(passcode);
    }

    $(".password").keyup(function() {
        let pass = $(".password").val();
        if (validatePasscode(pass)) {
            $(".input-password").css("border", "2px solid rgb(129, 197, 154)");
            
        } else {
            $(".input-password").css("border", "2px solid red");   
        }
            
    });

    $(".input-full-name").keyup(function() {

        let name = $(".input-full-name").val();
        if (name != "") {
            $(".full-name").css("border", "2px solid rgb(129, 197, 154)");
            
        } else {
            $(".full-name").css("border", "2px solid red");   
        }
            
    });


    $(".login-btn").click(function(event) {
        event.preventDefault();
        var email = $(".email-login").val();
        $.get("../server/verifyEmail.php?email=" + email, function(data) {
            $("#email-result").html(data);
        });
    });
    

    $(".submit").click(function(event) {
        let email = $(".email").val();
        let pass = $(".password").val();
        if (validateEmail(email)
        && validatePasscode(pass) 
        && $(".full-name").val() != ""
        && $(".date").val() != ""
        && $(".gender").val() != ""
        ) {
            $(".input-email").css("border", "2px solid rgb(129, 197, 154)");
            $(".input-password").css("border", "2px solid rgb(129, 197, 154)");
            $(".full-name").css("border", "2px solid rgb(129, 197, 154)");
            alert("Login successful");

        } else {
            $(".input-email").css("border", "2px solid red");
            $(".input-password").css("border", "2px solid red");
            $(".full-name").css("border", "2px solid red");
            alert("Login failed");
            event.preventDefault();
        }
    });
});


function validateForm() {
    var email = document.forms["myForm"]["email"].value;
    var passcode = document.forms["myForm"]["passcode"].value;
    if (email == "") {
        alert("Email must be filled out");
        return false;
    }
    if (passcode == "") {
        alert("Passcode must be filled out");
        return false;
    }
    if (!validateEmail(email)) {
        alert("Email is not valid");
        return false;
    }
    if (!validatePasscode(passcode)) {
        alert("Passcode is not valid");
        return false;
    }
}

