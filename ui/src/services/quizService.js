import http from "./httpService";
import { getJwt } from "../services/authService";

const apiEndpoint = "/api/quizes";

export function publish(quiz) {
  console.log("published");
  http.setJwt(getJwt());
  return http.post(apiEndpoint, { ...quiz });
}

export function getQuizesByCreater(creater_id) {
  return http.get(`${apiEndpoint}/creater/${creater_id}`);
}
