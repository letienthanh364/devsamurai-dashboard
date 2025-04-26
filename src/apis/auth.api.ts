import { SuccessReponse } from "@/types/_commons/response.type";
import { User } from "@/types/user/user.type";
import axiosInstance from "@/utils/axios.util";

const url = "/v1/auth";

const authApi = {
  register(body: { email: string; password: string; name: string }) {
    return axiosInstance.post<SuccessReponse<User>>(`${url}/register`, body);
  },
  login(body: { email: string | null; password: string | null }) {
    return axiosInstance.post<SuccessReponse<string>>(`${url}/login`, body);
  },

  getProfile() {
    return axiosInstance.get<SuccessReponse<User>>(`${url}/me`);
  },
};

export default authApi;
