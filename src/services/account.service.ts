import { getItemWithIndex } from "../utils/getItem";
import { IAuthorizedPersons } from "./../interfaces/authorizedPerson.interface";
import { ISignatories } from "./../interfaces/signatory.interface";
import { IIndividualAccount } from "./../interfaces/individualAccount.interface";
import { IKycDocuments } from "./../interfaces/kyc.interface";
import { IPepStatus } from "./../interfaces/pepStatus.interface";
import { IInvestmentDetails } from "./../interfaces/investmentDetails.interface";
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
import KycDocument from "../models/kycDocument.model";
import SignatoryMandate from "../models/signatoryMandate.model";
import AuthorizedPerson from "../models/authorizedPerson.model";

class AccountService {
  async savePersonalDetails(reqBody: IPersonalDetails) {
    return PersonalDetail.create({ ...reqBody });
  }

  async saveContactDetails(reqBody: IContactDetails) {
    const { contactAddress, email, mobileNumber, postalAddress, userId } = reqBody;

    return ContactDetail.create({
      address: contactAddress,
      email,
      mobileNumber,
      postalAddress,
      userId,
    });
  }

  async saveNextOfKinDetails(reqBody: INextOfKin) {
    const {
      nokAddress: address,
      nokFullname: name,
      nokGender: gender,
      nokMobileNumber: mobileNum,
      nokRelationship: relationship,
      nokTitle: title,
      userId,
    } = reqBody;

    return NextOfKin.create({
      address,
      gender,
      mobileNum,
      name,
      relationship,
      title,
      userId,
    });
  }

  async saveBankDetails(reqBody: IBankDetails) {
    const { accountName, accountNumber, bankName: bank, accountOpenDate, bvn, userId } = reqBody;

    return BankAccountDetail.create({
      accountName,
      accountNumber,
      accountOpenDate,
      bank,
      bvn,
      userId,
    });
  }

  async saveEmploymentDetails(reqBody: IEmploymentDetails) {
    return EmploymentDetail.create({ ...reqBody });
  }

  async saveInvestmentDetails(reqBody: IInvestmentDetails) {
    const {
      investAddress: address,
      investEmail: email,
      investMobileNumber: mobileNum,
      investPostalAddress: postalAddress,
      userId,
    } = reqBody;

    return InvestmentDetail.create({ address, email, mobileNum, postalAddress, userId });
  }

  async savePEPDetails(reqBody: IPepStatus) {
    const { pepStatus: status, pepDetails: details, userId } = reqBody;

    return PepStatus.create({ status, details, userId });
  }

  async saveKycFileNames(param: IKycDocuments) {
    const { reqFile, userId } = param;

    let utilityBill = "";
    let identityUpload = "";
    let passport = "";
    let signature = "";

    reqFile.forEach((file) => {
      if (file.fieldname.includes("utilityBill")) utilityBill = file.filename;
      if (file.fieldname.includes("passportPhoto")) passport = file.filename;
      if (file.fieldname.includes("signatureUpload")) signature = file.filename;
      if (file.fieldname.includes("identityUpload")) identityUpload = file.filename;
    });

    return KycDocument.create({ userId, utilityBill, identityUpload, passport, signature });
  }

  async saveSignatories(param: ISignatories) {
    const { userId, signatory, reqFile } = param;
    const signatoryUploads: Array<string> = [];
    // authorizedSigature;

    reqFile.forEach((file) => {
      if (file.fieldname.includes("signatorySignature")) signatoryUploads.push(file.filename);
    });

    // console.log(signatoryUploads);
    signatory.forEach(async (elem, index) => {
      SignatoryMandate.create({
        userId,
        name: elem.name,
        designation: elem.designation,
        class: elem.class,
        signature: await getItemWithIndex(signatoryUploads, index),
      });
    });

    return;
  }

  async saveAuthorizedPersons(param: IAuthorizedPersons) {
    const { authorizedPerson, reqFile, userId } = param;
    const authorizedSignatures: Array<string> = [];
    const authorizedPassport: Array<string> = [];

    reqFile.forEach((file) => {
      if (file.fieldname.includes("authorizedSignature")) authorizedSignatures.push(file.filename);
      if (file.fieldname.includes("authorizedPassport")) authorizedPassport.push(file.filename);
    });

    authorizedPerson.forEach(async (elem, index) => {
      AuthorizedPerson.create({
        userId,
        address: elem.address,
        bvn: elem.bvn,
        email: elem.email,
        mobileNum: elem.mobileNum,
        meansOfIdentification: elem.identification,
        name: elem.name,
        passport: await getItemWithIndex(authorizedPassport, index),
        signature: await getItemWithIndex(authorizedSignatures, index),
      });
    });

    return;
  }

  async createIndividualAccount(reqBody: IIndividualAccount, reqFile: any) {
    const user = await this.savePersonalDetails(reqBody);
    const userId = user.id;

    await this.saveContactDetails({ ...reqBody, userId });
    await this.saveEmploymentDetails({ ...reqBody, userId });
    await this.saveBankDetails({ ...reqBody, userId });
    await this.saveNextOfKinDetails({ ...reqBody, userId });
    await this.saveInvestmentDetails({ ...reqBody, userId });
    await this.savePEPDetails({ ...reqBody, userId });
    await this.saveKycFileNames({ userId, reqFile });
    await this.saveSignatories({ userId, signatory: reqBody.signatory, reqFile });
    await this.saveAuthorizedPersons({
      userId,
      authorizedPerson: reqBody.authorizedPerson,
      reqFile,
    });

    return { message: "account created successfully" };
  }

  async createJointAccount(reqBody: any) {}

  async createCorporateAccount(reqBody: any) {}
}

export const accountService = new AccountService();
