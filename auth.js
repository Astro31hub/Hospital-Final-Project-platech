// =============================================
// AUTH UTILITIES
// =============================================

// Get current user role from Firestore
async function getUserRole(uid) {
  try {
    const doc = await db.collection("users").doc(uid).get();
    if (doc.exists) return doc.data().role;
    return null;
  } catch (err) {
    console.error("Error getting user role:", err);
    return null;
  }
}

// Require authentication - redirect if not logged in
async function requireAuth(allowedRoles = []) {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = "login.html";
        return;
      }
      if (allowedRoles.length > 0) {
        const role = await getUserRole(user.uid);
        if (!allowedRoles.includes(role)) {
          alert("Access denied. Insufficient permissions.");
          window.location.href = "dashboard.html";
          return;
        }
      }
      resolve(user);
    });
  });
}

// Redirect if already logged in
function redirectIfLoggedIn() {
  auth.onAuthStateChanged((user) => {
    if (user) window.location.href = "dashboard.html";
  });
}

// Logout
async function logout() {
  try {
    await auth.signOut();
    window.location.href = "index.html";
  } catch (err) {
    console.error("Logout error:", err);
  }
}

// Format date helper
function formatDate(timestamp) {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

// Show toast notification
function showToast(message, type = "success") {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === "success" ? "✓" : "✕"}</span> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Generate patient ID
function generatePatientId() {
  return "PT-" + Date.now().toString(36).toUpperCase();
}
