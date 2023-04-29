import { useForm } from 'react-hook-form'
import Input, { Select } from './Input'
import MainButton from './MainButton'
import { NavLink } from 'react-router-dom'
import useUser from '../hooks/useUser'
import Loading from './Loading'
import { useState } from 'react'
import Visible from './Visible'
import validationRegister from '../validations/validationRegister'
import { ROLE_CARRER, ROLE_PATIENT } from '../constants/magicStrings'
import AlertStore from '../store/AlertStore'

export default function FormRegister () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { loading, signUp } = useUser()
  const [visible, setVisible] = useState(false)

  const onSubmitFucntion = (values) => {
    signUp(values)
  }

  return (
    <>
      {loading && <Loading />}
      <form className='w-full max-h-[500px] clean-scroll overflow-y-auto' onSubmit={handleSubmit(onSubmitFucntion)}>
        <div className='flex flex-col gap-3 w-full'>
          <div className='flex flex-col gap-2 '>
            <Input register={register} validation={validationRegister} placeholder='Brayan Villamizar' errors={errors} label='Nombre Completo' nameRegister='name' typeInput='text' />
            <Input register={register} validation={validationRegister} placeholder='tucorreo@tudominio.com' errors={errors} label='Correo electrónico' nameRegister='email' typeInput='text' />
            <Input register={register} validation={validationRegister} errors={errors} label='Fecha de nacimiento' nameRegister='birthdate' typeInput='date' />
            <Select register={register} validation={validationRegister} errors={errors} label='Rol' nameRegister='role'>
              <option value={ROLE_PATIENT}>Paciente</option>
              <option value={ROLE_CARRER}>Cuidador</option>
            </Select>
            <Select register={register} validation={validationRegister} errors={errors} label='Género' nameRegister='gender'>
              <option value=''>Genero...</option>
              <option value='M'>Masculino</option>
              <option value='F'>Femenino</option>
            </Select>
            <Input register={register} validation={validationRegister} placeholder='1032231331' errors={errors} label='Documento de identidad' nameRegister='document' typeInput='text' />
            <Input register={register} validation={validationRegister} placeholder='**********' errors={errors} label='Contraseña' nameRegister='password' typeInput={!visible && 'password'} />
            <div className='relative'>
              <Input register={register} validation={validationRegister} placeholder='**********' errors={errors} label='Repetir contraseña' nameRegister='verifyPassword' typeInput={!visible && 'password'} />
              <Visible setVisible={setVisible} visible={visible} />
            </div>
          </div>
          <div className='flex w-full space-between'>
            <NavLink to='/auth/login' className='text-left w-full text-white underline transition-all ease-in-out duration-300 hover:text-main-white md:text-lg'>Ya tienes cuenta? Ingresa con ella.</NavLink>
          </div>
          <MainButton type='submit'>REGISTRARSE</MainButton>
        </div>
      </form>
    </>
  )
}
