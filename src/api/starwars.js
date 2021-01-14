import axios from "axios";

const URL = "https://swapi.py4e.com/api";

export default axios.create({
  baseURL: URL,
  mode: "no-cors",
});
