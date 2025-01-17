function logBtn() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  
    // Retrieve registered credentials from localStorage
    const registeredEmail = localStorage.getItem('registeredEmail');
    const registeredPassword = localStorage.getItem('registeredPassword');
  
    if (email === '') {
      alert('Email is required');
      return;
    }
    if (password === '') {
      alert('Password is required');
      return;
    }
    if (email === registeredEmail && password === registeredPassword) {
      localStorage.setItem('isLoginSuccess', 'true');
      localStorage.setItem('email', email);
  
      alert('Login successful!');
      window.location.href = 'dashboad.html';
    } else {
      alert('Invalid username or password');
    }
  }
  
  document.querySelector('#signInBtn').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    logBtn();
  });
  