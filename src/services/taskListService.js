import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/lists";

export const createList = async (taskList) => {
    try {
        const response = await axios.post(`${API_URL}/create`, taskList);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
} 

export const getAllTaskList = async () => {
    try {
        const response = await axios.get(`${API_URL}/get/all`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}