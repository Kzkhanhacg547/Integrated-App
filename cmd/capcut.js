const axios = require('axios');

const is_url = url => /^http(s|):\/\//.test(url);

exports.config = {
  name: 'capcut',
  version: '0.0.1',
  hasPermssion: 0,
  credits: '',
  description: 'Fetch video information from CapCut links',
  commandCategory: 'System',
  usages: 'capcut <link>',
  cooldowns: 0
};

exports.run = async ({ args }) => {
  try {
    const url = args[0];
    if (!is_url(url)) {
      return { message: 'Invalid URL' };
    }
    if (/capcut/.test(url)) {
      const apiUrl = `https://h6yq7n-2007.csb.app/capcut?link=${url}`;
      const response = await axios.get(apiUrl);
      if (response.data && response.data.downloadUrl) {
        const capcutData = response.data;
        const downloadUrl = capcutData.downloadUrl;

        return {
          message: `CapCut Video<br>- Title: ${capcutData.capcutInfo.title}<br>- Usage: ${capcutData.capcutInfo.usage}<br>- Download URL: <a href="${downloadUrl}">${downloadUrl}</a>`
        };
      } else {
        throw new Error('Failed to fetch CapCut video data');
      }
    } else {
      return { message: 'Unsupported URL. Please provide a valid CapCut video link.' };
    }
  } catch (error) {
    console.error(`Error processing command: ${error}`);
    return { message: 'An error occurred while processing your request' };
  }
};
