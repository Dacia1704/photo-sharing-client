/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
import axios from "axios";

const fetchModel = async (url) => {
    try {
        const response = await axios.get(`http://localhost:3000${url}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching model data from", url, error);
        throw error;
    }
};
export default fetchModel;
