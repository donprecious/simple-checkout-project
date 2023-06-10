import { SharedEntity } from "../common/sharedEntity";
import { currencyType } from "../enums/currencyType.enum";
import { transactionStatusEnum } from "../enums/transaction.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class Purchase extends SharedEntity {
  @Column({ unique: true })
  referenceNo: string;

  @Column()
  productName: string;

  @Column()
  customerFirstName: string;

  @Column()
  customerLastName: string;

  @Column()
  customerEmail: string;

  @Column({ type: "decimal", precision: 20, scale: 10 })
  amount: number;

  @Column()
  currencyCode: string;

  @Column({ type: "simple-enum", enum: currencyType })
  currencyType: currencyType;

  @Column({ type: "simple-enum", enum: transactionStatusEnum })
  status: transactionStatusEnum;

  @Column()
  transactionId: string;

  @OneToOne(() => Transaction, (transaction) => transaction.purchase)
  @JoinColumn()
  transaction: Transaction;
}
