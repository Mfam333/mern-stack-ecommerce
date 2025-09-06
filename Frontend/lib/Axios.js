import axios from "axios";

const AxiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE==="development"
      ? "http://localhost:5000/api"
      : "/api",
  withCredentials: true, // this allows us to send cookies in the request
});

export default AxiosInstance;



