import config from '../config'

export default function fetchLogin (data) {
  return fetch(`${config.URL_API}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      console.log(res)
      for (const pair of res.headers.entries()) {
        console.log(pair[0] + ': ' + pair[1])
      }
      return res.json()
    })
    .catch(err => console.log({ err }))
}
