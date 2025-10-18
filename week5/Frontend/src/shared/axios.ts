import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.example.com/public",
    headers: {
        "Content-Type": "application/json",
    },
});

