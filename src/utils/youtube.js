const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const youtube = google.youtube('v3');

const channels = [
  'UCF_n4-_H6XtIcTPhrSGw5aQ',
  'UCZdd9900tZCpAPvn7VzYMYA',
  'UCgtgWePMzmmZEzCHhXr3dDA',
];

const clientId = process.env.OAUTH2_CLIENT_ID;
const clientSecret = process.env.OAUTH2_CLIENT_SECRET;
const refreshToken = process.env.OAUTH2_REFRESH_TOKEN;
const redirectUri = process.env.OAUTH2_REDIRECT_URI;

const oauth2Client = new OAuth2(clientId, clientSecret, redirectUri);

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

const getYoutubeChannels = async () => {
  const channelResults = await Promise.all(
    channels.map((channel) =>
      youtube.channels.list({
        auth: oauth2Client,
        part: ['snippet', 'contentDetails'],
        id: [channel],
      })
    )
  );
  return channelResults.map((result) => result.data);
};

module.exports = {
  getYoutubeChannels,
};
