export default function transformHours () {
  const date = new Date()
  const minutes = date.getMinutes()
  const hours = date.getHours()

  const ampm = hours >= 12 ? 'pm' : 'am'

  const newHours = hours % 12 || 12
  const newMinutes = minutes < 10 ? `0${minutes}` : minutes

  const time = `${newHours}:${newMinutes} ${ampm}`
  return time
}
