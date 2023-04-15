import { IKycDocuments } from "./kyc.interface";

interface IObjectProps {
  name: string;
  designation: string;
  class: string;
  signature?: any;
}

export interface ISignatories extends IKycDocuments {
  signatory: Array<IObjectProps>;
}
