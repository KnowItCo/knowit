import 'isomorphic-fetch';
import axios from 'axios';

function fetchLearnablesAsync() {
  return axios('/api/learnable/')
    .then((response) => {
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

function checkAuthAsync() {
  return axios('/auth/checkAuth/')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response;
    })
    .then(
      confirmation => ({ confirmation }),
      error => ({ error: error.message || 'Login was not successful' })
    );
}

function signOutAsync() {
  return axios('/auth/logout/')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response;
    })
    .then(
      confirmation => ({ confirmation }),
      error => ({ error: error.message || 'Could not sign you out, sorry' })
    );
}

function addLearnableAsync(learnable, tags) {
  return axios.post('/api/learnable/', {
    text: learnable,
    tags,
  })
  .then((response) => {
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

function deleteLearnableAsync(learnableid) {
  return axios.delete('/api/learnable/' + learnableid)
  .then((response) => {
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

function generateQAsync(learnableid, learnableText) {
  return axios.post('/api/generate', { learnableText, learnableid })
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response;
  })
  .then(
    confirmation => ({ confirmation }),
    error => ({ error: error.message || 'Error generating questions.' })
  );
}

// api services
export const fetchLearnables = () => fetchLearnablesAsync();
export const addLearnable = (learnable, tags) => addLearnableAsync(learnable, tags);
export const deleteLearnable = learnableid => deleteLearnableAsync(learnableid);
export const generateQ = (learnableid, learnableText) => generateQAsync(learnableid, learnableText);
export const checkAuth = () => checkAuthAsync();
export const signOut = () => signOutAsync();
