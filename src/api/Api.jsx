// Api.jsx

import axios from 'axios';

// Function to fetch questions from API
export const fetchQuizQuestions = async () => {
  try {
    // Fetch questions from API
    const BASE_URL = 'https://opentdb.com/api.php';
    const { data } = await axios.get(`${BASE_URL}?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986`);
    if (Array.isArray(data.results)) {
      // Shuffle and format questions
      const shuffledQuestions = data.results.map(question => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
      }));
      return shuffledQuestions;
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    throw new Error('Error fetching quiz questions');
  }
};

// Function to shuffle array
const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
