import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CryptoJS from "crypto-js";

export const request_auth_url = "http://localhost:4528/auth";

export const token_refresh_name = '76c555d2dffd72d19e7eea4a3d37d312d138981bb2e8e947dc3ab04b4c0cc6ad80e2232d25ad790d971845946040f1f810fb65ff687ddad9726b833e7780b6d0';

export const LogIn = async (name: string, password: string) => {
    try {
       const response = await axios.post(request_auth_url + "/login", { name, password });
       const encrypted_refresh_token = CryptoJS.AES.encrypt(response.data.REFRESH_TOKEN, import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY).toString();
       localStorage.setItem(token_refresh_name, encrypted_refresh_token);
       return;
    } catch (e) {
        console.log(e);
        throw new Error("error")
    }    
}

export const LogOut = async () => {
    try {
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        await axios.post(request_auth_url + "/logout/" , { token: refresh_token } );
        
        localStorage.removeItem(token_refresh_name);
        return;
    } catch (e) { 
        throw new Error("error")
    }
}


export const CreateAccount = async (name: string, password: string) => {
    try {
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const access_token = await axios.post(request_auth_url + "/token/", { token: refresh_token })
        
        const { data } = await axios.post(request_auth_url + "/api/create_account", { name, password }, { headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}`}})
        return data;
    } catch (e) {
        throw new Error("error")
    }
}



export const GetSandwiches = async () => {
    try {
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const access_token = await axios.post(request_auth_url + "/token/", { token: refresh_token })
        const { data } = await axios.get(request_auth_url + "/api/sandwiches" , { headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` }})
        return data;
    } catch (e) {
        throw new Error("error")
    }
}

export const CreateSandwich = async (name: string, description: string, price: string, imageFile: File) => {
    try {
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const access_token = await axios.post(request_auth_url + "/token/", { token: refresh_token });

        const formData = new FormData();
        formData.append("image", imageFile);

        const imagePromise = axios.post(request_auth_url + "/api/image", formData, { headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` } })
        const sandwichPromise = axios.post(request_auth_url + "/api/",  { 
            name: name,
            description: description,
            price: price,
            image: imageFile.name
        }, { headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` } })
        const [, sandwich] = await Promise.all([imagePromise, sandwichPromise]);
        return sandwich.data;
    } catch (e) {
        console.log(e)
        throw new Error("error")
    }
}

export const UpdateSandwich = async (id: string, oldImageName: string, name: string, description: string, price: string, isImage: boolean, image: File) => {
    try {
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const access_token = await axios.post(request_auth_url + "/token/", { token: refresh_token });

        if (!isImage) {
            const sandwich = await axios.put(request_auth_url + "/api/no-image/" + id, {
                name: name,
                description: description,
                price: price,
                oldImage: oldImageName
            }, { headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` } });
            return sandwich.data;
        }
        const formData = new FormData();
        formData.append("image", image);
        
        const imagePromise = axios.put(request_auth_url + "/api/image", formData, { headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` } })
        const sandwichPromise = await axios.put(request_auth_url + "/api/" + id, { 
            name: name,
            description: description,
            price: price,
            image: image.name,
            oldImage: oldImageName
        }, { headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` } });
        
        const [, sandwich] = await Promise.all([imagePromise, sandwichPromise]);

        return sandwich.data;
    } catch (e) {
        throw new Error("error")
    }
}

export const DeleteSandwich = async (id: string) => {
    try {
        const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem(token_refresh_name), import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const access_token = await axios.post(request_auth_url + "/token/", { token: refresh_token });

        const { data } = await axios.delete(request_auth_url + "/api/sandwich/" + id, { headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` } });
        return data;
    } catch (e) {
        throw new Error("error")
    }
}
