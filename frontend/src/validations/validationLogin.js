const validationLogin = {
  email: {
    validate: {
      required: true,
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    messages: {
      required: 'El email es requerido',
      pattern: 'El email no es válido'
    }
  },
  password: {
    validate: {
      required: true,
      minLength: 3
    },
    messages: {
      required: 'El password es requerido',
      minLength: 'El password debe tener al menos 3 caracteres'
    }
  }
}

export default validationLogin
