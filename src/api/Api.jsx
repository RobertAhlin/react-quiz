// api/Api.jsx

import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

// Function to fetch quiz questions
export const fetchQuizQuestions = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986`);
        return data.results; // Return only the results array
    } catch (error) {
        console.error('Error fetching quiz questions in Api:', error);
        throw error; // Optionally, you can handle errors here or in the component that calls this function
    }
};
