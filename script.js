
// ========== LOGIN HANDLER ==========
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
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
  }

  // ========== AUTENTIKASI OTOMATIS DI HALAMAN LAIN ==========
  const username = localStorage.getItem('loggedInUser');
  const userClass = localStorage.getItem('loggedInClass') || "Kelas belum diatur";

  // Untuk halaman yang butuh otentikasi, seperti home/profil
  if (document.body.classList.contains('auth-required') && !username) {
    window.location.href = 'index.html';
  }

  // Tampilkan nama di elemen dengan class atau id tertentu
  document.querySelectorAll('.user-name, #user-name, #user-name-2, #namaUser').forEach(el => {
    if (username) el.textContent = username;
  });

  const classSpan = document.getElementById('kelasUser');
  if (classSpan && userClass) {
    classSpan.textContent = userClass;
  }

  // Fungsi logout global
  window.logout = function () {
    localStorage.clear();
    window.location.href = 'index.html';
  };
});
