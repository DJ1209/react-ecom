import axios from "axios";

const baseUrl = "https://mernadmin.herokuapp.com/api/userapi";

// GET METHOD

export const get = apiUrl => {
  let url = `${baseUrl}${apiUrl}`;
  return axios
    .get(url)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

//POST METHOD

export const post = (apiUrl, data) => {
  let url = `${baseUrl}${apiUrl}`;
  return axios
    .post(url, data)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};
