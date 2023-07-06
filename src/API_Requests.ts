import axios from "axios";
var CryptoJS = require("crypto-js");

import dotenv from "dotenv";
dotenv.config();

export const request_data_url = "http://localhost:5000/server/sandwiches";
export const request_auth_url = "http://localhost:5000/auth";

export const token_refresh_name = '76c555d2dffd72d19e7eea4a3d37d312d138981bb2e8e947dc3ab04b4c0cc6ad80e2232d25ad790d971845946040f1f810fb65ff687ddad9726b833e7780b6d0';

export const LogIn = async (username: string, password: string) => {
    try {
       const response = await axios.post(request_auth_url + "/login", { username, password });

       const encrypted_refresh_token = CryptoJS.AES.encrypt(response.data.REFRESH_TOKEN, process.env.REFRESH_SECRET).toString();

       localStorage.setItem(token_refresh_name, encrypted_refresh_token);

    } catch (e) {
        throw new Error("error")
    }    
}

export const LogOut = async () => {
    try {
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), process.env.REFRESH_SECRET).toString(CryptoJS.enc.Utf8);
        axios.post(request_auth_url + "/token/", { token: refresh_token })
            .then((response) => {
                axios.post(request_auth_url + "/logout/" , { token: refresh_token }, { headers: { Authorization: `Bearer ${response.data.ACCESS_TOKEN}` } });
                localStorage.removeItem(token_refresh_name);
            });
    } catch (e) { 
        throw new Error("error")
    }
}


export const CreateAccount = async (name: string, password: string) => {
    try {
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), process.env.REFRESH_SECRET).toString(CryptoJS.enc.Utf8);
        axios.post(request_auth_url + "/token/", { token: refresh_token })
            .then((response) => {
                axios.post(request_auth_url + "/api/create_account", { name, password }, { headers: { Authorization: `Bearer ${response.data.ACCESS_TOKEN}`}})
                    .then((response) => {
                        return response.data;
                    });
            });
    } catch (e) {
        throw new Error("error")
    }
}

export const GetSandwiches = async () => {
    try {
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), process.env.REFRESH_SECRET).toString(CryptoJS.enc.Utf8);
        axios.post(request_auth_url + "/token/", { token: refresh_token })
            .then((response) => {
                axios.get(request_auth_url + "/api/sandwiches" , { headers: { Authorization: `Bearer ${response.data.ACCESS_TOKEN}` }})
                    .then((response) => {
                        return response.data;
                    });
            });
    } catch (e) {
        throw new Error("error")
    }
}

export const CreateSandwich = async (id: number, name: string, description: string, price: number, image: File) => {
    try {
        const Valid_Image = new FormData();
        Valid_Image.append(image.name, image);
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), process.env.REFRESH_SECRET).toString(CryptoJS.enc.Utf8);
        axios.post(request_auth_url + "/token/", { token: refresh_token })
            .then((response) => {
                axios.post(request_auth_url + "/api/", { id, name, description, price, Valid_Image }, { headers: { Authorization: `Bearer ${response.data.ACCESS_TOKEN}` } })
                    .then((response) => {
                        return response.data;
                    });
            });
    } catch (e) {
        throw new Error("error")
    }
}

export const UpdateSandwich = async (id: number, name: string, description: string, price: number, image: File) => {
    try {
        const Valid_Image = new FormData();
        Valid_Image.append(image.name, image);
        const token = localStorage.getItem(token_name);
        const response = await axios.put(request_url + "/update_sandwich", { id, name, description, price, Valid_Image }, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (e) {
        throw new Error("error")
    }
}
