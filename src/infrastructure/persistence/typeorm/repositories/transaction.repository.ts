import { Transaction } from "@domain/entities/transaction.entity";
import { ITransactionRepository } from "@domain/repository/itransaction.repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    public repository: Repository<Transaction>
  ) {}
  async findByReference(reference: string) {
    return this.repository.findOne({ where: { referenceNo: reference } });
  }
}
