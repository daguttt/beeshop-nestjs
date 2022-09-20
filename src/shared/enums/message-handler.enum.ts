export enum MessageHandler {
  OK_RESPONSE = 'Request executed successfully',
  UNAUTHORIZED_TOKEN = 'Token not valid!',
  UNAUTHORIZED_USER = 'User is inactive, talk with an admin',
  NOT_VALID_CREDENTIALS_EMAIL = 'Credentials are not valid (email)',
  NOT_VALID_CREDENTIALS_PASSWORD = 'Credentials are not valid (password)',
  USER_NOT_FOUND = 'User not found (request)',
  USER_INVALID_ROLE = 'User needs a valid role',
  UNHANDLED = 'Unhandled exception',
}
