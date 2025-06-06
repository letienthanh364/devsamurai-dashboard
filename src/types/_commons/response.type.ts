export interface ErrorRespone {
  statusCode: number;
  error: string | null;
  message: string | string[];
}

export interface SuccessReponse<Data> {
  data: Data;
  statusCode: number;
  message: string | string[];
}
