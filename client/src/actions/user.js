import axios from "axios";
import { API_URL } from "../config";
import { setUser } from "../reducers/userReducer";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/registration",
            {
                email,
                password,
            }
        );
        return response;
    } catch (e) {
        console.log(e.registration.data.message);
    }
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            });
            console.log(response.data);
            dispatch(setUser(response.data.user));
            localStorage.token = response.data.token;
        } catch (e) {
            console.log(e);
        }
    };
};

export const auth = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/auth`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data);
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token);
        } catch (e) {
            console.log(e);
            localStorage.removeItem("token");
        }
    };
};

export const uploadAvatar = (file) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(
                `${API_URL}/api/files/avatarUpload`,                
                formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(setUser(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const deleteAvatar = () => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(
                `${API_URL}/api/files/avatarDelete`
            );
            dispatch(setUser(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};
