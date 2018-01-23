var dataTable;

$(document).ready(function() {
    showLeagueTeams();
});

function showLeagueTeams() {
    $.getJSON('/leagueteams').then(function(data) {

        var columnNames = Object.keys(data['0']);
        var titlesArr = [];

        $.each(columnNames, function() {
            titlesArr.add( { title: this });
        });

        dataTable = $('#dataTable').DataTable( {
            columns: titlesArr
        });

        // $.each(data, function() {
        //     teamsTable.row.add(this.);
        // });

        teamsTable.draw();
    });
}