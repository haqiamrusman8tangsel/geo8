document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const inputUsername = document.getElementById('username').value.trim();
  const inputPassword = document.getElementById('password').value.trim();

  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEELB6ndEDdYqp6W08qaU26J6iMT1X13P6oCZt-QtKZ9C9VnwWTvKGKQgPCS5tsT-hxMem82VuxSnH/pub?output=csv';

  fetch(sheetURL)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n').slice(1);
      let found = false;

      rows.forEach(row => {
        const [username, password] = row.trim().split(',');
        if (username && password && username.trim() === inputUsername && password.trim() === inputPassword) {
          found = true;
          localStorage.setItem('loggedInUser', username.trim()); // Simpan nama user
        }
      });

      if (found) {
        window.location.href = "home.html";
      } else {
        document.getElementById('result').textContent = 'Username atau password salah.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').textContent = 'Gagal mengambil data.';
    });
});
