
export interface RegisterUserResponse {
  data: Data;
}

export interface Data {
  nickname:  string;
  _id:       string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  nickname:  string;
  _id:       string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalStorageUser {
  _id: string
  nickname: string
}

export enum UserRole {
  VIEWER = 'viewer',
  EDITOR = 'editor',
  CREATOR = 'creator',
}
