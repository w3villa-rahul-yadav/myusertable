import common from "./common";
import axios from "axios";


export const _getUserDetails = (data) => {
  var apiData = {
    method: "GET",
    url: common.allUser,
    data: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return axios(apiData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

export const _addUser = (data) => {
    var apiData = {
      method: "POST",
      url: common.addUser,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    return axios(apiData)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
};

export const _updateUser = (data) => {
    var apiData = {
      method: "PATCH",
      url: `${common.allUser}/${data.userId}`,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    return axios(apiData)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  