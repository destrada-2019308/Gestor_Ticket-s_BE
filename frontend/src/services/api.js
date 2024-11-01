import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://172.16.1.54:2656",
    timeout: 2000,
});

apiClient.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = token
        return config;
    },
    err => Promise.reject(err)
);

export const loginRequest = async (params) => {
    try {
        return await apiClient.post("/user/login", params)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

/* CRUD DE USUARIOS */
export const addUserRequest = async (params) => {
    try {
        return await apiClient.post("/user/addUser", params)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const getUsersRequest = async () => {
    try {
        return await apiClient.get("/user/getUsers")
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const updateUserRequest = async (params, id) => {
    try {
        return await apiClient.put(`/user/updateUser/${id}`, params)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const deleteUserRequest = async (id) => {
    try {
        return await apiClient.delete(`/user/deleteUser/${id}`)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

// CRUD DE GERENCIAS

export const getManagementsRequest = async () => {
    try {
        return await apiClient.get("/managements/getManagements")
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const addManagementRequest = async (params) => {
    try {
        return await apiClient.post("/managements/addManagements", params)
    } catch (error) {
        console.error(error);
        return { error: true, error }   
    }
}

export const updateManagementRequest = async (params, id) => {
    try {
        return await apiClient.put(`/managements/updateManagements/${id}`, params)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const deleteManagementRequest = async (id) => {
    try {
        return await apiClient.delete(`/managements/deleteManagements/${id}`)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

/* CRUD DE CONTROL DE TICKETS */
export const addControlRequest = async (params) => {
    try {
        return await apiClient.post("/control/addControl", params)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const calcularControlRequest = async (params) => {
    try {
        return await apiClient.post("/control/calcularControl", params)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const getControlRequest = async (params) => {
    try {
        return await apiClient.get( `/control/getControl/${params}`)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const getAllControlRequest = async () => {
    try {
        return await apiClient.get("/control/getAllControl")
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const findByRoleRequest = async (params) => {
    try { 
        return await apiClient.post("/control/findByRole", params)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

/* CRUD DE INVENTARIOS */

export const addInventoryRequest = async (params) => {
    try {
        return await apiClient.post("/inventary/createInventory", params)
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const getInventoyRequest = async () => {
    try {
        return await apiClient.get("/inventary/getInventory")
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}


export const downloadExcelRequest = async () => {
    try {
        return await apiClient.get("/control/downloadExcel", {responseType: 'blob'})
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}

export const findByNameRequest = async (params) => {
    try { 
        return await apiClient.post(`/control/findByName/${params}` )
    } catch (error) {
        console.error(error);
        return { error: true, error }
    }
}