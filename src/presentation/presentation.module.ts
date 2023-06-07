import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApplicationModule } from "@application/application.module";
import { TransactionController } from "./controller/transactions.controller";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApplicationModule],
  providers: [],
  controllers: [TransactionController],
  exports: [],
})
export class PresentationModule {}
