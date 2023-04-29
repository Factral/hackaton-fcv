import config from '../config'

export default function fetchLogin ({ email, password }) {
  return fetch(`${config.URL_API}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
