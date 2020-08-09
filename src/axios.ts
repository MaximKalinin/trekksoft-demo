import axiosDefault from "axios";

const axios = axiosDefault.create({
  baseURL: "https://api.github.com/",
});

export { axios };
