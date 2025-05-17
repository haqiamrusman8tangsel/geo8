// ===== login.js =====
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
      let userClass = '';

      rows.forEach(row => {
        const [username, password, kelas] = row.trim().split(',');
        if (username === inputUsername && password === inputPassword) {
          found = true;
          localStorage.setItem('loggedInUser', username);
          localStorage.setItem('loggedInClass', kelas || 'Kelas belum diatur');
        }
      });

      if (found) {
        window.location.href = 'home.html';
      } else {
        document.getElementById('result').textContent = 'Username atau password salah.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').textContent = 'Gagal mengambil data.';
    });
});


// ===== auth.js =====
(function() {
  const username = localStorage.getItem('loggedInUser');
  const userClass = localStorage.getItem('loggedInClass') || "Kelas belum diatur";

  if (!username) {
    window.location.href = 'index.html';
  }

  // Isi nama pengguna
  document.querySelectorAll('.user-name').forEach(el => el.textContent = username);

  const profileUsername = document.getElementById('profile-username');
  const profileClass = document.getElementById('profile-class');

  if (profileUsername) profileUsername.textContent = username;
  if (profileClass) profileClass.textContent = userClass;

  // Fungsi logout global
  window.logout = function() {
    localStorage.clear();
    window.location.href = 'index.html';
  }
})();
