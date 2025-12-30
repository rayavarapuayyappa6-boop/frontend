/* ==================================================
   SPA NAVIGATION
================================================== */

// Track auth state for UI (login button visibility)
let isLoggedIn = false;

function showSection(id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (!target) return;

  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Show search only on home
  const searchBox = document.getElementById('globalSearch');
  if (searchBox) {
    const show = id === 'home';
    searchBox.style.display = show ? '' : 'none';
    searchBox.setAttribute('aria-hidden', show ? 'false' : 'true');
  }

  // LOGIN BUTTON (UNCHANGED LOGIC)
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    if (['login', 'register', 'forgot'].includes(id)) {
      loginBtn.style.display = 'none';
    } else {
      loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    }
  }

  // ADMISSIONS & CONTACT — SHOW ONLY ON HOME
  const admissionsBtn = document.getElementById('admissionsBtn');
  const contactBtn = document.getElementById('contactBtn');

  if (id === 'home') {
    if (admissionsBtn) admissionsBtn.style.display = 'inline-block';
    if (contactBtn) contactBtn.style.display = 'inline-block';
  } else {
    if (admissionsBtn) admissionsBtn.style.display = 'none';
    if (contactBtn) contactBtn.style.display = 'none';
  }

  // Re-trigger animations when returning home
  if (id === "home") {
    retriggerHomeAnimations();
  }
}


/* ==================================================
   PASSWORD SHOW / HIDE
================================================== */
function togglePassword() {
  const input = document.getElementById("passwordInput");
  const toggle = document.querySelector(".toggle-password");

  if (!input || !toggle) return;

  if (input.type === "password") {
    input.type = "text";
    toggle.textContent = "Hide";
  } else {
    input.type = "password";
    toggle.textContent = "Show";
  }
}

/* ==================================================
   LOGIN & ROLE-BASED DASHBOARD
================================================== */
function login() {
  const roleSelect = document.getElementById("roleSelect");
  const title = document.getElementById("dashboardTitle");
  const cards = document.getElementById("dashboardCards");
  const loginBtn = document.getElementById("loginBtn");

  if (!roleSelect || !title || !cards || !loginBtn) {
    console.error("Required dashboard elements missing");
    return;
  }

  const role = roleSelect.value;
  if (!role) {
    alert("Please select a role");
    return;
  }

  // Mark user as logged in
  isLoggedIn = true;

  // Clear old dashboard content
  cards.innerHTML = "";

  /* ================= STUDENT DASHBOARD ================= */
  if (role === "Student") {
    title.textContent = "Student Dashboard";

    cards.innerHTML = `
      <div class="card highlight animate-fade-in">
        <h4>🍽️ Today’s Menu</h4>
        <p>Breakfast: Idli, Sambar</p>
        <p>Lunch: Rice, Dal, Chicken Curry</p>
        <p>Dinner: Chapati, Paneer Curry</p>
      </div>

      <div class="card animate-fade-in">
        <h4>📊 Attendance Summary</h4>
        <p>Present Days: <b>22</b></p>
        <p>Inactive Days: <b>3</b></p>
        <p>Total Days: <b>25</b></p>
        <div style="display:flex;gap:10px;margin-top:8px;">
          <button class="btn small-btn" onclick="viewAttendance()">View Attendance</button>
          <button class="btn small-btn" onclick="confirmMessInactive()">Mark Inactive</button>
        </div>
      </div>

      <div class="card animate-fade-in">
        <h4>💳 Payments</h4>
        <button class="btn small-btn">Pay Hostel Fees</button><br>
        <button class="btn small-btn">Pay Mess Bill</button>
      </div>

      <div class="card animate-fade-in">
        <h4>🎉 Upcoming Events</h4>
        <ul>
          <li>New Year Celebration – 31 Dec</li>
          <li>Hostel Day – 15 Jan</li>
          <li>Mess Special Day – Monthly</li>
        </ul>
      </div>

      <div class="card animate-fade-in">
        <h4>🔔 Notifications</h4>
        <ul class="notification-list">
          <li>Mess bill due by 25th</li>
          <li>Water maintenance tomorrow</li>
          <li>Weekly menu updated</li>
        </ul>
      </div>

      <div class="card full-width animate-fade-in">
        <h4>📅 Weekly Mess Menu</h4>
        <table class="menu-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Sunday</td><td>Poori</td><td>Special Meal</td><td>Chapati</td></tr>
            <tr><td>Monday</td><td>Idli</td><td>Rice & Dal</td><td>Chapati</td></tr>
            <tr><td>Tuesday</td><td>Dosa</td><td>Sambar Rice</td><td>Fried Rice</td></tr>
            <tr><td>Wednesday</td><td>Poori</td><td>Chicken Curry</td><td>Chapati</td></tr>
            <tr><td>Thursday</td><td>Upma</td><td>Veg Curry</td><td>Noodles</td></tr>
            <tr><td>Friday</td><td>Idli</td><td>Fish Curry</td><td>Chapati</td></tr>
            <tr><td>Saturday</td><td>Dosa</td><td>Biryani</td><td>Light Dinner</td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  /* ================= MESS MEMBER DASHBOARD ================= */
  else if (role === "Mess") {
    title.textContent = "Mess Member Dashboard";

    cards.innerHTML = `
      <div class="card highlight animate-fade-in">
        <h4>📅 Today</h4>
        <p>Session: Lunch</p>
        <p>Expected Students: <b>1180</b></p>
        <p>Present Students: <b>1102</b></p>
      </div>

      <div class="card animate-fade-in">
        <h4>🍽️ Today’s Menu</h4>
        <p>Veg: Rice, Dal, Veg Curry</p>
        <p>Non-Veg: Chicken Curry</p>
      </div>

      <div class="card animate-fade-in">
        <h4>📋 Attendance</h4>
        <button class="btn small-btn" onclick="takeAttendance()">
    Take Attendance
  </button>
        <button class="btn small-btn">View Attendance</button>
        <button class="btn logout-btn small-btn">
          Lock Attendance
        </button>
      </div>

      <div class="card animate-fade-in">
        <h4>🧾 Notices</h4>
        <ul class="notification-list">
          <li>Menu updated by Admin</li>
          <li>Special meal requests: 9</li>
          <li>Hygiene checklist pending</li>
        </ul>
      </div>
    `;
  }

  /* ================= ADMIN DASHBOARD ================= */
  else if (role === "Admin") {
    title.textContent = "Admin Dashboard";

    cards.innerHTML = `
      <div class="card highlight animate-fade-in">
        <h4>👨‍🎓 Total Students</h4>
        <p><b>1248</b></p>
      </div>
<div class="card animate-fade-in">
      <h4>📝 Attendance</h4>

      <button class="btn small-btn" onclick="takeAttendance()">
        Take Attendance
      </button>

      <button class="btn small-btn" onclick="viewAttendance()">
        View Attendance
      </button>
    </div>
      <div class="card animate-fade-in">
        <h4>🏢 Hostel Occupancy</h4>
        <p>1180 / 1300</p>
        <p>Vacant Rooms: 120</p>
      </div>

      <div class="card animate-fade-in">
        <h4>🍽️ Today’s Mess Strength</h4>
        <p>1102</p>
      </div>

      <div class="card animate-fade-in">
        <h4>⚠️ Pending Complaints</h4>
        <p>18</p>
      </div>

      <div class="card animate-fade-in">
        <h4>📢 Notice Management</h4>
        <button class="btn small-btn">Post Notice</button>
        <button class="btn small-btn">View Notices</button>
      </div>

      <div class="card animate-fade-in">
        <h4>🔍 Student Management</h4>
        <button class="btn small-btn">Search Student</button>
        <button class="btn small-btn">View All</button>
      </div>
    `;
  }

  /* ================= SAFETY FALLBACK ================= */
  else {
    alert("Invalid role selected");
    return;
  }

  showSection("dashboard");
}

/* ==================================================
   MODAL SYSTEM (REUSABLE)
================================================== */
function openLogout() {
  openModal(
    "Confirm Logout",
    "Are you sure you want to logout?",
    handleLogout
  );
}

function confirmMessInactive() {
  openModal(
    "Mess Inactive",
    "Mark mess inactive for today?",
    () => {
      closeModal();
      alert("Mess marked inactive for today (demo)");
    }
  );
}

function openModal(title, text, confirmAction) {
  const modal = document.getElementById("logoutModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalConfirm = document.getElementById("modalConfirm");

  if (!modal || !modalTitle || !modalText || !modalConfirm) {
    console.error("Modal elements missing");
    return;
  }

  modalTitle.textContent = title;
  modalText.textContent = text;
  modalConfirm.onclick = confirmAction;

  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("logoutModal");
  if (modal) modal.classList.add("hidden");
}

function handleLogout() {
  closeModal();
  // Clear auth state
  isLoggedIn = false;
  showSection("home");
}

/* Info modal helpers */
function openInfoModal(title, htmlContent) {
  const modal = document.getElementById("infoModal");
  const modalTitle = document.getElementById("infoModalTitle");
  const modalContent = document.getElementById("infoModalContent");

  if (!modal || !modalTitle || !modalContent) {
    console.error("Info modal elements missing");
    return;
  }

  modalTitle.textContent = title;
  modalContent.innerHTML = htmlContent;
  modal.classList.remove("hidden");
}

function closeInfoModal() {
  const modal = document.getElementById("infoModal");
  if (modal) modal.classList.add("hidden");
}

function viewAttendance() {
  // Demo data; replace with API call in production
  const lastWeek = [
    { day: 'Mon', status: 'P' },
    { day: 'Tue', status: 'P' },
    { day: 'Wed', status: 'A' },
    { day: 'Thu', status: 'P' },
    { day: 'Fri', status: 'P' },
    { day: 'Sat', status: 'P' },
    { day: 'Sun', status: 'P' }
  ];

  const present = lastWeek.filter(d => d.status === 'P').length;
  const total = lastWeek.length;
  const percentage = Math.round((present / total) * 100);

  const rows = lastWeek.map(d => `<tr><td>${d.day}</td><td style="text-align:center">${d.status}</td></tr>`).join('');

  const html = `
    <p><b>Last 7 days</b> — Present: ${present} / ${total} (${percentage}%)</p>
    <table class="menu-table" style="margin-top:8px;width:100%;"><thead><tr><th>Day</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>
    <p style="margin-top:10px;font-size:13px;color:#666">Legend: P = Present, A = Absent</p>
  `;

  openInfoModal('Attendance Details', html);
}

/* ==================================================
   HOME ANIMATION RE-TRIGGER
================================================== */
function retriggerHomeAnimations() {
  document.querySelectorAll(".notice").forEach(el => {
    el.classList.remove("slide-in");
    void el.offsetWidth; // force reflow
    el.classList.add("slide-in");
  });
}
function sendOTP() {
  alert("OTP sent successfully (demo)");

}
// Run Home setup on first page load
window.addEventListener('load', () => {
  showSection('home');
});
