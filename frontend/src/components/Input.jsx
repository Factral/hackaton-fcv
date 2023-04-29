
export default function Input ({ label, typeInput, nameRegister, register, errors, validation, placeholder }, props) {
  const { validate, messages } = validation ? validation[nameRegister] : { validate: {}, messages: {} }
  const errorInput = errors ? errors[nameRegister] : {}

  return (
    <div className='flex flex-col'>
      <label htmlFor={nameRegister} className={`text-white font-medium ${errorInput && 'text-red-500'}`}>{label}</label>
      <input type={typeInput} placeholder={placeholder} className={`p-3 rounded-2xl outline-none main-shadow border-2 border-transparent text-sm font-medium ${errorInput ? 'border-red-500' : 'focus:border-main-green-500'}`} {...register(nameRegister, validate)} {...props} />
      {errorInput && <span className='text-sm text-red-500 mt-1'>{messages[errorInput.type]}</span>}
    </div>
  )
}
