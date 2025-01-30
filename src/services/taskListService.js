import axios from "axios";
import { toast } from 'react-toastify';

const API_URL = "http://localhost:8080/api/v1/lists";

export const createList = async (taskList) => {
    try {
        const response = await axios.post(`${API_URL}/create`, taskList);
        toast.success('Lista criada com sucesso!');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
} 

export const deleteList = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        toast.success('Lista deletada com sucesso!');
        return response.data;
    } catch (error) {
        toast.error('Erro ao deletar lista: ' + error.message);
        console.error(error);
        throw error;
    }
}

export const updateList = async (taskList, id) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, taskList);
        toast.success('Lista atualizada com sucesso!');
        return response.data;
    } catch (error) {
        toast.error('Erro ao atualizar lista!');
        console.error(error);
        throw error;
    }
}

export const getAllTaskList = async () => {
    try {
        const response = await axios.get(`${API_URL}/get/all`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTaskList = async (page) => {
    try {
        const response = await axios.get(`${API_URL}/get?page=${page.toString()}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}