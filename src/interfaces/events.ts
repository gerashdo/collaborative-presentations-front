import { SlideElementData, UserRoleData } from "./api"

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
  users:     UserRoleData[];
  creator:   Creator;
  createdAt: Date;
  updatedAt: Date;
}

export interface PresentationUserJoinedData {
  _id:       string
  title:     string
  slides:    Slide[]
  users:     UserRoleData[]
  creator:   Creator
  createdAt: Date
  updatedAt: Date
}

export interface Creator {
  _id:       string
  nickname:  string
  createdAt: Date
  updatedAt: Date
}

export interface Slide {
  _id:       string
  content:   string
  elements:  SlideElementData[]
  createdAt: Date
  updatedAt: Date
}

export interface SlideUpdatedPayload {
  presentationId: string
  slide: Slide
}

export interface SlideElementUpdatedPayload {
  presentationId: string
  slideId: string
  element: SlideElementData
}
