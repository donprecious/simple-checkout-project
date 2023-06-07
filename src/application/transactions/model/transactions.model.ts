import { ApiProperty } from "@nestjs/swagger";
import { SharedEntityDto } from "@application/dtos/common/sharedentity.dto";
import { currencyType } from "@domain/enums/currencyType.enum";
import {
  transactionCategoryEnum,
  transactionStatusEnum,
  transactionTypeEnum,
} from "@domain/enums/transaction.enum";

export class GetTransactionQueryModel {}

export class PurchaseModel extends SharedEntityDto {
  referenceNo: string;

  productName: string;

  customerFirstName: string;

  customerLastName: string;

  customerEmail: string;

  amount: number;

  currencyCode: string;

  currencyType: currencyType;

  status: transactionStatusEnum;

  transactionId: string;
}

export class TransactionModel extends SharedEntityDto {
  referenceNo: string;

  amount: number;

  currencyCode: string;

  type: transactionTypeEnum;

  category: transactionCategoryEnum;

  narration?: string;

  status: transactionStatusEnum;

  @ApiProperty({ type: () => PurchaseModel })
  purchase: PurchaseModel;
}
