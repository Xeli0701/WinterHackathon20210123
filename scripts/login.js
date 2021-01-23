// login.js
'use strict';

// Initializes FlowStrands.
function FlowStrands() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.signInButton = document.getElementById('sign-in');
  this.signInSnackbar = document.getElementById('must-signin-snackbar');

  // Saves message on form submit.
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  this.initFirebase();
}

// Auth.
FlowStrands.prototype.initFirebase = function() {
  this.auth = firebase.auth();
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Signs-in Easy Chat.
FlowStrands.prototype.signIn = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
FlowStrands.prototype.onAuthStateChanged = function(user) {
  if (user) {
    // Login success -> index.html
    window.location.href = './';
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
FlowStrands.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
      'Make sure you go through the codelab setup instructions and make ' +
      'sure you are running the codelab using `firebase serve`');
  }
};

window.onload = function() {
  // Initialize
  window.easyChat = new FlowStrands();
};
