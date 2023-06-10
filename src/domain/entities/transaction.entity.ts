import {
  transactionCategoryEnum,
  transactionStatusEnum,
  transactionTypeEnum,
} from "../enums/transaction.enum";
import { SharedEntity } from "../common/sharedEntity";

import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Purchase } from "./purchases.entity";
@Entity()
export class Transaction extends SharedEntity {
  @Column({ unique: true })
  referenceNo: string;

  @Column({ type: "decimal", precision: 20, scale: 10 })
  amount: number;

  @Column()
  currencyCode: string;

  @Column({ type: "simple-enum", enum: transactionTypeEnum })
  type: transactionTypeEnum;

  @Column({ type: "simple-enum", enum: transactionCategoryEnum })
  category: transactionCategoryEnum;

  @Column({ nullable: true })
  narration?: string;

  @Column({ type: "simple-enum", enum: transactionStatusEnum })
  status: transactionStatusEnum;

  @OneToOne(() => Purchase, (purchase) => purchase.transaction)
  purchase: Purchase;
}
