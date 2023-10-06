import { AxiosResponse } from "axios"
import {
  IStartLivenessSessionDTO,
  IStartLivenessSessionResponse
} from "../models/liveness"
import http from "./http.service"

const API_URL = process.env.REACT_APP_API_URL

export const livenessService = {
  async livenessStart(
    payload: IStartLivenessSessionDTO
  ): Promise<AxiosResponse<IStartLivenessSessionResponse>> {
    return await http.post(`${API_URL}verification/liveness/start`, payload, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-ORG-TOKEN": payload.token
      }
    })
  }
}
