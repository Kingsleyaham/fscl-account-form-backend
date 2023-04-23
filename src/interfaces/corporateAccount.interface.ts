import { IAuthorizedPersons } from "./authorizedPerson.interface";
import { IBankDetails } from "./bankDetails.interface";
import { IContactDetails } from "./contactDetails.interface";
import { ICorporateDetails } from "./corporateDetails.interface";
import { IInvestmentDetails } from "./investmentDetails.interface";
import { IKycDocuments } from "./kyc.interface";
import { ISignatories } from "./signatory.interface";

export interface ICorporateAccount
  extends ICorporateDetails,
    IContactDetails,
    IAuthorizedPersons,
    IInvestmentDetails,
    IBankDetails,
    ISignatories,
    IKycDocuments {
  userId?: number;
  accountType: string;
}
