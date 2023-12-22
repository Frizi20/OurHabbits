import axios from 'axios';

export async function getUsersLastConversations() {
    try {
        const res = await axios.get('/users/conversations');
        const { data } = res;
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}

export async function getUserFriends() {
    try {
        const res = await axios.get('/users/friends');
        const { data } = res;

        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}
