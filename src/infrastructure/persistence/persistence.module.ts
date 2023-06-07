/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TransactionRepository } from "./typeorm/repositories/transaction.repository";

import { SeedService } from "./typeorm/seed/seedservice";
import { typeORMFeature } from "@/common/constant/typeormFeature";
import { itransactionRepositoryToken } from "@domain/repository/itransaction.repository.interface";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), typeORMFeature],
  providers: [
    TransactionRepository,
    SeedService,
    {
      provide: itransactionRepositoryToken,
      useClass: TransactionRepository,
    },
  ],
  exports: [TransactionRepository, typeORMFeature, itransactionRepositoryToken],
})
export class PersistenceModule {}
