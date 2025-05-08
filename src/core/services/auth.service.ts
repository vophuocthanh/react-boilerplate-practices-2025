import axiosClient from '@/core/services/axios-client'
import { type Account, type LoginResponse, type RegisterReponse } from '@/models/interface/auth.interface'

const API_LOGIN_URL = '/auth/login'
const API_REGISTER_URL = '/auth/register'

export const authApi = {
  login(params: Account): Promise<LoginResponse> {
    return axiosClient.post(API_LOGIN_URL, params)
  },
  register(params: Account): Promise<RegisterReponse> {
    return axiosClient.post(API_REGISTER_URL, params)
  }
}
