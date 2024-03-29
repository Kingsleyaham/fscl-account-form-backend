import { IJointPersAcccount } from "./../interfaces/jointPersDetails.interface";
import { pdfService } from "./pdf.service";
import { mailService } from "./mail.service";
import { ICorporateAccount } from "./../interfaces/corporateAccount.interface";
import { IJointAccount } from "./../interfaces/jointAccount.interface";
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
import AccountType from "../models/accountType.model";
import CorporateDetail from "../models/corporateDetail.model";
import JointPersDetail from "../models/jointPersDetail.model";
import { ICorporateDetails } from "../interfaces/corporateDetails.interface";
import path from "path";
import { mailConfig } from "../config";

class AccountService {
  pdfPath = "./src/assets/pdfs";
  uploadsPath = "./src/assets/uploads";

  async savePersonalDetails(reqBody: IPersonalDetails) {
    return PersonalDetail.create({ ...reqBody });
  }

  async savejointPersonalDetails(reqBody: IJointPersAcccount) {
    const { personalDetails } = reqBody;
    const persDetailsObj: Array<IPersonalDetails> = [];

    personalDetails.forEach(async (elem, index) => {
      let detail = await JointPersDetail.create({
        country: elem.country,
        dateOfBirth: elem.dateOfBirth,
        firstName: elem.firstName,
        middleName: elem.middleName,
        surname: elem.surname,
        gender: elem.gender,
        lga: elem.lga,
        maritalStatus: elem.maritalStatus,
        motherMaidenName: elem.motherMaidenName,
        profession: elem.profession,
        stateOfOrigin: elem.stateOfOrigin,
        title: elem.title,
        // userId:
      });

      persDetailsObj.push(detail.dataValues);
    });

    return persDetailsObj;
  }

  async saveCorporateDetails(reqBody: ICorporateDetails) {
    return CorporateDetail.create({ ...reqBody });
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
    const signatoryObj: Array<object> = [];
    // authorizedSigature;

    reqFile.forEach((file) => {
      if (file.fieldname.includes("signatorySignature")) signatoryUploads.push(file.filename);
    });

    // console.log(signatoryUploads);
    signatory.forEach(async (elem, index) => {
      let sig = await SignatoryMandate.create({
        userId,
        name: elem.name,
        designation: elem.designation,
        class: elem.class,
        signature: await getItemWithIndex(signatoryUploads, index),
      });

      signatoryObj.push(sig.dataValues);
    });

    return signatoryObj;
  }

  async saveAuthorizedPersons(param: IAuthorizedPersons) {
    const { authorizedPerson, reqFile, userId } = param;
    const authorizedSignatures: Array<string> = [];
    const authorizedPassport: Array<string> = [];

    const authPersObj: Array<object> = [];

    reqFile.forEach((file) => {
      if (file.fieldname.includes("authorizedSignature")) authorizedSignatures.push(file.filename);
      if (file.fieldname.includes("authorizedPassport")) authorizedPassport.push(file.filename);
    });

    authorizedPerson.forEach(async (elem, index) => {
      let auth = await AuthorizedPerson.create({
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

      authPersObj.push(auth.dataValues);
    });

    return authPersObj;
  }

  async saveAccountType(userId: number, accountType: string, tableRef: string) {
    return AccountType.create({ accountType, userId, tableRef });
  }

  async createIndividualAccount(reqBody: IIndividualAccount, reqFile: any) {
    const user = await this.savePersonalDetails(reqBody);
    const userId = user.id;

    const contactDetails = await this.saveContactDetails({ ...reqBody, userId });
    const employmentDetails = await this.saveEmploymentDetails({ ...reqBody, userId });
    const bankDetails = await this.saveBankDetails({ ...reqBody, userId });
    const nokDetails = await this.saveNextOfKinDetails({ ...reqBody, userId });
    const investDetails = await this.saveInvestmentDetails({ ...reqBody, userId });
    const pepDetails = await this.savePEPDetails({ ...reqBody, userId });
    const kycDocs = await this.saveKycFileNames({ userId, reqFile });
    const signatories = await this.saveSignatories({
      userId,
      signatory: reqBody.signatory,
      reqFile,
    });
    const authPersonnels = await this.saveAuthorizedPersons({
      userId,
      authorizedPerson: reqBody.authorizedPerson,
      reqFile,
    });
    const accountType = await this.saveAccountType(userId, reqBody.accountType, "personal_details");

    const dataObj = {
      accountType: accountType.dataValues.accountType,
      personalDetails: user.dataValues,
      contactDetails: contactDetails.dataValues,
      employmentDetails: employmentDetails.dataValues,
      nokDetails: nokDetails.dataValues,
      investDetails: investDetails.dataValues,
      pepDetails: pepDetails.dataValues,
      bankDetails: bankDetails.dataValues,
      kycDocs: kycDocs.dataValues,
      signatories,
      authPersonnels: authPersonnels,
    };

    const generatedPdf = await pdfService.generatePdf("individual.temp", dataObj);
    const extraAttachment: Array<any> = [];

    // add authpersonnels files as attachments
    dataObj.authPersonnels.forEach((personnel: any) => {
      extraAttachment.push({ path: `${this.uploadsPath}/${personnel.passport}` });
      extraAttachment.push({ path: `${this.uploadsPath}/${personnel.signature}` });
    });

    // add signatories uploads as attachments

    dataObj.signatories.forEach((signatory: any) =>
      extraAttachment.push({ path: `${this.uploadsPath}/${signatory.signature}` })
    );

    await mailService.sendMail({
      from: `FCSL Asset Mgt <${mailConfig.mailFrom}>`,
      to: mailConfig.mailTo,
      subject: `${dataObj.accountType} account - ${user.firstName} ${user.surname}`,
      text: `Account was successfullly created for ${user.firstName} ${user.surname}`,
      attachments: [
        {
          filename: generatedPdf,
          path: `${this.pdfPath}/${generatedPdf}`,
        },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.signature}` },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.identityUpload}` },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.passport}` },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.utilityBill}` },
        ...extraAttachment,
      ],
    });

    console.log(dataObj);

    return { message: "account created successfully" };
  }

  async createJointAccount(reqBody: IJointAccount, reqFile: any) {
    const contactDetails = await this.saveContactDetails({ ...reqBody, userId: 0 });
    const userId = contactDetails.id;

    const personalDetails = await this.savejointPersonalDetails({ ...reqBody, userId });

    const employmentDetails = await this.saveEmploymentDetails({ ...reqBody, userId });
    const bankDetails = await this.saveBankDetails({ ...reqBody, userId });
    const nokDetails = await this.saveNextOfKinDetails({ ...reqBody, userId });
    const investDetails = await this.saveInvestmentDetails({ ...reqBody, userId });
    const pepDetails = await this.savePEPDetails({ ...reqBody, userId });
    const kycDocs = await this.saveKycFileNames({ userId, reqFile });
    const signatories = await this.saveSignatories({
      userId,
      signatory: reqBody.signatory,
      reqFile,
    });
    const authPersonnels = await this.saveAuthorizedPersons({
      userId,
      authorizedPerson: reqBody.authorizedPerson,
      reqFile,
    });
    const accountType = await this.saveAccountType(userId, reqBody.accountType, "personal_details");

    const dataObj = {
      accountType: accountType.dataValues.accountType,
      personalDetails,
      contactDetails: contactDetails.dataValues,
      employmentDetails: employmentDetails.dataValues,
      nokDetails: nokDetails.dataValues,
      investDetails: investDetails.dataValues,
      pepDetails: pepDetails.dataValues,
      bankDetails: bankDetails.dataValues,
      kycDocs: kycDocs.dataValues,
      signatories,
      authPersonnels: authPersonnels,
    };

    console.log(dataObj);

    const generatedPdf = await pdfService.generatePdf("joint.temp", dataObj);
    const extraAttachment: Array<any> = [];

    // add authpersonnels files as attachments
    dataObj.authPersonnels.forEach((personnel: any) => {
      extraAttachment.push({ path: `${this.uploadsPath}/${personnel.passport}` });
      extraAttachment.push({ path: `${this.uploadsPath}/${personnel.signature}` });
    });

    // add signatories uploads as attachments

    dataObj.signatories.forEach((signatory: any) =>
      extraAttachment.push({ path: `${this.uploadsPath}/${signatory.signature}` })
    );

    await mailService.sendMail({
      from: `FCSL Asset Mgt <${mailConfig.mailFrom}>`,
      to: mailConfig.mailTo,
      subject: `${dataObj.accountType} account`,
      text: `Joint Account was successfullly created`,
      attachments: [
        {
          filename: generatedPdf,
          path: `${this.pdfPath}/${generatedPdf}`,
        },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.signature}` },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.identityUpload}` },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.passport}` },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.utilityBill}` },
        ...extraAttachment,
      ],
    });

    return { message: "account created successfully" };
  }

  async createCorporateAccount(reqBody: ICorporateAccount, reqFile: any) {
    const user = await this.saveCorporateDetails(reqBody);
    const userId = user.id;

    const contactDetails = await this.saveContactDetails({ ...reqBody, userId });
    const investDetails = await this.saveInvestmentDetails({ ...reqBody, userId });
    const bankDetails = await this.saveBankDetails({ ...reqBody, userId });
    const kycDocs = await this.saveKycFileNames({ userId, reqFile });
    const signatories = await this.saveSignatories({
      userId,
      signatory: reqBody.signatory,
      reqFile,
    });
    const authPersonnels = await this.saveAuthorizedPersons({
      userId,
      authorizedPerson: reqBody.authorizedPerson,
      reqFile,
    });
    const accountType = await this.saveAccountType(
      userId,
      reqBody.accountType,
      "corporate_details"
    );

    const dataObj = {
      accountType: reqBody.accountType,
      corporateDetails: user.dataValues,
      contactDetails: contactDetails.dataValues,
      investDetails: investDetails.dataValues,
      bankDetails: bankDetails.dataValues,
      kycDocs: kycDocs.dataValues,
      signatories,
      authPersonnels,
    };

    const generatedPdf = await pdfService.generatePdf("corporate.temp", dataObj);
    const extraAttachment: Array<any> = [];

    // add authpersonnels files as attachments
    dataObj.authPersonnels.forEach((personnel: any) => {
      extraAttachment.push({ path: `${this.uploadsPath}/${personnel.passport}` });
      extraAttachment.push({ path: `${this.uploadsPath}/${personnel.signature}` });
    });

    // add signatories uploads as attachments

    dataObj.signatories.forEach((signatory: any) =>
      extraAttachment.push({ path: `${this.uploadsPath}/${signatory.signature}` })
    );

    await mailService.sendMail({
      from: `FCSL Asset Mgt <${mailConfig.mailFrom}>`,
      to: mailConfig.mailTo,
      subject: `${dataObj.accountType} account - ${user.companyName}`,
      text: `Account was successfullly created for ${user.companyName}`,
      attachments: [
        {
          filename: generatedPdf,
          path: `${this.pdfPath}/${generatedPdf}`,
        },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.signature}` },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.identityUpload}` },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.passport}` },
        { path: `${this.uploadsPath}/${dataObj.kycDocs.utilityBill}` },
        ...extraAttachment,
      ],
    });

    return { message: "account created successfully" };
  }
}

export const accountService = new AccountService();
