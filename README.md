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

1. **ErrorComponent**:
   - Renders an error message when an error occurs during the quiz.

2. **LoadingComponent**:
   - Renders a loading spinner while fetching quiz questions or performing other asynchronous tasks.

3. **NextButtonComponent**:
   - Renders a button to move to the next question in the quiz.

4. **ProgressBarComponent**:
   - Renders a progress bar to visualize the progress of the quiz.

5. **QuestionComponent**:
   - Renders a single question along with its options (answers) for the user to select.

6. **QuizComponent**:
   - Manages the state of the quiz, including fetching questions, handling user answers, and determining the quiz's completion.

7. **QuizResultComponent**:
   - Renders the result of the quiz, including the total number of correct answers and the user's selected answers compared to the correct ones.

8. **RestartButtonComponent**:
   - Renders a button to restart the quiz from the beginning.


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
    1. ErrorComponent
    2. LoadingComponent
    3. NextButtonComponent
    4. ProgressBarComponent
    5. QuestionComponent
    6. QuizComponent
    7. QuizResultComponent
    8. RestartButtonComponent

- [x] **API Data Fetching:**  
Data is fetched from an external API using Axios in the `fetchQuizQuestions` function in `Api.jsx`.

- [x] **CSS-in-JS Styling:**  
Components are styled using "css-in-js" approach with Styled Components.
    1. **LoadingComponent.jsx**: Defines a loading spinner with styles using styled-components.
    2. **NextButtonComponent.jsx**: Styles the next button with styled-components.
    3. **ProgressBarComponent.jsx**: Styles the progress bar with styled-components.
    4. **QuizArea** in **QuizComponent.jsx**: Wraps the quiz area and applies styling using styled-components.
    5. **QuizResultContainer**, **QuestionContainer**, **CorrectAnswer**, and **IncorrectAnswer** in **QuizResultComponent.jsx**: Styled components used to format the quiz result display.

- [x] **Hooks Usage:**
1. useReducer:
In the QuizProvider component within QuizContext.jsx, useReducer is used to manage the state and dispatch actions.  
2. useContext:
In the useQuizState and useQuizDispatch custom hooks within QuizContext.jsx, useContext is used to access the state and dispatch functions from the context provider. Here's how it's implemented:

## For VG (Additional Requirements for Higher Grade):
- [x] **Component Count:**
See function component section.  
Additionally, the App component in App.jsx is also a component, but it serves as the entry point of the application and does not render any UI components directly.
- [x] **Code Formatting:**
The code formatting is consistent, Prettier extension is installed in VS Code.
- [ ] **Unit Testing & Error Handling:** Your project seems to demonstrate unit testing and error handling, as evident from the presence of error components and the logic for error handling in fetching quiz questions.

