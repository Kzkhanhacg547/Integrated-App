const axios = require('axios');

module.exports = {
    config: {
        name: 'waifu',
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


            const API = 'https://api.waifu.pics/sfw/waifu';
            const response = await axios.get(API);
            const imageUrl = response.data.url;

            return {
                message: 'Đây là một ảnh waifu ngẫu nhiên cho bạn! 😊',
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