export const USERS_MESSAGE = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_50: 'Name length must be from 1 to 50',
  EMAIL_ALREADY_EXIST: 'Email already exist',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be from 6, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 symbol',
  COMFIRM_PASSWORD_IS_REQUIRED: 'confirmpassword is requied',
  CONFIRM_PASSWORD_MUST_BE_SAME_PASSWORD: 'Confirm password must be same password',
  DATE_OF_BIRTH_MUST_BE_ISO8601: ' Date of birth must be 8601',
  EMAIL_OR_PASSWORD_INCORECT: 'Email or password incorrect'
} as const
