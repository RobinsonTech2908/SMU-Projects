var table_data = data; // from data.js
$(document).ready(function() {

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
    buildUniqueFilterHelper("Country", "country");
    buildUniqueFilterHelper("Region", "region");
    buildUniqueFilterHelper("Income_Group", "income");
}

function resetFilters() {
    $("#year").val("");
    $("#year").text("");

    $("#country").val("");
    $("#region").val("");
    $("#income").val("");
}

function buildUniqueFilterHelper(colName, filterID) {
    var unq_column = [...new Set(table_data.map(x => x[colName]))];
    unq_column = unq_column.sort();
    unq_column.forEach(function(val) {
        var newOption = `<option>${val}</option>`;
        $(`#${filterID}`).append(newOption);
    });
}

function buildTable() {
    var yearFilter = $("#year").val(); //gets input value to filter
    var countryFilter = $("#country").val();
    var regionFilter = $("#region").val();
    var incomeFilter = $("#income").val();

    //apply filters
    var filteredData = table_data;
    if (yearFilter) {
        filteredData = filteredData.filter(row => row.Year === yearFilter);
    }
    if (countryFilter) {
        filteredData = filteredData.filter(row => row.Country === countryFilter);
    }
    if (regionFilter) {
        filteredData = filteredData.filter(row => row.Region === regionFilter);
    }
    if (incomeFilter) {
        filteredData = filteredData.filter(row => row.Income_Group === incomeFilter);
    }

    // see if we have any data left
    if (filteredData.length === 0) {
        alert("No Data Found!");
    }

    buildTableString(filteredData);
}

function buildTableString(data) {

    // JQUERY creates an HTML string
    var tbody = $("#who-table>tbody");
    //clear table
    tbody.empty();

    //destroy datatable
    $("#who-table").DataTable().clear().destroy();

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
    $("#who-table").DataTable({
        dom: 'Bfrtip', //lbfrtip if you want the length changing thing
        buttons: [
            { extend: 'copyHtml5' },
            { extend: 'excelHtml5' },
            { extend: 'csvHtml5' },
            {
                extend: 'pdfHtml5',
                title: function() { return "WHO Data"; },
                orientation: 'portrait',
                pageSize: 'LETTER',
                text: 'PDF',
                titleAttr: 'PDF'
            }
        ]
    });

}