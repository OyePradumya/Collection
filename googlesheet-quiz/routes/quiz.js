const express = require('express');
const router = express.Router();
const { auth } = require('google-auth-library');
const { google } = require("googleapis");
const Data = require('../models/Data');
const fs = require('fs');

// Get quiz data from google sheet and and add it database : GET 'api/quiz/updatequiz'.
router.get('/updatequiz', async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        const client = await auth.getClient();

        const googleSheets = google.sheets({ version: "v4", auth: client });

        const spreadsheetId = "1Mjz9tF5Sz2Q3TRvdzloSlDVJNqNgkjSCKwla6QF_7Ps";

        const metaData = await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId,
        });

        // Read rows from spreadsheet
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "MCQ",
        });

        let data = await Data.updateOne({}, {
            values : getRows.data.values
        });

        res.send(data);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
});

// Get quiz data from database : GET 'api/quiz/getquiz'.
router.get('/getquiz', async (req, res) => {
    try {
        let data = await Data.find({});
        fs.writeFile('../src/QuizData.json', JSON.stringify(data), (err)=>{
            if(err){
                console.log(`${err.message}`);
            }
            else{
                console.log("Update successful!")
            }
        });
        res.send(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
});

module.exports = router
