
export interface GetPresentationsResponse {
  data: GetPresentationsData[];
  meta: GerPresentationsMetaData;
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

export interface GerPresentationsMetaData {
  currentPage:        number
  totalPages:         number
  totalPresentations: number
  pageSize:           number
}
