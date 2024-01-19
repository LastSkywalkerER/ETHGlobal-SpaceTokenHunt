import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { CryptoModuleOptionsFactory } from './crypto-module-options-factory.interface';

export interface CryptoModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<CryptoModuleOptionsFactory>;
  useExisting?: Type<CryptoModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<void> | void;
}
