import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
    apiKey: "AIzaSyCf3FlduZYRo7ue63x3q_XUaI24HEGx6ek",
    authDomain: "englishsources.firebaseapp.com",
    projectId: "englishsources",
    storageBucket: "englishsources.appspot.com",
    messagingSenderId: "368311357178",
    appId: "1:368311357178:web:868d25d13e300fe5d3c343",
    measurementId: "G-DHM2N198PD"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const PASPAS_URL="http://localhost:3000/graphql" 

export const getToken2 = async (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BNcA3wCXFrCNbmln65wvPEmjuJ50aPUbtoZxo9iwuI8Ku3zLuf4QbvO0q1WZYcXNHpQGSb1IC9Gyv9CzbILQvrU'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        axios.post(
          PASPAS_URL,
          {
              query: `mutation registerDeviceToken($input: RegisterDeviceTokenInput!) { registerDeviceToken(input: $input) { party_id } }`,
              variables: `{"input":{"value": "${currentToken}","type": "BROWSER" }}`
          },
          {
              headers: {
                  authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MTczZmZkNS0yMTI4LTRhNmYtODlmZi0wN2UyYzNlYzk2NjYiLCJncmFudHMiOlsiQ1VTVE9NRVIiXSwiaWF0IjoxNjUzODgzODgxLCJleHAiOjE2ODU0NDE0ODF9.vFP3O7GNCvYH91B_eKm2cImw6SXHHZ-5dXVdoq2LQ2Q"
              },
          }
      )
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});