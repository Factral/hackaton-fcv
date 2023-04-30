import { shallow } from 'zustand/shallow'
import UserStore from '../store/UserStore'
import ListRenderChats from '../components/ListRenderChats'

export default function Listchat () {
  const { user } = UserStore(state => state, shallow)
  console.log({ user })
  const myList = user.patients || user.carer
  return <ListRenderChats list={myList} />
}
