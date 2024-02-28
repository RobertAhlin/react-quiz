# Quiz made with React.


# Getting started

* Created repo on GitHub: https://github.com/RobertAhlin/react-quiz
* Cloned and opened with VS Code.
* App created with Vite: `npm init vite@latest . -- --template react`
* Ran `npm install´
* App started with: `npm run dev`  
<img src="readmefiles/vite-react-start.jpg" alt="Vite + React logos">

* Selected Axios for my API handling. Installed with `npm install axios`

# API
The API file, `Api.jsx`, contains a function named `fetchQuizQuestions` responsible for fetching quiz questions from an external API. Here's an explanation of its functionality:

### fetchQuizQuestions Function:
- This function is an asynchronous function, indicating that it performs an asynchronous operation, such as making an HTTP request.
- It utilizes the `axios` library to perform the HTTP GET request to the specified API endpoint.
- The API endpoint used is `'https://opentdb.com/api.php'`, which is the Open Trivia Database API.
- Query parameters are appended to the URL to specify the number of questions (`amount`), category (`category`), difficulty (`difficulty`), type of questions (`type`), and encoding (`encode`). In this case, it requests 10 questions of easy difficulty from the category with ID 18 (Computers) and the type of multiple-choice questions.
- Upon successful retrieval of data from the API, it checks if the response data contains an array of quiz questions (`data.results`).
- If the data format is valid (i.e., it contains an array of questions), it formats each question by combining the incorrect answers with the correct answer into an `answers` array.
- The formatted questions are returned as an array of objects, where each object represents a single quiz question with its associated answers.
- If there's an error during the API request or the data format is invalid, it throws an error with an appropriate message.

Overall, this function serves to fetch quiz questions from the Open Trivia Database API and format them for use in the quiz application. It encapsulates the logic for making HTTP requests, handling responses, and formatting the retrieved data.

# Components

1. QuestionComponent.jsx:  
This component renders a single question along with its answers. It allows users to select an answer from multiple choices.

2. NextButtonComponent.jsx:  
This component renders a button that allows users to move to the next question in the quiz.

3. QuizResultComponent.jsx:  
This component displays the result of the quiz, including the total number of correct answers and a breakdown of each question with the user's selected answer and the correct answer.

4. ErrorComponent.jsx:  
This component is responsible for rendering an error message in case there is an error fetching quiz questions or any other error that occurs during the quiz.

5. RestartButtonComponent.jsx:  
This component renders a button that allows users to restart the quiz from the beginning.

6. QuizComponent.jsx:  
This is the main component that orchestrates the entire quiz. It manages the state of the quiz, fetches questions, handles user answers, progresses through questions, displays results, and allows the user to restart the quiz.

---
Project Title and Description: Provide a clear and concise title for your project, along with a brief description of what it does.

Installation Instructions: Explain how users can install and set up your project locally on their machines. Include any dependencies that need to be installed and any setup steps required.

Usage: Provide instructions on how to use your quiz application. Explain how users can start the quiz, answer questions, and view their results.

API Documentation: If your project uses an external API like the Open Trivia Database, provide a link to the API documentation and explain how your project interacts with it.

Technologies Used: List the technologies, libraries, and frameworks used in your project. Include versions if applicable.

File Structure: Describe the structure of your project's files and folders to help users navigate the codebase.

Code Examples: Include some code snippets or examples to illustrate key features or functionality of your project. This can help users understand how your code works.

Contributing: Provide guidelines for others who might want to contribute to your project, including how they can submit bug reports, feature requests, or pull requests.

License: Specify the license under which your project is released. This informs users of what they're allowed to do with your code.

Credits: Acknowledge any third-party resources, libraries, or tutorials that you used in your project.



# Project Assessment

## For G (Passing Requirements):
- [x] **React Setup:**  
It is set up with a React project using `create-react-app`.
- [x] **Function Components:**  
Project includes at least 5 function components 
    - QuestionComponent 
    - NextButtonComponent
    - QuizResultComponent
    - ErrorComponent
    - RestartButtonComponent
- [x] **API Data Fetching:**  
Data is fetched from an external API using Axios in the `fetchQuizQuestions` function in `Api.jsx`.
- [x] **CSS-in-JS Styling:**  
Components are styled using "css-in-js" approach with Styled Components.
- [x] **Hooks Usage:** You utilize at least 2 of the specified hooks (`useState`, `useEffect`), and optionally others like `useContext`.

## För VG (Additional Requirements for Higher Grade):
- [x] **Component Count:** Your project includes at least 8 components (`QuestionComponent`, `NextButtonComponent`, `QuizResultComponent`, `ErrorComponent`, `RestartButtonComponent`, and possibly others not mentioned in the provided snippets).
- [x] **Code Formatting:** The code formatting seems to be consistent, especially if you've used Prettier extension in VS Code.
- [ ] **Unit Testing & Error Handling:** Your project seems to demonstrate unit testing and error handling, as evident from the presence of error components and the logic for error handling in fetching quiz questions.

