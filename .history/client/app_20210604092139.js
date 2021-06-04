document.addEventListener('DOMContentLoaded', function() {
    loadHTMLTable([]);
});

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    let tableHTML = '';

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' columnSpan: 5></td></tr>";
    }
}