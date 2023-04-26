import { IPersonalDetails } from "./personalDetails.interface";

export interface IJointPersAcccount {
  userId?: number;
  personalDetails: Array<IPersonalDetails>;
}
