export enum MailJobName {
  CONFIRMATION = 'send-confirmation-email',
  FORGOT_PASSWORD = 'send-forgot-password-email',
}

export interface IConfirmationJobData {
  email: string;
  username: string;
  code: string;
}

export interface IForgotPasswordJobData {
  email: string;
  resetLink: string;
}
