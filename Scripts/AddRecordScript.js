$(document).ready(function() {
    $("#dashboard").attr("href", "./dashboard.html");

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
