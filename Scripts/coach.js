    $.get('../server/coach.php', function(data) {
        let members = JSON.parse(data);
        let html = '';
        for (let i = 0; i < members.length; i++) {
            html += '<div class="col-sm-4">';
            html += '<div class="card">';
            html += '<div class="card-body">';
            html += '<h5 class="card-title">' + members[i].Nom + '</h5>';
            html += '<p class="card-text">' + members[i].Email + '</p>';
            html += '<p class="card-text">' + members[i].DateNaissance + '</p>';
            html += '<p class="card-text">' + members[i].Sexe + '</p>';
            html += '<p class="card-text">' + members[i].calories + '</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
        $('#coach').html(html);

});
    
