
export default function MainButton ({ type, children, ...props }) {
  return (
    <button type={type} className='py-4 font-semibold text-lg text-main-green-500 rounded-[12px] w-full transition-all ease-in-out duration-300 bg-white hover:bg-main-white hover:text-main-green-700' {...props}>{children}</button>
  )
}
