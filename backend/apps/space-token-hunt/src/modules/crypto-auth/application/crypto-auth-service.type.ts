export interface VerifyMessageParameters {
  address: string;
  signature: string;
}

export interface ChallengeLoginMessageParameters {
  address: string;
}

export interface GenerateLoginMessageParameters {
  address: string;
  nonce: string;
}
