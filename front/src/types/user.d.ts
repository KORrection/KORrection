export interface IProfile {
  userObjId: string;
  description: string;
  nickname: string;
  profilePicture: string;
  userEmail: string;
  [key: string]: string;
}
