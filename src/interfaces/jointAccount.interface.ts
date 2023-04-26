import { IAuthorizedPersons } from "./authorizedPerson.interface";
import { IBankDetails } from "./bankDetails.interface";
import { IContactDetails } from "./contactDetails.interface";
import { IEmploymentDetails } from "./employmentDetails.interface";
import { IInvestmentDetails } from "./investmentDetails.interface";
import { IJointPersAcccount } from "./jointPersDetails.interface";
import { IKycDocuments } from "./kyc.interface";
import { INextOfKin } from "./nok.interface";
import { IPepStatus } from "./pepStatus.interface";
import { ISignatories } from "./signatory.interface";

export interface IJointAccount
  extends IJointPersAcccount,
    IContactDetails,
    IBankDetails,
    IEmploymentDetails,
    IInvestmentDetails,
    IKycDocuments,
    INextOfKin,
    IPepStatus,
    IAuthorizedPersons,
    ISignatories {
  // personal details
  userId?: number;
  accountType: string;
}
