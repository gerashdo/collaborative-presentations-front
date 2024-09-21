import axios from "axios"
import { BASE_URL } from "../constants/api"
import { AllowedPresentationOrderByFields } from "../interfaces/presentation"
import { OrderDirection } from "../interfaces/utils"
import { GetPresentationsResponse } from "../interfaces/api"


export const getPresentations = async (
  page: number,
  limit: number,
  orderBy: AllowedPresentationOrderByFields = AllowedPresentationOrderByFields.createdAt,
  orderDirection: OrderDirection = OrderDirection.DESC
) => {
  const url = `${BASE_URL}/presentations`
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    orderBy,
    orderDirection
  })
  return await axios.get<GetPresentationsResponse>(url, { params })
}
