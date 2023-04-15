import { IKycDocuments } from "./../interfaces/kyc.interface";
import { IPepStatus } from "./../interfaces/pepStatus.interface";
import { IInveestmentDetails } from "./../interfaces/investmentDetails.interface";
import { IEmploymentDetails } from "./../interfaces/employmentDetails.interface";
import { IBankDetails } from "./../interfaces/bankDetails.interface";
import { INextOfKin } from "./../interfaces/nok.interface";
import { IContactDetails } from "./../interfaces/contactDetails.interface";
import { IPersonalDetails } from "../interfaces/personalDetails.interface";
import PersonalDetail from "../models/personalDetail.model";
import ContactDetail from "../models/contactDetails.model";
import NextOfKin from "../models/nok.model";
import BankAccountDetail from "../models/bankAccountDetail.model";
import EmploymentDetail from "../models/employmentDetail.model";
import InvestmentDetail from "../models/investmentDetail.model";
import PepStatus from "../models/pepStatus.model";

class AccountService {
  async savePersonalDetails(reqBody: IPersonalDetails) {
    console.log(reqBody);

    return PersonalDetail.create({ ...reqBody });
  }

  async saveContactDetails(reqBody: IContactDetails) {
    return ContactDetail.create({ ...reqBody });
  }

  async saveNextOfKinDetails(reqBody: INextOfKin) {
    return NextOfKin.create({ ...reqBody });
  }

  async saveBankDetails(reqBody: IBankDetails) {
    return BankAccountDetail.create({ ...reqBody });
  }

  async saveEmploymentDetails(reqBody: IEmploymentDetails) {
    return EmploymentDetail.create({ ...reqBody });
  }

  async saveInvestmentDetails(reqBody: IInveestmentDetails) {
    return InvestmentDetail.create({ ...reqBody });
  }

  async savePEPDetails(reqBody: IPepStatus) {
    return PepStatus.create({ ...reqBody });
  }

  async saveKycFileNames(reqFile: IKycDocuments) {
    const {
      identityUpload,
      utilityBill,
      passportUpload: passport,
      signatureUpload: signature,
    } = reqFile;

    return InvestmentDetail.create({
      utilityBill,
      identityUpload,
      passport,
      signature,
    });
  }

  async createIndividualAccount(reqBody: any) {
    const user = await this.savePersonalDetails(reqBody);
    const userId = user.id;

    return userId;
  }

  async createJointAccount(reqBody: any) {}

  async createCorporateAccount(reqBody: any) {}
}

export const accountService = new AccountService();
