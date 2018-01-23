var dataTable;

$(document).ready(function() {
    showData('freeagents');
});

function showData(request) {
    $.getJSON('/' + request).then(function(data) {

        var columnNames = Object.keys(data['0']);
        var titlesArr = [];

        $.each(columnNames, function() {
            titlesArr.push( { title: camelCaseToTitle(this) } );
        });

        dataTable = $('#dataTable').DataTable( {
            columns: titlesArr
        });

        $.each(data, function() {
            dataTable.row.add(Object.values(this));
        });

        dataTable.draw();
    });
}

function camelCaseToTitle(category) {
    var transitions = [];
    for (var i = 1; i < category.length; ++i) {
        var c1 = category.charAt(i - 1);
        var c2 = category.charAt(i);
        if (c1 == c1.toLowerCase() && c2 == c2.toUpperCase()) {
            transitions.push(i);
        }
    }

    var title = category.charAt(0).toUpperCase();
    var counter = 1;
    for (var j = 0; j < transitions.length; ++j) {
        title = title.concat(category.substring(counter, transitions[j]), ' ');
        counter = transitions[j];
    }
    title = title.concat(category.substring(counter));

    return title;
}