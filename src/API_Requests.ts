import axios from "axios";

export const request_url = "http://localhost:5000/server/internal";
export const token_name = "token-yfjxhfdsjkjhdshkfdsfdsfd231ffds632f1sd65";

export const LogIn = async (username: string, password: string) => {
    try {
       const response = await axios.post(request_url + "/login", { username, password });
       localStorage.setItem(token_name, response.data.token);
    } catch (e) {
        throw new Error("error")
    }    
}

export const VerifyToken = async () => {
    try {
        const token = localStorage.getItem(token_name);
        const response = await axios.get(request_url + "/api", { headers: { Authorization: `Bearer ${token}` } });
        return response.data ? true : false; 
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const CreateAccount = async (username: string, password: string) => {
    try {
        const response = await axios.post(request_url + "/create_account", { username, password });
        localStorage.setItem(token_name, response.data.token);
    } catch (e) {
        throw new Error("error")
    }
}

export const GetSandwiches = async () => {
    try {
        const token = localStorage.getItem(token_name);
        const response = await axios.get(request_url + "/get_sandwiches", { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (e) {
        throw new Error("error")
    }
}

export const CreateSandwich = async (id: number, name: string, description: string, price: number, image: File) => {
    try {
        const Valid_Image = new FormData();
        Valid_Image.append(image.name, image);
        const token = localStorage.getItem(token_name);
        const response = await axios.post(request_url + "/create_sandwich", { id, name, description, price, Valid_Image }, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
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
