import 'isomorphic-fetch';
import axios from 'axios';

function fetchLearnablesAsync(email) {
  return axios('/api/learnable/' + email)
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

function loginUserAsync(email) {
  return axios('/api/student/' + email)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response;
    })
    .then(
      confirmation => ({ confirmation }),
      error => ({ error: error.message || 'Something shitty happened' })
    );
}

function addLearnableAsync(email, learnable, tags) {
  return axios.post('/api/learnable/', {
    text: learnable,
    tags,
    email,
  })
  .then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response;
  })
  .then(
    confirmation => ({ confirmation }),
    error => ({ error: error.message || 'Something shitty happened' })
  );
}

// api services
export const fetchLearnables = email => fetchLearnablesAsync(email);
export const loginUser = email => loginUserAsync(email);
export const addLearnable = (learnable, tags, email) => addLearnableAsync(learnable, tags, email);
