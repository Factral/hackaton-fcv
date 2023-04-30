import config from '../config'

export default function fetchGetTreatmetns () {
  return fetch(`${config.URL_API}/treatments`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
