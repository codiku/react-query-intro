import axios from "axios";

export const AuthAPI = {
  async login() {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      console.log(response.data.results[0]);
      return response.data.results[0];
    } catch (error) {
      throw Error("Error logging in");
    }
  },
};
