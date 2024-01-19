export interface CryptoModuleOptionsFactory {
  createCryptoOptions(): Promise<void>;
}
