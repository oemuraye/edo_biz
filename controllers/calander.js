import { google } from "googleapis";

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const GOOGLE_PRIVATE_KEY= "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC27yRUMgea1EQe\nlUORkzk9DkSTXoOSfk49ZY0cwEy3f1xZkqoUXXtFZLEtuBwuksvEVwX2qpBrGehn\nP5BDo0qJngZobA7fMbPxfaN8Y2MM9upGuAHnr4QQ+zY/K2M/stQxe8Imr+UlXAiO\nYNQytNRuWGHPnMk5/znDkeWLe6PBlOpUnvb3z0DftUqzEJuE2oOMMazGGdsTHk/O\n5ePzjysIZRsgwG1ZTM18prLsbzIhvLchj6+LrOz87GM9RyCjfMclHCHaIHH+ktcG\nVMlPBVxXuLLSwM4/lcdD+QdDOBVrInrAAUkxTlfvceuWvR+0fHdf1nDCr2rq0pLL\n0fR7O+tFAgMBAAECggEAAlZlxFtQ9w9sIRLpsTLBz2VUXCi1QtoxJZOGXSjE4i8I\nWaRS3t3p7RNSDezqvpqawXMWN6vAGtToKrzocEDQ0JeFFUZU3fu8hPhaGNphQeFm\n0XQDoYz/1u1gKP2k2pkY9oU9EBxSb9WFo3dvxrJs/iL2zv29zCtWIYkGoe9jbTNf\nHTOtTTeghQuj9JTBcXFTfJk5sgK08uRe+42DA2GxzObieRpR+rj5hEkA8BLGaTdP\n7Ed0MZMaXjccI2zcn8fEYpWhljKy2CjP1KXvHwMEWrwRZltthL+UgfIZKrwCN5sH\n4akUDM0Ml5NECUvZEb6XcjP2SLMoj/RXgEOnOn1Z0QKBgQDwZraiwLCQzG149Kwo\nPip3sLtUpSqmdoAvUeN3cB/T9hpLsWik2ZmMeQyMUF/yidK+vpnUuZWu3KMfgWPJ\nJEwz8qxp9vYcYxhTcb3uNUDbqtcb1iv8fQTh/7W0T/BPTFaU20RfG/ScKLK/X/R2\nrgwshgpAhWYv2vIqjj8WYKtlsQKBgQDCzdjj02GDXVa/W/5jrPbwmK2Pniy9j8HB\nB9nSXsoAZqKIuD1XHwk14N+NryBY148iXgFAIHArJtcNnSo5XgDcQRRjcDxvLUaz\nVUdrGlY157ojesl9NHx89qIbseID8GgkJbZAgbELTBoPOtGeHnanY3FMCMYbNYHb\nYZ/2y+X/1QKBgBprDzL/fefLr1QVfz3E5yHUGCILLI6ygw+wLhEYD0dZyjX7Pwau\nqwMW4lwhEQo0PyabB4irBFn9ASgbLf4SsRUcW/ohG5avBSNWYork60W4ln8GoDrU\n+k5jrXItPrlYKEOffPn+tnjauBnzz4ejRM83w7SndD1aEDbA/wnUgcFhAoGBAKkp\n9nGJK0HXOTB9o4BNQDeYbgesdO+8OaX1ulrrw4Drn7MYQvQ32Fi4SYmRDYb40awn\nc/CK+r0OQmvpEjS1BAxAW4MqgOCOsbmjkZxZR4oSC9spknUusfgWeJmSNFH1X4oc\nUZLczLChynN1QXiMvb8IJOfBKr+QDI9EzJOVZsptAoGBAIFVO/S1m0Kb0Be/ul8d\n+lsO/LnTgpCS8cuwvVMRgeT/SrNKA+vSW3Mmh4zZYaJ7UedHlRn1ycm144Yf3XY9\n2OsaOzQ3pWHxucxvCqFk/r5wHbz3poOimM8itzyH78wsiwtoS20e65ruxMkr6zPM\nKcdsvbuFFty/IedvmAj4EnD2\n-----END PRIVATE KEY-----\n"
// const GOOGLE_PRIVATE_KEY= "866c0e943bcc11d842a11f5cb2705d2ad15e4fe7"
const GOOGLE_CLIENT_EMAIL = "calendar-key@calander-400905.iam.gserviceaccount.com"
const GOOGLE_PROJECT_NUMBER = "991767224013"
const GOOGLE_CALENDAR_ID = "8e275a0180e1c21faaf9e39ba06406c31c79a46a45707727bb26365f886331d3@group.calendar.google.com"

// Provide the required configuration
// const CREDENTIALS = process.env.CREDENTIALS;
const CREDENTIALS = {
  client_email: GOOGLE_CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY,
};
const calendarId = process.env.GOOGLE_CALENDAR_ID;

const attendeesEmails = [
  { 'email': 'oemuraye@yahoo.com' },
  { 'email': 'rutech360@gmail.com' },
  { 'email': 'kingmuraye@gmail.com' }
];

// Google calendar API settings
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
);

// const auth = new google.auth.JWT(
//     CREDENTIALS.client_email,
//     null,
//     CREDENTIALS.private_key,
//     SCOPES
// );

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+01:00';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
};

// Insert new event to Google Calendar
const insertEvent = async (event) => {

  try {
      let response = await calendar.events.insert({
          auth: auth,
          calendarId: calendarId,
          resource: event
      });
      console.log(response);
  
      if (response['status'] == 200 && response['statusText'] === 'OK') {
          return 1;
      } else {
          return 0;
      }
  } catch (error) {
      console.log(`Error at insertEvent --> ${error}`);
      return 0;
  }
};

let dateTime = dateTimeForCalander();

// Event for Google Calendar
let event = {
    'summary': `This is the summary.`,
    'description': `This is the description.`,
    'attendees': attendeesEmails,
    'start': {
        'dateTime': dateTime['start'],
        'timeZone': 'Asia/Kolkata'
    },
    'end': {
        'dateTime': dateTime['end'],
        'timeZone': 'Asia/Kolkata'
    }
};

export const calender_integration = async (req, res) => {

  try {
    insertEvent(event)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
});
  } catch (error) {
      console.log(`Error at insertEvent --> ${error}`);
      return 0;
  }
};