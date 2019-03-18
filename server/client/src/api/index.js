import fetch from 'isomorphic-fetch';

export default function api(method, path, data){
  return fetch(`//localhost:8080/${path}`, {
    method: method.toUpperCase(),
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    mode: 'cors',
      'Access-Control-Allow-Origin': window.location.origin
    }),
    body: JSON.stringify(data)
  })
  .then(response => {
    return response.json();

  });
    
}