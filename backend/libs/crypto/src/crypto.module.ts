import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { CryptoService } from './application';
import { CRYPTO_MODULE_OPTIONS } from './core/tokens';
import {
  CryptoModuleAsyncOptions,
  CryptoModuleOptionsFactory,
} from './core/types';

@Global()
@Module({
  exports: [CryptoService],
  imports: [],
  providers: [CryptoService],
})
export class CryptoModule {
  private static createAsyncProviders(
    options: CryptoModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: CryptoModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: CRYPTO_MODULE_OPTIONS,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: CRYPTO_MODULE_OPTIONS,
      useFactory: async (optionsFactory: CryptoModuleOptionsFactory) => {
        return optionsFactory.createCryptoOptions();
      },
    };
  }

  public static register(options: Record<string, any>): DynamicModule {
    return {
      module: CryptoModule,
      providers: [
        {
          provide: CRYPTO_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  public static registerAsync(
    options: CryptoModuleAsyncOptions,
  ): DynamicModule {
    return {
      imports: options.imports || [],
      module: CryptoModule,
      providers: this.createAsyncProviders(options),
    };
  }
}
