import axios from 'axios';

const generateSessionToken = async () => {
    try {
        const response = await axios.get('https://opentdb.com/api_token.php?command=request');
        const { token } = response.data;
        console.log('Session token:', token);
        return token;
    } catch (error) {
        console.error('Error generating session token:', error);
        throw error;
    }
};

export { generateSessionToken };