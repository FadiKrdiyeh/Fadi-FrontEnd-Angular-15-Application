/**
 * API response model
 * status: request result
 * message: message coming from api
 * value: data returned
 * @export
 * @interface ApiResponse
 */
export interface ApiResponse {
  status: boolean;
  message: string;
  value: any;
}
