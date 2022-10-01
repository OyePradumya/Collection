# GoogleSheetQuiz

A quiz app built using React.js for the frontend and connected the node backend to a Google Sheets to dynamically fetch all the data.

### Screenshots

![2022-06-01_18-19](https://user-images.githubusercontent.com/47355538/178737313-ff179d14-f47f-4844-8ded-8ef251564450.png)
![2022-06-01_18-20](https://user-images.githubusercontent.com/47355538/178737844-a6e63fb0-1524-4f0c-9df7-1f2d6884f0d0.png)
![2022-06-01_18-20_1](https://user-images.githubusercontent.com/47355538/178737889-995f977c-6e5f-4ac6-900e-1d8fce48dd49.png)

## Deployed app

```sh
https://googlesheet-quiz.herokuapp.com/
```

## Features

- Fully functional flow of quiz and anyone can take the quiz and check their score and answers as well at the end.
- Backend connected to a Google Sheets to dynamically fetch all the data and pass it to the database as JSON.
- Fetches the questions data from the database along with their answers and display any 10 random from those.

## Frameworks used

- React.js
- Node.js
- Express
- Tailwind CSS
- Material UI 
- MongoDB as the database

## Installation 

- Fork the repository and clone it.
- Node.js should be installed on the system.
- Add a `credentials.json` file in the backend folder containing the Google API credentials and MongoDB URI.
- After cloning the repository run command `npm install`.
- Start the app using `npm start` command.

