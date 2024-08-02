const axios = require('axios');

const API = 'https://j8c2z9-2007.csb.app/anime';

module.exports = {
  config: {
    name: 'wibu',
    version: '1.0.0',
    hasPermssion: 0,
    credits: 'Kz Khánhh, Tiny',
    description: 'Hiển thị ảnh anime ngẫu nhiên',
    commandCategory: 'Hình ảnh',
    usages: 'anime',
    cooldowns: 5
  },

  run: async ({ args }) => {
    try {
      const response = await axios.get(API);
      const imageUrl = response.data.data;

      return {
        message: 'Đây là một anime ngẫu nhiên cho wibu nè 😊',
        mediaUrl: imageUrl
      };
    } catch (error) {
      console.error("Error fetching image URL: ", error);
      return {
        message: "Có lỗi xảy ra khi lấy hình ảnh. Vui lòng thử lại sau.",
        error: error.message
      };
    }
  }
};