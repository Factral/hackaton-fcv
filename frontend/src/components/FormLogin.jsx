import { useForm } from 'react-hook-form'
import Input from './Input'
import validationLogin from '../validations/validationLogin'
import MainButton from './MainButton'
import { NavLink } from 'react-router-dom'

export default function FormLogin () {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmitFucntion = (values) => {
    console.log(values)
  }

  return (
    <form className='w-full overflow-y-auto' onSubmit={handleSubmit(onSubmitFucntion)}>
      <div className='flex flex-col gap-3 w-full'>
        <div className='flex flex-col gap-2 '>
          <Input register={register} validation={validationLogin} placeholder='tucorreo@tudominio.com' errors={errors} label='Correo electrónico' nameRegister='email' typeInput='text' />
          <Input register={register} validation={validationLogin} errors={errors} label='Password' nameRegister='password' typeInput='password' />
        </div>
        <NavLink to='/register' className='text-right w-full text-white underline transition-all ease-in-out duration-300 hover:text-main-white'>No tienes cuenta? Regístrate.</NavLink>
        <MainButton type='submit'>INGRESAR</MainButton>
      </div>
    </form>
  )
}
