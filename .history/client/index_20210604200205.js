document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
});

const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function() {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = '';

    fetch('http://localhost:5000/insert', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(data => {
            insertRowIntoTable(data['data'])
        });
}

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableEmpty = document.querySelector('.no-data');

    let tableHTML = "<tr>";

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key].toLocaleString())
            }
            tableHTML += `<td>${data[key]}</td>`;
        }
    }

    tableHTML += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;
    tableHTML += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;

    tableHTML += "</tr>";

    if (isTableEmpty) {
        table.innerHTML = tableHTML;
    } else {
        const newTableRow = table.insertRow();
        newTableRow.innerHTML = tableHTML;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<><td class='no-data' colspan='5'>No Data</td></>";
    } else {
        let tableHTML = "";

        data.forEach(({ id, name, date_added }) => {
            tableHTML += "<tr>";
            tableHTML += `<td>${id}</td>`;
            tableHTML += `<td>${name}</td>`;
            tableHTML += `<td>${new Date(date_added).toLocaleString()}</td>`;
            tableHTML += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
            tableHTML += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
            tableHTML += "</tr>";
        });

        table.innerHTML = tableHTML;
    }
}