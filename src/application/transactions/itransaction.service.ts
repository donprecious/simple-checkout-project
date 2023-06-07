import { Transaction } from "@domain/entities/transaction.entity";
import { CheckoutModel, CheckoutResponseModel } from "./model/checkout.model";
import {
  GetTransactionQueryModel,
  TransactionModel,
} from "./model/transactions.model";

export interface ITransactionService {
  checkout(model: CheckoutModel): Promise<CheckoutResponseModel>;
  getTransactions(model: GetTransactionQueryModel): Promise<TransactionModel[]>;
}
export const itransactionserviceDiToken = "itransaction.service.token";
