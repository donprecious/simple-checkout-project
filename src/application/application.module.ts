import { typeORMFeature } from "@/common/constant/typeormFeature";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SharedModule } from "@/common/module/shared.module";
import { itransactionserviceDiToken } from "./transactions/itransaction.service";
import { TransactionService } from "./transactions/transaction.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    typeORMFeature,
    SharedModule,
  ],
  providers: [
    {
      provide: itransactionserviceDiToken,
      useClass: TransactionService,
    },
  ],
  exports: [typeORMFeature, itransactionserviceDiToken],
})
export class ApplicationModule {}
