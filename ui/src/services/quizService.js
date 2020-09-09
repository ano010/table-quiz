import http from "./httpService";

const apiEndpoint = "/api/quizes";

export function publish(quiz) {
  console.log(quiz);
  return http.post(apiEndpoint, { ...quiz });
}

export function getQuizesByCreater(creater_id) {
  return http.get(`${apiEndpoint}/creater/${creater_id}`);
}
