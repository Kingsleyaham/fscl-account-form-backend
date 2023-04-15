import { IKycDocuments } from "./kyc.interface";

interface IObjectProps {
  name: string;
  address: string;
  mobileNum: string;
  email: string;
  bvn: string;
  identification: string;
  passport: any;
  signatures: any;
}

export interface IAuthorizedPersons extends IKycDocuments {
  authorizedPerson: Array<IObjectProps>;
}
