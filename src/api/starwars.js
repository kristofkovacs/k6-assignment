import axios from "axios";

const URL = "https://swapi.dev/api";

export default axios.create({
  baseURL: URL,
  mode: "no-cors",
});
