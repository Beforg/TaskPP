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

export const updateTask = async (task, id) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, task);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deactivateTask = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/deactivate/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getNext = async (page) => {
    try {
        const response = await axios.get(`${API_URL}/get/next?page=${page.toString()}`);
        const {content, totalPages, totalElements} = response.data;
        return {content, totalPages, totalElements};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getLateTasks = async (page) => {
    try {
        const response = await axios.get(`${API_URL}/get/late?page=${page.toString()}`);
        const {content, totalPages, totalElements} = response.data;
        return {content, totalPages, totalElements};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getDeactivatedTasks = async (page) => {
    try {
        const response = await axios.get(`${API_URL}/get/deactivated?page=${page.toString()}`);
        const {content, totalPages, totalElements} = response.data;
        return {content, totalPages, totalElements};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTaskByDay = async (day, page) => {
    try {
        const response = await axios.get(`${API_URL}/get/${day}?page=${page.toString()}`);
        const {content, totalPages, totalElements} = response.data;
        return {content, totalPages, totalElements};
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