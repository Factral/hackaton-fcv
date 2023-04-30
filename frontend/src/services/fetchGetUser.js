import config from '../config'

export default function fetchGetUser (session) {
  return fetch(`${config.URL_API}/profile`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(session)
  })
    .then(res => {
      console.log({ res })
      return res.json()
    })
    .catch(err => console.log(err))
}
