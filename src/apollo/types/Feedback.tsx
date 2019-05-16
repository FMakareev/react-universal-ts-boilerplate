import { IUser } from './User';

export interface IFeedback {
  id: string;
  user: IUser;
  message: string;
}
