import { currencyType } from "@domain/enums/currencyType.enum";
import { IsNotEmpty } from "class-validator";

export class CheckoutModel {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  productname: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  currencyCode: string;

  @IsNotEmpty()
  currencyType: currencyType;
}

export class CheckoutResponseModel {
  referenceNumber: string;
}
