import config from '../config'

export default function fetchGetTreatmetns (session) {
  const mySession = { session }
  console.log({ mySession })
  return fetch(`${config.URL_API}/treatments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(mySession)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
