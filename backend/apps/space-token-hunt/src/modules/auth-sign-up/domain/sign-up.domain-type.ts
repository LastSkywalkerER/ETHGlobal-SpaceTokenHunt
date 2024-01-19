export interface CreateSignUpValidationParameters {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  userName: string;
}

export interface UpdateSignUpValidationParameters {
  email: string;
}

export interface ValidateSignUpOtpParameters {
  email: string;
  otp: string;
}
export interface GenerateTokenPairParameters {
  userUuid: string;
}
