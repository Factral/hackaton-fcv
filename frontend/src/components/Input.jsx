
export default function Input ({ editStyle, label, typeInput, nameRegister, register, errors, validation, placeholder }, props) {
  const { validate, messages } = validation ? validation[nameRegister] : { validate: {}, messages: {} }
  const errorInput = errors ? errors[nameRegister] : {}

  return (
    <div className={editStyle || 'flex flex-col'}>
      <label htmlFor={nameRegister} className={`font-medium md:text-lg ${errorInput ? 'text-red-500' : 'text-white'}`}>{label}</label>
      <input type={typeInput} id={nameRegister} placeholder={placeholder} className={`p-3 rounded-2xl outline-none main-shadow border-2 text-sm font-medium md:text-lg ${errorInput ? 'border-red-500' : 'border-transparent focus:border-main-green-500'}`} {...register(nameRegister, validate)} {...props} />
      {errorInput && <span className='text-sm text-red-500 mt-1 md:text-base'>{messages[errorInput.type]}</span>}
    </div>
  )
}

export function Select ({ editStyle, label, nameRegister, register, errors, validation, children }, props) {
  const { validate, messages } = validation ? validation[nameRegister] : { validate: {}, messages: {} }
  const errorInput = errors ? errors[nameRegister] : {}

  return (
    <div className={editStyle || 'flex flex-col'}>
      <label htmlFor={nameRegister} className={`font-medium md:text-lg ${errorInput ? 'text-red-500' : 'text-white'}`}>{label}</label>
      <select className={`p-3 rounded-2xl outline-none main-shadow border-2 text-sm font-medium md:text-lg ${errorInput ? 'border-red-500' : 'border-transparent focus:border-main-green-500'}`} {...register(nameRegister, validate)} {...props}>
        {children}
      </select>
      {errorInput && <span className='text-sm text-red-500 mt-1 md:text-base'>{messages[errorInput.type]}</span>}
    </div>
  )
}
