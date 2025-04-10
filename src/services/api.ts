import { API_URL } from '@env';

export const loginUser = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
    return await res.json();
};

export const registerUser = async (data: {
    name: string,
    email: string,
    phoneNumber: string,
    password: string
}) => {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
};