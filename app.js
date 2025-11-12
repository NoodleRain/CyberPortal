const firebaseConfig = {
  apiKey: "AIzaSyCHkbB7kBdKUG3Jqi_0EAjpKJLixMl59B0",
  authDomain: "cyber-ideas-portal.firebaseapp.com",
  projectId: "cyber-ideas-portal",
  storageBucket: "cyber-ideas-portal.firebasestorage.app",
  messagingSenderId: "716669863558",
  appId: "1:716669863558:web:c50141de703afe10523307",
  measurementId: "G-MSXGJMTJ2E"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Email sign-up
document.getElementById('signupEmailBtn').addEventListener('click', () => {
  const email = prompt("Enter your email");
  const password = prompt("Enter a password");

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      db.collection('users').doc(userCredential.user.uid).set({
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Signed up successfully!");
    })
    .catch(error => alert(error.message));
});

// Google sign-in
document.getElementById('loginGoogleBtn').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      db.collection('users').doc(result.user.uid).set({
        email: result.user.email,
        name: result.user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Signed in successfully!");
    })
    .catch(error => alert(error.message));
});
