import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const cachedData = localStorage.getItem('cachedQuestions');
        if (cachedData) {
          setQuestions(JSON.parse(cachedData));
          setSelectedAnswers(Array(JSON.parse(cachedData).length).fill(''));
        } else {
          const BASE_URL = 'https://opentdb.com/api.php';
          const { data } = await axios.get(`${BASE_URL}?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986`);
          if (Array.isArray(data.results)) {
            const shuffledQuestions = data.results.map(question => ({
              ...question,
              answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
            }));
            setQuestions(shuffledQuestions);
            setSelectedAnswers(Array(shuffledQuestions.length).fill(''));
            localStorage.setItem('cachedQuestions', JSON.stringify(shuffledQuestions));
          } else {
            setError('Invalid data format');
          }
        }
      } catch (error) {
        setError('Error fetching quiz questions');
      }
    };

    fetchQuizQuestions();
  }, []);

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const decodeString = (str) => {
    return decodeURIComponent(str);
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = selectedAnswer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateCorrectAnswers();
    }
  };

  const calculateCorrectAnswers = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (question.correct_answer === selectedAnswers[index]) {
        correctCount++;
      }
    });
    setCorrectAnswers(correctCount);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <div>
          <p>
            <strong>Question {currentQuestionIndex + 1}: </strong> {decodeString(questions[currentQuestionIndex].question)}
          </p>
          <form>
            {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <input 
                  type="radio" 
                  id={`answer-${answerIndex}`} 
                  name={`answer-${currentQuestionIndex}`} 
                  value={answer} 
                  checked={selectedAnswers[currentQuestionIndex] === answer}
                  onChange={() => handleAnswerSelect(answer)}
                />
                <label htmlFor={`answer-${answerIndex}`}>{decodeString(answer)}</label>
              </div>
            ))}
          </form>
          <button onClick={moveToNextQuestion}>Next Question</button>
        </div>
      )}
      {correctAnswers !== null && (
        <div>
          <h2>Quiz Result</h2>
          <p>Total Correct Answers: {correctAnswers}</p>
          <h3>Answers:</h3>
          {questions.map((question, index) => (
            <div key={index}>
              <p>
                <strong>Question {index + 1}: </strong> {decodeString(question.question)}
              </p>
              <ul>
                {question.answers.map((answer, answerIndex) => (
                  <li key={answerIndex} style={{ color: answer === question.correct_answer ? 'green' : selectedAnswers[index] === answer ? 'red' : 'inherit' }}>
                    {decodeString(answer)}
                  </li>
                ))}
              </ul>
              <p>Correct Answer: <span style={{ color: 'green' }}>{decodeString(question.correct_answer)}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
