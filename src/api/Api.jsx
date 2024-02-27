import axios from 'axios';
import { generateSessionToken } from './TriviaApi'; // Import the function to generate session token

const BASE_URL = 'https://opentdb.com/api.php';

export const fetchQuizQuestions = async () => {
    try {
        const token = await generateSessionToken(); // Generate session token
        const response = await axios.get(`${BASE_URL}?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986&token=${token}`); // Use the token in the URL
        return response.data; // Assuming the response contains an array of quiz questions
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        throw error; // Optionally, you can handle errors here or in the component that calls this function
    }
};