export enum MessageHandler {
  UNAUTHORIZED_TOKEN = 'Token not valid!',
  UNAUTHORIZED_USER = 'User is inactive, talk with an adming',
  NOT_VALID_CREDENTIALS_EMAIL = 'Credentials are not valid (email)',
  NOT_VALID_CREDENTIALS_PASSWORD = 'Credentials are not valid (password)',
  UNHANDLED = 'Unhandled exception',
}