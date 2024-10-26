import axios from "axios";

export const BASE_URL = "http://localhost:3000";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    token: localStorage.getItem("LOGIN_USER"),
  },
};

// Create 1 axios instance
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});
// to attach the header access_token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Check the required flag: requiredAuth
    if (config.requiredAuth) {
      const access_token = localStorage.getItem("LOGIN_USER");
      if (access_token) {
        config.headers["token"] = `${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return `Issue in the middleware: ${error}`;
  }
);

const extendtoken = async () => {
  const { data } = await axiosInstance.post(
    `/auth/extend-token`,
    {},
    {
      withCredentials: true, //allow to send/receive cookies from server
    }
  );
  console.log("response data from api extend-token: ", data.data);
  localStorage.setItem("LOGIN_USER", data.data);

  return data.data;
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  }, // param function khi response API trả về 2xx
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        const data = await extendtoken();
        // gán lại token mới vào headers
        originalRequest.headers["token"] = data;
        // call lại API 1 lần nữa
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("Extend token failed", error);
      }
    }
    return Promise.reject(error)
  } // param function khi response API trả về khác 2xx
);

export const fetchFromAPI = async (url) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const getListVideo = async () => {
  const { data } = await axiosInstance.get(`/videos/getAllVideos`, options);

  return data;
};

export const getVideosType = async () => {
  const { data } = await axiosInstance.get(
    `/videos/getVideosType`,
    {
      requiredAuth: true,
    },
    options
  );

  return data;
};

export const getListVideosByID = async (typeID) => {
  const { data } = await axiosInstance.get(
    `/videos/getListVideos/${typeID}`,
    options
  );

  return data;
};

export const registerAPI = async (payload) => {
  const { data } = await axiosInstance.post(`/auth/register`, payload);

  return data;
};

export const loginAPI = async (payload) => {
  const { data } = await axiosInstance.post(`/auth/login`, payload, {
    withCredentials: true, //allow receive and send cookie from BE
  });

  return data;
};

export const loginAsyncAPI = async (payload) => {
  const { data } = await axiosInstance.post(`/auth/login-async-key`, payload, {
    withCredentials: true, //allow receive and send cookie from BE
  });
  return data;
};

export const loginFBAPI = async (newUser) => {
  const { data } = await axiosInstance.post(`/auth/login-facebook`, newUser);

  return data;
};

export const forgetPassword = async(email) => {
  const message  = await axiosInstance.post(`/auth/forgotPassword`, {email});
  return message;
}

export const changePasswordAPI = async (payload) => {
  const {data} = await axiosInstance.post(`/auth/renewPassword`, payload)
  return data
}

export const getUserAPI = async () => {
  const {data} = await axiosInstance.get(`users/get_all_user`)
  return data
}



