import axios from "axios";
import { toast } from 'react-toastify';

const API_URL = "http://localhost:8080/api/v1/tasks";

export const create = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/create`, task);
        toast.success('Tarefa criada com sucesso!');
        return response.data;
    } catch (error) {
        toast.error('Erro ao criar tarefa: ' + error.message);
        console.error(error);
        throw error;
    }
}

export const updateTask = async (task, id) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, task);
        toast.success('Tarefa editada com sucesso!');
        return response.data;
    } catch (error) {
        toast.error('Erro ao editar tarefa: ' + error.message);
        console.error(error);
        throw error;
    }
}

export const updateTaskStatus = async(id) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}/status`);
        toast.success('Tarefa atualizada com sucesso!');
        return response.data;
    } catch (error) {
        toast.error('Erro ao tentar atualizar a tarefa: ' + error.message);
        console.error(error);
        throw error;
    }
}

export const deactivateTask = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/deactivate/${id}`);
        toast.success('Tarefa movida para lixeira com sucesso!');
        return response.data;
    } catch (error) {
        toast.error('Erro ao mover tarefa para lixeira: ' + error.message);
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

export const getTaskByListId = async (listId, page) => {
    try {
        const response = await axios.get(`${API_URL}/get/list/${listId}?page=${page.toString()}`);
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

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        toast.success('Tarefa deletada com sucesso!');
        return response.data;
    } catch (error) {
        toast.error('Erro ao deletar tarefa: ' + error.message);
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