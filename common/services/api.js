import 'isomorphic-fetch';
import Firebase from 'firebase';
// import axios from 'axios';

function getFirebaseData(url) {
  // assuming they have firebase source included in html file
  const ref = new Firebase(url);

  return new Promise((resolve, reject) => {
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        reject('Firebase data failed to load :(');
      } else {
        resolve(data);
      }
    });
  });
}

function callApi(username) {
  // this needs to be updated, obviously. Right now just
  // faking it to get sagas to work
  console.log(username);
  return getFirebaseData('https://knowit.firebaseio.com/')
          .then(response => {
            if (response.status > 400) {
              throw new Error('sorry');
            }
            return response;
          })
          .then(
            response => ({ response }),
            error => ({ error: error.message || 'Something shitty happened' })
          );
}

function loginUserAsync(username) {
  console.log(username);
  return fetch('/auth/facebook')
          .then(function (response) {
            if (response.status >= 400) {
              throw new Error('Bad response from server');
            }
            return response;
          })
          .then(
            response => ({ response }),
            error => ({ error: error.message || 'Something shitty happened' })
          );
}

// api services
export const fetchLearnables = username => callApi(username);
export const loginUser = username => loginUserAsync(username);
