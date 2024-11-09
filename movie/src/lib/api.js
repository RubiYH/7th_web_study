import axios from "axios";

export const axiosMovieInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_TOKEN}`,
  },
});

export const axiosBackendInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosBackendInstance.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosBackendInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    if (status === 401 && !config.retried) {
      config.retried = true;

      const refreshToken = window.localStorage.getItem("refreshToken");

      try {
        const response = await axios.post("http://localhost:3000/auth/token/access", undefined, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        window.localStorage.setItem("accessToken", response.data?.accessToken);
        window.localStorage.setItem("refreshToken", response.data?.refreshToken);

        config.headers.Authorization = `Bearer ${response.data?.accessToken}`;

        return axiosBackendInstance(config);
      } catch (refreshErr) {
        alert(refreshErr);
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");

        window.location.replace("/login");

        return Promise.reject(refreshErr);
      }
    } else {
      return Promise.reject(err);
    }
  }
);
