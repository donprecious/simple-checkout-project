import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { PersistenceModule } from "@infrastructure/persistence/persistence.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InfrastructureModule,
    PersistenceModule,
  ],
  providers: [],

  exports: [ConfigModule, InfrastructureModule, PersistenceModule],
})
export class SharedModule {}
