importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
      apiKey: "AIzaSyBBTwVdvR26nnycC2IaaAV5uD0sDU34XU0",
      authDomain: "andaza-d9c48.firebaseapp.com",
      projectId: "andaza-d9c48",
      storageBucket: "andaza-d9c48.appspot.com",
      messagingSenderId: "613085841293",
      appId: "1:613085841293:web:ddd54438996b3ff6db9fc4",
      measurementId: "G-8KCZDLR1W2"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
