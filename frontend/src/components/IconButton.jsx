export default function IconButton ({ className, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex rounded-full hover:scale-110 transition duration-200 ease-in-out ${className}`}
    >
      {icon}
    </button>
  )
}
