export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const logIn = (username, password) => {
  return dispatch => {
    dispatch({ type: LOG_IN_SUCCESS, username });
    console.log('test');
    return fetch(`/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, 
        password
      })
    })
    .then(res => { 
      if(res.headers.get('Content-Type').includes('application/json')){
        if(res.ok){
          return res.json();
        }

        return res.json().then(json => {
          throw Error('API: ' + JSON.stringify(json));
        });
      }

      return res.text().then(text => {
        throw Error('HTTP ' + res.status + ' : ' + text);
      })
     })
     .then(json => dispatch(logInSuccess(json)))
     .catch(error => dispatch(logInFailure(error)))
  }
}

const logInSuccess = (json) => {
  const {id, username, userType } = json;
  return { id, username, userType, type: LOG_IN_SUCCESS }
}

const logInFailure = (error) => {
  return {type: LOG_IN_FAILURE, message : error}
}

export const LOG_IN_FAILURE = ''

export const LOG_IN_REQUEST = ''
