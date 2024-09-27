import { SlideElementTypes } from "../constants/presetation";

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
  users:       UserRoleData[];
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
  users:       UserRoleData[]
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

export interface UserRoleData {
  user: Creator
  role: string
  _id:  string
  isConnected: boolean
}

export interface GetPresentationsMetaData {
  currentPage:        number
  totalPages:         number
  totalPresentations: number
  pageSize:           number
}

export interface GetPresentationResponse {
  data: GetPresentationData
}

export interface GetPresentationData {
  _id:       string
  title:     string
  slides:    Slide[]
  users:     UserRoleData[]
  creator:   Creator
  createdAt: Date
  updatedAt: Date
}

export interface Creator {
  _id:       string;
  nickname:  string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Slide {
  _id:       string
  content:   string
  elements:  SlideElementData[]
  createdAt: Date
  updatedAt: Date
}

export interface SlideElementData {
  _id:       string
  type:      string
  x:         number
  y:         number
  draggable: boolean
  color?:     string
  createdAt: Date
  updatedAt: Date
  content?: string
  originalText?: string
}

export interface SlideElementRequest {
  x:         number
  y:         number
  type: SlideElementTypes
  content?: string
  originalText?: string
  draggable: boolean
  color?: string
}
