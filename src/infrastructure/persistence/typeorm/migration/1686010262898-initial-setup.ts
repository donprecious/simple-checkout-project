import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1686010262898 implements MigrationInterface {
  name = "InitialSetup1686010262898";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."purchase_currencytype_enum" AS ENUM('FIAT', 'CRYPTO')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."purchase_status_enum" AS ENUM('PENDING', 'SUCCESS', 'FAILED')`
    );
    await queryRunner.query(
      `CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP DEFAULT now(), "updatedBy" character varying, "deletedOn" TIMESTAMP, "deletedBy" character varying, "referenceNo" character varying NOT NULL, "productName" character varying NOT NULL, "customerFirstName" character varying NOT NULL, "customerLastName" character varying NOT NULL, "customerEmail" character varying NOT NULL, "amount" numeric(20,10) NOT NULL, "currencyCode" character varying NOT NULL, "currencyType" "public"."purchase_currencytype_enum" NOT NULL, "status" "public"."purchase_status_enum" NOT NULL, "transactionId" uuid NOT NULL, CONSTRAINT "UQ_d3901c8f2a7536e83ea433dd740" UNIQUE ("referenceNo"), CONSTRAINT "REL_d65d5869ba2fc57ed3ba1730de" UNIQUE ("transactionId"), CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_type_enum" AS ENUM('CREDIT', 'DEBIT')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_category_enum" AS ENUM('DEPOSIT', 'WITHDRAW', 'PRODUCT_PURCHASE')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_status_enum" AS ENUM('PENDING', 'SUCCESS', 'FAILED')`
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP DEFAULT now(), "updatedBy" character varying, "deletedOn" TIMESTAMP, "deletedBy" character varying, "referenceNo" character varying NOT NULL, "amount" numeric(20,10) NOT NULL, "currencyCode" character varying NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "category" "public"."transaction_category_enum" NOT NULL, "narration" character varying, "status" "public"."transaction_status_enum" NOT NULL, CONSTRAINT "UQ_6614e152cba650a0352ca7cce8f" UNIQUE ("referenceNo"), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_d65d5869ba2fc57ed3ba1730def" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_d65d5869ba2fc57ed3ba1730def"`
    );
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_category_enum"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
    await queryRunner.query(`DROP TABLE "purchase"`);
    await queryRunner.query(`DROP TYPE "public"."purchase_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."purchase_currencytype_enum"`);
  }
}
