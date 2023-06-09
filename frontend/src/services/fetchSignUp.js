import config from '../config'

export default function fetchSignUp (data) {
  console.log({ data })
  return fetch(`${config.URL_API}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
