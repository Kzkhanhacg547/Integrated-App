const axios = require('axios');

const API = 'https://z75ww9-2007.csb.app/loli'; // Thay bằng URL API video

module.exports = {
    config: {
        name: 'loli',
        version: '1.0.0',
        hasPermssion: 0,
        credits: 'Kz Khánhh, Tiny',
        description: 'Hiển thị video ngẫu nhiên',
        commandCategory: 'Video',
        usages: 'video',
        cooldowns: 5
    },

    run: async ({ args }) => {
        try {
            const response = await axios.get(API);
            const videoUrl = response.data.data;

            return {
                message: 'Ảnh mấy bé loli dễ thương nè ! 😊',
                mediaUrl: videoUrl
            };
        } catch (error) {
            console.error("Error fetching video URL: ", error);
            return {
                message: "Có lỗi xảy ra khi lấy video. Vui lòng thử lại sau.",
                error: error.message
            };
        }
    }
};
