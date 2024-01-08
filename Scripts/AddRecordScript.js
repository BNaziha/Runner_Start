let isCoach = false;

$(document).ready(function() {
    $("#dashboard").attr("href", "./dashboard.html");


    refresh();
    

    $('#coach').click(function() {
        if(!isCoach) {
            $.get('../server/createGrp.php');
            refresh();
        }
});

    $('#join_group').click(function() {
        const url = `../server/insertGroup.php`;
        const params = {
            groupeID: $('#groupID').val()
        };
        $.get(url, params, function(response) {
            let obj = JSON.parse(response);
            if(ob.response)
            {
                $('#groupID').val('');
                $('#message').html('Member joined successfully!');
            }
            else
            {
                alert("Error: " + obj);
            }
        });
    });


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
        const timeAndDistance = getTimeAndDistance();
        const url = `../server/addRecord.php`;
        const params = {
            time: timeAndDistance.time,
            distance: timeAndDistance.distance
        };
        $.get(url, params, function(response) {
            if(response)
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

    $('.logout-btn').click(function() {
        $.get('../server/disconnect.php', function() {});
    });

    $('#add').click(function() {
        add();
    });

    $('#clear').click(function() {
        $('#hours').val('');
        $('#minutes').val('');
        $('#seconds').val('');
        $('#distance').val('');
        $('#message').html('');
    });
});

function refresh() {
    $.get('../server/isCoach.php', function(data) {
        let obj = JSON.parse(data);
        isCoach = obj.response;
        if(obj.response) {
            $("#member").hide();
            $("#grpID").html("You are the coach of groupe : " + obj.groupeID);
        }
        else {
            $.get('../server/isMember.php', function(data) {
                let obj = JSON.parse(data);
                if(!obj.response) {
                    $("#coach").hide();
                }
                else {
                    $("#coach").hide();
                    $("#member").hide();
                }
            });
        }
    });
}
