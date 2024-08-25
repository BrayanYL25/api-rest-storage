function createError({ name }) {
  return class CustomError extends Error {
    constructor(message) {
      super(message)
      this.name = name
    }
  }
}

export const VolumeNotFound = createError({
  name: 'VolumeNotFound'
})

export const RepeatedUserError = createError({
  name: 'RepeatedUserError'
})

export const UserNotFound = createError({
  name: 'UserNotFound'
})

export const PasswordWrong = createError({
  name: 'PasswordWrong'
})

export const UnauthorizedAction = createError({
  name: 'UnauthorizedAction'
})

export const MissingToken = createError({
  name: 'MissingToken'
})

export const RepeatedProduct = createError({
  name: 'RepeatedProduct'
})
