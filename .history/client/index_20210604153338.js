document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
});

const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function() {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.nodeValue;
    nameInput.value = '';

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/jason'
        }
    });
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    }
}