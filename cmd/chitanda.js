const axios = require('axios');

const API = 'https://z75ww9-2007.csb.app/images/chitanda';

module.exports = {
  config: {
    name: '6mui',
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
      const imageUrl = response.data.url;

      return {
        message: 'Ảnh chitanda của bạn đây 🫣',
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