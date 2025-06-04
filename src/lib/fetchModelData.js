/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
import axios from "axios";

const fetchModel = async (url) => {
  // try {
  //   const response = await axios.get(`https://8rh2mw-3000.csb.app/api${url}`);
  //   return response.data;
  // } catch (error) {
  //   console.error("Error fetching model data from", url, error);
  //   throw error;
  // }
  try {
    const token = localStorage.getItem("authToken");
    // console.log(token);
    const response = await axios.get(`https://8rh2mw-3000.csb.app/api${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching model data from", url, error);
    throw error;
  }
};
export default fetchModel;
