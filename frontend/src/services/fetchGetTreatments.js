import config from '../config'

export default function fetchGetTreatmetns (sessions) {
  return fetch(`${config.URL_API}/treatments`, {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ sessions })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
