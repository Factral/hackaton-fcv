import { CloseEye, Eye } from './Icons'

export default function Visible ({ setVisible, visible }) {
  return visible ? <CloseEye className='absolute right-3 fill-gray-500 opacity-50 top-8 w-8 md:top-10' onClick={() => setVisible(!visible)} /> : <Eye className='absolute right-3 fill-gray-500 opacity-50 top-8 w-8 md:top-10' onClick={() => setVisible(!visible)} />
}
