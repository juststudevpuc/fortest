document.querySelector('#registerBtn').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    
    const email = document.querySelector('#regEmail').value;
    const password = document.querySelector('#regPassword').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    if (email === '') {
      alert('Email is required');
      return;
    }
    if (password === '') {
      alert('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Save credentials to localStorage
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    alert('Registration successful! Now you can log in.');
    window.location.href = 'index.html'; // Redirect to login page
  });