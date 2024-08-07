export const ErrorCode = {
  UNKNOWN: 'error/unknown',
  INVALID_TYPE: 'error/invalid-type',
  VALIDATION_FAILED: 'error/validation-failed',
  NO_BEARER_TOKEN: 'auth/no-bearer-token',
  UNAUTHENTICATED: 'auth/unauthenticated',
  NO_PERMISSIONS: 'auth/insufficient-permissions',
  NO_CAPTCHA_TOKEN: 'auth/no-captcha-token',
  CAPTCHA_VERIFY_FAILED: 'auth/captcha-verify-failed', // Corrección en el código
  USER_ALREADY_EXISTS: 'auth/user-already-exists',
  NO_EMPLOYEE_RECORD: 'auth/no-employee-record',
  SEND_MAIL_FAILED: 'error/send-mail-failed',
  UPLOAD_IN_PROGRESS: 'internal/upload-in-progress',
  UPLOAD_METADATA_NOT_FOUND: 'internal/upload-metadata-not-found', // Corrección en el código
  WRONG_UPLOAD_METADATA_TYPE: 'internal/wrong-upload-metadata-type',
  FIREBASE_AUTH_INVALID_EMAIL: 'auth/invalid-email',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
