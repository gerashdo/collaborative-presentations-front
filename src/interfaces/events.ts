
export interface UserJoinedPayload {
  presentation: PresentationUserJoinedData
}

export interface UserLeftPayload {
  presentation: PresentationUserJoinedData
}

export interface UpdateUserRolePayload {
  presentation: PresentationUserJoinedData
}

export interface SlideAddedPayload {
  presentation: PresentationUserJoinedData
}

export interface SlideRemovedPayload {
  presentation: PresentationUserJoinedData
}

export interface PresentationUserLeftData {
  _id:       string;
  title:     string;
  slides:    Slide[];
  users:     User[];
  creator:   Creator;
  createdAt: Date;
  updatedAt: Date;
}

export interface PresentationUserJoinedData {
  _id:       string;
  title:     string;
  slides:    Slide[];
  users:     User[];
  creator:   Creator;
  createdAt: Date;
  updatedAt: Date;
}

export interface Creator {
  _id:       string;
  nickname:  string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Slide {
  _id:       string;
  content:   string;
  elements:  any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  user: Creator;
  role: string;
  _id:  string;
}
