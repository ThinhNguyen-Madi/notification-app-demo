// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCf3FlduZYRo7ue63x3q_XUaI24HEGx6ek",
    authDomain: "englishsources.firebaseapp.com",
    projectId: "englishsources",
    storageBucket: "englishsources.appspot.com",
    messagingSenderId: "368311357178",
    appId: "1:368311357178:web:868d25d13e300fe5d3c343",
    measurementId: "G-DHM2N198PD"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
    if(payload.notification) {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
        };
      
        self.registration.setNotification(notificationTitle,
          notificationOptions);
    }
    if(payload.data) {
        const data = JSON.parse(payload.data.default)
        console.log('data', data)
        const notificationTitle = data.title;
        const notificationOptions = {
          body: data.body,
        };
      
        self.registration.showNotification(notificationTitle,
          notificationOptions);
    }
});