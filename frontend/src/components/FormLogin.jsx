import { useForm } from 'react-hook-form'
import Input from './Input'
import validationLogin from '../validations/validationLogin'
import MainButton from './MainButton'
import { NavLink } from 'react-router-dom'
import useUser from '../hooks/useUser'
import Loading from './Loading'
import { useState } from 'react'
import Visible from './Visible'

export default function FormLogin () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { loading, logIn } = useUser()
  const [visible, setVisible] = useState(false)

  const onSubmitFucntion = (values) => {
    logIn(values)
  }

  return (
    <>
      {loading && <Loading />}
      <form className='w-full overflow-y-auto' onSubmit={handleSubmit(onSubmitFucntion)}>
        <div className='flex flex-col gap-3 w-full'>
          <div className='flex flex-col gap-2 '>
            <Input register={register} validation={validationLogin} placeholder='tucorreo@tudominio.com' errors={errors} label='Correo electrónico' nameRegister='email' typeInput='text' />
            <div className='relative'>
              <Input register={register} validation={validationLogin} placeholder='**********' errors={errors} label='Password' nameRegister='password' typeInput={!visible && 'password'} />
              <Visible setVisible={setVisible} visible={visible} />
            </div>
          </div>
          <div className='flex w-full space-between'>
            <Input register={register} validation={validationLogin} errors={errors} label='Recordarme' nameRegister='remember' typeInput='checkbox' editStyle='flex gap-3' />
            <NavLink to='/auth/register' className='text-right w-fit ml-auto text-white underline transition-all ease-in-out duration-300 hover:text-main-white md:text-lg'>No tienes cuenta? Regístrate.</NavLink>
          </div>
          <MainButton type='submit'>INGRESAR</MainButton>
        </div>
      </form>
    </>
  )
}
