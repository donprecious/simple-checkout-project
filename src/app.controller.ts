import { Controller, Get, Inject, OnModuleInit, Query } from "@nestjs/common";
import { AppService } from "./app.service";

import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}