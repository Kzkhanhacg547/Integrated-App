const axios = require('axios');
const fs = require('fs');
const path = require('path');

const is_url = url => /^http(s)?:\/\//.test(url);

exports.config = {
  name: 'tiktok',
  version: '0.0.5',
  hasPermssion: 0,
  credits: '',
  description: 'Fetch media information from TikTok links',
  commandCategory: 'System',
  usages: 'tiktok <link>',
  cooldowns: 0
};

const downloadMedia = async (url, filename) => {
  const response = await axios({
    method: 'get',
    url: url,
    responseType: 'stream'
  });

  const filePath = path.join(__dirname, '..', 'cache', filename);
  const writer = fs.createWriteStream(filePath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(filePath));
    writer.on('error', reject);
  });
};

exports.run = async ({ args }) => {
  try {
    const url = args[0];
    if (!is_url(url)) {
      return {
        message: 'Invalid URL',
        attachments: []
      };
    }
    if (/tiktok.com/.test(url)) {
      const apiUrl = `https://www.tikwm.com/api/?url=${url}`;
      const response = await axios.get(apiUrl);
      if (response.data.code !== 0) {
        throw new Error('Failed to fetch TikTok data');
      }

      const tiktokData = response.data.data;
      const attachments = [];

      if (tiktokData.images && tiktokData.images.length > 0) {
        // Handle image slideshow
        for (let i = 0; i < tiktokData.images.length; i++) {
          const imagePath = await downloadMedia(tiktokData.images[i], `tiktok_image_${i + 1}.jpg`);
          attachments.push(fs.createReadStream(imagePath));
        }
      } else {
        // Handle video
        const videoPath = await downloadMedia(tiktokData.play, 'tiktok_video.mp4');
        attachments.push(fs.createReadStream(videoPath));
      }

      const message = `TikTok Media\n- Title: ${tiktokData.title}\n- Author: ${tiktokData.author.nickname}\n- Likes: ${tiktokData.digg_count}\n- Comments: ${tiktokData.comment_count}\n- Shares: ${tiktokData.share_count}`;

      return {
        message: message,
        attachments: attachments
      };
    } else {
      return {
        message: 'Unsupported URL. Please provide a valid TikTok link.',
        attachments: []
      };
    }
  } catch (error) {
    console.error(`Error processing command: ${error}`);
    return {
      message: 'An error occurred while processing your request',
      attachments: []
    };
  }
};
