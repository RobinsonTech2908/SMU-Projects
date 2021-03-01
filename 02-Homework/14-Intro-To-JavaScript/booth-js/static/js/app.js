var table_data = data; // from data.js

$(document).ready(function() {
    // console.log("page loaded");
    // console.log(table_data);
    buildFilters();
    buildTable();

    //Event Listeners
    $("#filter-btn").on("click", function(e) {
        e.preventDefault();
        buildTable();
    });
    $("#filter-clear").on("click", function(e) {
        e.preventDefault();
        resetFilters();
    });
    $("#form").on("submit", function(e) {
        e.preventDefault();
        buildTable();
    });
});

function buildFilters() {
    buildUniqueFilterHelper("country", "country");
    buildUniqueFilterHelper("state", "state");
    buildUniqueFilterHelper("shape", "shape");
}

function resetFilters() {
    $("#datetime").val("");
    $("#datetime").text("");

    $("#city").val("");
    $("#city").text("");

    $("#state").val("");
    $("#country").val("");
    $("#shape").val("");
}

function buildUniqueFilterHelper(colName, filterID) {
    var unq_column = [...new Set(table_data.map(x => x[colName]))];
    unq_column = unq_column.sort();
    unq_column.forEach(function(val) {
        var newOption = `<option>${val.toUpperCase()}</option>`;
        $(`#${filterID}`).append(newOption);
    });
}

function buildTable() {
    var dateFilter = $("#datetime").val(); //gets input value to filter
    var cityFilter = $("#city").val();
    var stateFilter = $("#state").val();
    var countryFilter = $("#country").val();
    var shapeFilter = $("#shape").val();

    //apply filters
    var filteredData = table_data;
    if (dateFilter) {
        filteredData = filteredData.filter(row => Date.parse(row.datetime) === Date.parse(dateFilter));
    }
    if (cityFilter) {
        filteredData = filteredData.filter(row => row.city === cityFilter.toLowerCase());
    }
    if (stateFilter) {
        filteredData = filteredData.filter(row => row.state === stateFilter.toLowerCase());
    }
    if (countryFilter) {
        filteredData = filteredData.filter(row => row.country === countryFilter.toLowerCase());
    }
    if (shapeFilter) {
        filteredData = filteredData.filter(row => row.shape === shapeFilter.toLowerCase());
    }

    // see if we have any data left
    if (filteredData.length === 0) {
        alert("No Data Found!");
    }

    buildTableString(filteredData);
}

function buildTableString(data) {

    // JQUERY creates an HTML string
    var tbody = $("#ufo-table>tbody");
    //clear table
    tbody.empty();

    //destroy datatable
    $("#ufo-table").DataTable().clear().destroy();

    //append data
    data.forEach(function(row) {
        var newRow = "<tr>"
            // loop through each Object (dictionary)
        Object.entries(row).forEach(function([key, value]) {
            // set the cell data
            newRow += `<td>${value}</td>`
        });

        //append to table
        newRow += "</tr>";
        tbody.append(newRow);
    });

    //redraw
    $("#ufo-table").DataTable({
        dom: 'Bfrtip', //lbfrtip if you want the length changing thing
        buttons: [
            { extend: 'copyHtml5' },
            { extend: 'excelHtml5' },
            { extend: 'csvHtml5' },
            {
                extend: 'pdfHtml5',
                title: function() { return "UFO Observations"; },
                orientation: 'portrait',
                pageSize: 'LETTER',
                text: 'PDF',
                titleAttr: 'PDF'
            }
        ]
    });

}