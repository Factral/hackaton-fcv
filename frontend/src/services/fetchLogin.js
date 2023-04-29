import config from '../config'

export default function fetchLogin (data) {
  console.log({ data })
  return fetch(`${config.URL_API}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'no-cors': true
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log({ err }))
}
