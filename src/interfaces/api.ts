
export interface PostPresentationRequest {
  title: string
  creatorId: string
}

export interface PostPresentationResponse {
  data: PresentationDataResponse;
}

export interface PresentationDataResponse {
  title:       string;
  description: string;
  slides:      string[];
  users:       User[];
  creator:     string;
  _id:         string;
  createdAt:   Date;
  updatedAt:   Date;
}

export interface GetPresentationsResponse {
  data: GetPresentationsData[];
  meta: GetPresentationsMetaData;
}

export interface GetPresentationsData {
  _id:         string
  title:       string
  description: string
  slides:      string[]
  users:       User[]
  creator:     Creator
  createdAt:   Date
  updatedAt:   Date
}

export interface Creator {
  _id:       string;
  nickname:  string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  user: string
  role: string
  _id:  string
}

export interface GetPresentationsMetaData {
  currentPage:        number
  totalPages:         number
  totalPresentations: number
  pageSize:           number
}

export interface GetPresentationResponse {
  data: GetPresentationData;
}

export interface GetPresentationData {
  _id:         string;
  title:       string;
  description: string;
  slides:      Slide[];
  users:       UserRoleData[];
  creator:     Creator;
  createdAt:   Date;
  updatedAt:   Date;
}

export interface Slide {
  _id:       string;
  content:   string;
  elements:  any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRoleData{
  user: Creator;
  role: string;
  _id:  string;
}
