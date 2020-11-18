import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://qwzd.herokuapp.com/" : "https://qwzd.herokuapp.com/", // 나중에 heroku같은 걸로 배포하게 되면 production일 시에 그 쪽 url로
});