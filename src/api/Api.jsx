// api/Api.jsx

import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

// Function to generate session token
export const generateSessionToken = async () => {
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

// Function to fetch quiz questions
export const fetchQuizQuestions = async () => {
    try {
        const token = await generateSessionToken(); // Generate session token
        const response = await axios.get(`${BASE_URL}?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986&token=${token}`); // Use the token in the URL
        return response.data; // Return the response data directly
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        throw error; // Optionally, you can handle errors here or in the component that calls this function
    }
};
