import config from '../config'

export default function fetchGetUser () {
  return fetch(`${config.URL_API}/profile`)
    .then(res => res.json())
    .catch(err => console.log(err))
}
