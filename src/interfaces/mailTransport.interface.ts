interface IProps {
  user: string;
  pass: string;
}

export interface ICreateTransport {
  host: string;
  port: number;
  secure: boolean;
  auth: IProps;
}
