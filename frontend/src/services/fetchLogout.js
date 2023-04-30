import config from '../config'

export default function fetchLogout () {
  return fetch(`${config.URL_API}/logout`, {
    method: 'POST'
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
