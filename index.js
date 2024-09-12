document.addEventListener('DOMContentLoaded', function() {
    loadTableData(); // Load table data from localStorage on page load

    document.getElementById('Registration Form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        if (!isValidEmail(email)) {
            alert('Invalid email address.');
            return;
        }

        // Validate date of birth
        const dobDate = new Date(dob);
        const today = new Date();
        const minAge = 18;
        const maxAge = 55;

        if (!isValidDate(dobDate, today, minAge, maxAge)) {
            alert('You must be between 18 and 55 years old.');
            return;
        }

        addRowToTable(name, email, password, dob, termsAccepted);
        saveDataToLocalStorage(name, email, password, dob, termsAccepted);
        document.getElementById('Registration Form').reset();
    });
});

function isValidDate(dob, today, minAge, maxAge) {
    if (isNaN(dob.getTime())) {
        return false; // Invalid date
    }

    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age >= minAge && age <= maxAge;
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function addRowToTable(name, email, password, dob, termsAccepted) {
    const tableBody = document.querySelector('#dataTable tbody');
    const newRow = tableBody.insertRow();

    newRow.insertCell().textContent = name;
    newRow.insertCell().textContent = email;
    newRow.insertCell().textContent = password;
    newRow.insertCell().textContent = dob;
    newRow.insertCell().textContent = termsAccepted ? 'Yes' : 'No';
}

function saveDataToLocalStorage(name, email, password, dob, termsAccepted) {
    let data = JSON.parse(localStorage.getItem('formData')) || [];
    data.push({ name, email, password, dob, termsAccepted });
    localStorage.setItem('formData', JSON.stringify(data));
}

function loadTableData() {
    const data = JSON.parse(localStorage.getItem('formData')) || [];
    data.forEach(item => addRowToTable(item.name, item.email, item.password, item.dob, item.termsAccepted));
}
