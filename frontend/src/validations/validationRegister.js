import validationLogin from './validationLogin'

const validationRegister = {
  email: validationLogin.email,
  password: validationLogin.password,
  name: {
    validate: {
      required: true,
      pattern: /^[\w]+[\w\s]+[\w]{1,}$/
    },
    messages: {
      required: 'El nombre es requerido',
      pattern: 'El nombre solo acepta letras'
    }
  },
  phone: {
    validate: {
      required: true,
      pattern: /^[0-9]{10}$/
    },
    messages: {
      required: 'El teléfono es requerido',
      pattern: 'El telefono debe tener al menos 10 dígitos'
    }
  },
  birthdate: {
    validate: {
      required: true
    },
    messages: {
      required: 'La fecha de nacimiento es requerida'
    }
  },
  role: {
    validate: {
      required: true
    },
    messages: {
      required: 'Tu rol es requerida'
    }
  },
  gender: {
    validate: {
      required: true
    },
    messages: {
      required: 'Tu rol es requerida'
    }
  },
  document: {
    validate: {
      required: true,
      pattern: /^[0-9]{8,11}$/
    },
    messages: {
      required: 'Tu rol es requerida',
      pattern: 'El documento debe tener al menos 8 dígitos y máximo 10'
    }
  },
  verifyPassword: {
    validate: {
      required: true
    },
    messages: {
      required: 'La confirmación de contraseña es requerida'
    }
  }
}

export default validationRegister
