document.getElementById('Registration Form').addEventListener('submit', function(event) {
    const dobInput = document.getElementById('dob');
    const dobError = document.getElementById('dobError');
    const dob = new Date(dobInput.value);
    const today = new Date();
    const minAge = 18;
    const maxAge = 55;
    
    if (isValidDate(dob, today, minAge, maxAge)) {
        dobError.style.display = 'none';
    } else {
        dobError.style.display = 'block';
        event.preventDefault();
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
