const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
// const {TOKEN_PATH} = require('../../token.json')

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
const getGoogleCal = async () => {

  console.log('in googleCal')
  return new Promise((resolve, reject) =>
    fs.readFile('credentials.json', (err, content) => {
      if (err) reject(err)
      // return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      console.log('cred callback')
      const answer = authorize(JSON.parse(content), listEvents);
      resolve(answer)
    })
  );
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  console.log('in authorize')
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  
  // let answer;
  // Check if we have previously stored a token.
  return new Promise((resolve, reject) =>
    fs.readFile("token.json", (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      const ev = callback(oAuth2Client);
      resolve(ev)
    // console.log(answer)
  }));
  // return answer
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  console.log('In getAccessToken')
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  // TASK: authorize the url, need to send the link to the front end for user to approve
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile('token.json', JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      console.log('getAccess')
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
  console.log('inEventList')
  const calendar = google.calendar({ version: 'v3', auth}); 
  console.log({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  })
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
    // , (err, res) => {
    
      // if (err) return console.log('The API returned an error: ' + err);
  const events = res.data.items;
  if (events.length) {
    console.log('Upcoming 10 events:');
    events.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.summary}`);
    });
  } else {
    console.log('No upcoming events found.');
  };
  const calEvents = events.map((event) => {
    return {
      summary: event.summary,
      startTime: event.start.dateTime,
      endTime: event.end.dateTime,
    }
  })
  return calEvents;
}

module.exports = { getGoogleCal };
