import config from '../config'

export default function fetchLogout () {
  return fetch(`${config.URL_API}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
