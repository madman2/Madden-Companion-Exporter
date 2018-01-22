var teamsTable;

$(document).ready(function() {
    createTable();
    initialize();
});

function createTable() {
    teamsTable = $('#teamsTable').DataTable( {
        pageLength: 32
    } );
}

function initialize() {
    teamsTable.clear();

    $.getJSON('/data').then(function(data) {

        $.each(data, function() {
            teamsTable.row.add([this.teamId, this.cityName, this.displayName, this.injuryCount, this.ovrRating]);
        });

        teamsTable.draw();
    });
}