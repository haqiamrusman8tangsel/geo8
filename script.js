document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const inputUsername = document.getElementById('username').value;
  const inputPassword = document.getElementById('password').value;

  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEELB6ndEDdYqp6W08qaU26J6iMT1X13P6oCZt-QtKZ9C9VnwWTvKGKQgPCS5tsT-hxMem82VuxSnH/pub?output=csv'; // Ganti dengan link CSV kamu

  fetch(sheetURL)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n').slice(1); // skip header
      let found = false;

      rows.forEach(row => {
        const [username, password] = row.trim().split(',');

        if (username === inputUsername && password === inputPassword) {
          found = true;
        }
      });

      const result = document.getElementById('result');
      if (found) {
        result.textContent = 'Login berhasil!';
      } else {
        result.textContent = 'Username atau password salah.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
