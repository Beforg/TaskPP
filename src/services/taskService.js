import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/tasks";

export const create = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/create`, task);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const countTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/get/count`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}