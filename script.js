document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const inputUsername = document.getElementById('username').value;
  const inputPassword = document.getElementById('password').value;

  const sheetURL = 'https://docs.google.com/spreadsheets/d/ID_SHEET_KAMU/export?format=csv'; // Ganti ID sheet kamu

  fetch(sheetURL)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n').slice(1);
      let found = false;

      rows.forEach(row => {
        const [username, password] = row.trim().split(',');
        if (username === inputUsername && password === inputPassword) {
          found = true;
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
