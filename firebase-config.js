// =============================================
// FIREBASE CONFIGURATION
// Replace these values with your Firebase project config
// Get them from: Firebase Console > Project Settings > General > Your apps
// =============================================

const firebaseConfig = {
  apiKey: "AIzaSyDRuzJsa0AEbiFzgm1UQb8cTsW6uRw2ZGM",
  authDomain: "hospital-9f571.firebaseapp.com",
  projectId: "hospital-9f571",
  storageBucket: "hospital-9f571.firebasestorage.app",
  messagingSenderId: "845750496333",
  appId: "1:845750496333:web:307b7dcbbbd13abc390004"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// =============================================
// SAMPLE DATA SEEDER (run once from console)
// Call: seedSampleData() in browser console
// =============================================
async function seedSampleData() {
  try {
    // Sample vaccines
    const vaccines = [
      { name: "COVID-19 (Pfizer)", doses: 2, intervalDays: 21, description: "mRNA vaccine for COVID-19" },
      { name: "Influenza", doses: 1, intervalDays: 0, description: "Annual flu vaccine" },
      { name: "Hepatitis B", doses: 3, intervalDays: 30, description: "Recombinant hepatitis B vaccine" },
      { name: "MMR", doses: 2, intervalDays: 28, description: "Measles, Mumps, Rubella vaccine" },
      { name: "Varicella", doses: 2, intervalDays: 84, description: "Chickenpox vaccine" },
    ];

    for (const vaccine of vaccines) {
      await db.collection("vaccines").add({ ...vaccine, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    }

    console.log("✅ Sample data seeded successfully!");
  } catch (err) {
    console.error("Error seeding data:", err);
  }
}
