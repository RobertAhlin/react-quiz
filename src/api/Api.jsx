// Api.jpx

import axios from 'axios';

// Function to fetch questions from API
export const fetchQuizQuestions = async () => {
  try {
    // Fetch questions from API
    const BASE_URL = 'https://opentdb.com/api.php';
    const { data } = await axios.get(`${BASE_URL}?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986`);
    if (Array.isArray(data.results)) {
      // Format questions
      return data.results.map(question => ({
        ...question,
        answers: [...question.incorrect_answers, question.correct_answer]
      }));
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    throw new Error('Error fetching quiz questions');
  }
};
