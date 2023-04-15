interface IObjectProps {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface IKycDocuments {
  userId?: number;
  reqFile: Array<IObjectProps>;
}
