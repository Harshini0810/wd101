document.getElementById('Registration Form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    const dobDate = new Date(dob);
    const today = new Date();
    const minAge = 18;
    const maxAge = 55;

    if (isValidDate(dobDate, today, minAge, maxAge)) {
        addRowToTable(name, email, password, dob, termsAccepted);
  
        document.getElementById('registrationForm').reset();
    } else {
        alert('You must be between 18 and 55 years old.');
    }
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

function addRowToTable(name, email, password, dob, termsAccepted) {
    const tableBody = document.querySelector('#dataTable tbody');
    const newRow = tableBody.insertRow();

    newRow.insertCell().textContent = name;
    newRow.insertCell().textContent = email;
    newRow.insertCell().textContent = password;
    newRow.insertCell().textContent = dob;
    newRow.insertCell().textContent = termsAccepted ? 'Yes' : 'No';
}
