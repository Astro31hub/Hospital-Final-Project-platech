# 🏥 MediCare HMS — Semi Hospital Management System

A clean, role-based Hospital Management System built with **HTML, CSS, Vanilla JavaScript**, **Firebase** (Firestore + Auth), and deployable to **Vercel**.

---

## 📁 Project Structure

```
hospital-mgmt/
├── index.html          ← Landing / Home page
├── login.html          ← Login page
├── signup.html         ← Registration page
├── dashboard.html      ← Role-based dashboard
├── patient.html        ← Patient management + medical records
├── vaccination.html    ← Vaccination records
├── css/
│   └── styles.css      ← All styles
├── js/
│   ├── firebase-config.js  ← Firebase init + config
│   └── auth.js             ← Auth helpers & utilities
├── vercel.json         ← Vercel deployment config
├── firestore.rules     ← Firestore security rules
└── README.md           ← This file
```

---

## 🔥 STEP 1 — Firebase Setup

### 1.1 Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"**
3. Name it: `medicare-hms` (or anything you like)
4. Disable Google Analytics (optional for student project)
5. Click **"Create project"**

---

### 1.2 Enable Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click **"Get Started"**
3. Click **"Email/Password"** provider
4. Toggle **Enable** → Save

---

### 1.3 Create Firestore Database

1. Go to **Build > Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add proper rules later)
4. Select a region (e.g., `asia-southeast1` for Philippines)
5. Click **"Done"**

---

### 1.4 Get Your Firebase Config

1. Go to **Project Settings** (gear icon ⚙️ next to "Project Overview")
2. Scroll to **"Your apps"** section
3. Click **"Add app"** → choose **Web** (`</>`)
4. Register app with nickname: `medicare-hms-web`
5. Copy the `firebaseConfig` object shown

---

### 1.5 Paste Config into `js/firebase-config.js`

Replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",              // ← Your real key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

### 1.6 Apply Firestore Security Rules

1. Go to **Firestore Database > Rules tab**
2. Delete the default content
3. Paste in the contents of `firestore.rules`
4. Click **"Publish"**

---

### 1.7 Create Required Firestore Indexes

Some queries need composite indexes. Firebase will prompt you with links when you first run the app — just click the link in the browser console error and Firebase creates them automatically.

Alternatively, create these manually:
- Collection: `vaccinations` → Fields: `patientId ASC`, `administeredAt DESC`
- Collection: `medical_records` → Fields: `patientId ASC`, `visitDate DESC`

---

### 1.8 Seed Sample Vaccine Data

After deploying, open your browser console on any page and run:

```javascript
seedSampleData()
```

This adds 5 default vaccines (COVID-19, Flu, Hepatitis B, MMR, Varicella).

---

## 🚀 STEP 2 — Deploy to Vercel

### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project folder
cd hospital-mgmt

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: medicare-hms
# - Directory: ./  (current)
# - Override settings? N

# Your live URL will appear, e.g.:
# https://medicare-hms.vercel.app
```

### Option B: Vercel Dashboard (No CLI)

1. Go to [https://vercel.com](https://vercel.com) and sign up / log in
2. Click **"New Project"**
3. Click **"Import" → "Upload"** (drag & drop your `hospital-mgmt` folder)
4. Click **"Deploy"**
5. Done! Vercel gives you a URL.

### Option C: GitHub → Vercel

1. Push your project to a GitHub repository
2. Go to [https://vercel.com](https://vercel.com)
3. Click **"New Project"** → **"Import Git Repository"**
4. Select your repo
5. Click **"Deploy"**

---

## 🔐 STEP 3 — Create First Admin User

1. Open your deployed site → go to `/signup.html`
2. Register with role: **Admin**
3. Check your email → click the verification link
4. Log in at `/login.html`

> **Note:** For a student demo, you can disable email verification requirement by removing the `emailVerified` check in `login.html` (lines with `cred.user.emailVerified`).

---

## 👥 User Roles & Permissions

| Feature | Admin | Nurse | Patient |
|---|---|---|---|
| View Dashboard | ✅ | ✅ | ✅ |
| Manage Users | ✅ | ❌ | ❌ |
| View All Patients | ✅ | ✅ | Own only |
| Add / Edit Patients | ✅ | ✅ | ❌ |
| Delete Patients | ✅ | ❌ | ❌ |
| Record Vaccinations | ✅ | ✅ | ❌ |
| View Vaccinations | ✅ | ✅ | Own only |
| Add Medical Records | ✅ | ✅ | ❌ |
| View Reports | ✅ | ❌ | ❌ |
| Manage Vaccines | ✅ | ❌ | ❌ |

---

## 📦 Firestore Collections

### `users`
```
{
  uid: string,
  firstName: string,
  lastName: string,
  fullName: string,
  email: string,
  role: "admin" | "nurse" | "patient",
  createdAt: timestamp
}
```

### `patients`
```
{
  patientId: string,      // e.g. "PT-LKJ3A4"
  userId: string,         // linked Firebase Auth UID (for patient role)
  firstName: string,
  lastName: string,
  fullName: string,
  dateOfBirth: string,    // "YYYY-MM-DD"
  gender: string,
  bloodType: string,
  phone: string,
  email: string,
  address: string,
  createdAt: timestamp
}
```

### `vaccines`
```
{
  name: string,
  doses: number,
  intervalDays: number,
  description: string,
  createdAt: timestamp
}
```

### `vaccinations`
```
{
  patientId: string,
  patientName: string,
  vaccineId: string,
  vaccineName: string,
  doseNumber: number,
  batchNumber: string,
  administeredAt: timestamp,
  nextDoseDate: string,
  administeredBy: string,
  injectionSite: string,
  remarks: string,
  recordedBy: string,      // nurse UID
  createdAt: timestamp
}
```

### `medical_records`
```
{
  patientId: string,
  patientName: string,
  diagnosis: string,
  treatment: string,
  doctor: string,
  visitDate: string,       // "YYYY-MM-DD"
  notes: string,
  recordedBy: string,
  createdAt: timestamp
}
```

---

## 🛠️ Local Development

No build tools needed! Just open the files directly:

```bash
# Option 1: VS Code Live Server extension
# Right-click index.html → Open with Live Server

# Option 2: Python
python -m http.server 8080

# Option 3: Node.js
npx serve .
```

Then visit: `http://localhost:8080`

---

## ⚡ Quick Demo Tip (Disable Email Verification)

For a quick student demo without email verification, in `login.html` find and comment out:

```javascript
// if (!cred.user.emailVerified) {
//   document.getElementById("verif-alert").style.display = "flex";
//   await auth.signOut();
//   ...
//   return;
// }
```

---

## 🧪 Testing Checklist

- [ ] Register as Admin → verify email → log in → see full dashboard
- [ ] Register as Nurse → log in → add a patient → record vaccination
- [ ] Register as Patient → log in → view own profile & vaccinations
- [ ] Admin: view Users, Reports
- [ ] Search patients by name
- [ ] Add medical record to a patient

---

## 📌 Notes

- This is a **student project demo** — not intended for actual medical use
- All data is stored in Firebase Firestore (cloud)
- Email verification can be bypassed in test mode
- No file uploads (photos, documents) are supported
- Responsive on desktop and mobile

---

*Built with ❤️ using Firebase + Vanilla JS — No frameworks needed!*
