const firebaseConfig = {
  apiKey: "AIzaSyCHkbB7kBdKUG3Jqi_0EAjpKJLixMl59B0",
  authDomain: "cyber-ideas-portal.firebaseapp.com",
  projectId: "cyber-ideas-portal",
  storageBucket: "cyber-ideas-portal.firebasestorage.app",
  messagingSenderId: "716669863558",
  appId: "1:716669863558:web:c50141de703afe10523307",
  measurementId: "G-MSXGJMTJ2E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Sign Up
document.getElementById('signup').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert('Signed up!'))
    .catch(e => alert(e.message));
});

// Login
document.getElementById('login').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(e => alert(e.message));
});

// Google Sign-In
document.getElementById('googleSignIn').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .catch(e => alert(e.message));
});

// Logout
document.getElementById('logout').addEventListener('click', () => {
  auth.signOut();
});

// Auth State Change
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('forum').style.display = 'block';
    loadIdeas();
  } else {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('forum').style.display = 'none';
  }
});

// Post Idea
document.getElementById('postIdea').addEventListener('click', () => {
  const idea = document.getElementById('ideaInput').value;
  if (idea.trim() === '') return;
  db.collection('ideas').add({
    idea,
    user: auth.currentUser.email,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  document.getElementById('ideaInput').value = '';
});

// Load Ideas
function loadIdeas() {
  db.collection('ideas').orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      const list = document.getElementById('ideasList');
      list.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.textContent = `${data.user}: ${data.idea}`;
        list.appendChild(div);
      });
    });
}
