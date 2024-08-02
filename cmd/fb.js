const axios = require('axios');
const fs = require('fs');
const path = require('path');

const is_url = url => /^http(s|):\/\//.test(url);

exports.config = {
  name: 'fb',
  version: '0.0.3',
  hasPermssion: 0,
  credits: '',
  description: 'Fetch media information from Facebook links',
  commandCategory: 'System',
  usages: 'fb <link>',
  cooldowns: 0
};

exports.run = async ({ args }) => {
  try {
    const url = args[0];
    if (!is_url(url)) {
      return { message: 'Invalid URL' };
    }
    if (/facebook.com/.test(url)) {
      const apiUrl = `https://z75ww9-2007.csb.app/fbdownload?url=${url}`;
      const response = await axios.get(apiUrl);
      if (response.data && response.data.data) {
        const facebookData = response.data.data;
        const videoUrl = facebookData.medias[0].url;

        // Download the video
        const videoResponse = await axios({
          method: 'get',
          url: videoUrl,
          responseType: 'stream'
        });

        const videoPath = path.join('cache', 'video.mp4');
        const writer = fs.createWriteStream(videoPath);

        videoResponse.data.pipe(writer);

        return new Promise((resolve, reject) => {
          writer.on('finish', () => {
            resolve({
              message: `Facebook Video\n- Title: ${facebookData.title}\n- Source: ${facebookData.source}\n- Video saved to ${videoPath}`,
              videoUrl: videoPath
            });
          });

          writer.on('error', reject);
        });
      } else {
        throw new Error('Failed to fetch Facebook video data');
      }
    } else {
      return { message: 'Unsupported URL. Please provide a valid Facebook video link.' };
    }
  } catch (error) {
    console.error(`Error processing command: ${error}`);
    return { message: 'An error occurred while processing your request' };
  }
};
