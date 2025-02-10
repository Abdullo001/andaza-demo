importScripts('https://www.gstatic.com/firebasejs/11.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.2.0/firebase-messaging-compat.js');

var firebaseConfig = {
  apiKey: "AIzsySyBBTwVdvR26nnycC2IaaAV5uD0sDU34XU0",
  authDomain: "andaza-d9c48.firebaseapp.com",
  projectId: "andaza-d9c48",
  storageBucket: "andaza-d9c48.appspot.com",
  messagingSenderId: "613085841293",
  appId: "1:613085841293:web:ddd544389096b3ff6db9fc4",
  measurementId: "G-8KCZDLR1W2"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
