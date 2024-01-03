//use jquery to get the value from database and display it in the text box
$(document).ready(function () {

    $("#dashboard").attr("href", "Dashboard.html");

    $.get("../server/getUser.php", function (response) {
        let temp = JSON.parse(response);
        console.log(temp);
        if (temp.response) {
            let info = temp.data;
            $("#txtName").html(info.Nom);
            $("#txtEmail").html(info.Email);
            $("#txtGender").html(info.Sexe);
            $("#txtBirthday").html(info.DateNaissance);
            $("#txtHeight").val(info.Taille);
            $("#txtWeight").val(info.Poids);
        }
    });

    $("#btnUpdate").click(function (event) {
        event.preventDefault();
        //confirm that the height and weight are numbers and not empty
        if (isNaN($("#txtHeight").val()) || $("#txtHeight").val() == "") {
            alert("Height must be a number");
            return;
        }
        if (isNaN($("#txtWeight").val()) || $("#txtWeight").val() == "") {
            alert("Weight must be a number");
            return;
        }

        //send new data to the server
        let height = $("#txtHeight").val();
        let weight = $("#txtWeight").val();
        $.get("../server/updateUser.php", { id: id, height: height, weight: weight }, function (response) {
            let temp = JSON.parse(response);
            
            if (temp) {
                alert("Update successful");
            } else {
                alert("Update failed");
            }
        });
    });
});