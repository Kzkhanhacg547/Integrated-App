const axios = require('axios');

const API = 'https://j8c2z9-2007.csb.app/sim';

module.exports = {
    config: {
        name: 'simi',
        version: '1.2',
        hasPermssion: 0,
        credits: 'DC-Nam, modified by Assistant',
        description: 'Trò chuyện với bot Simi.',
        commandCategory: 'Tiện ích',
        usages: '[tin nhắn]',
        cooldowns: 0,
    },

    run: async ({ args }) => {
        try {
            const msg = args.join(' ');

            if (!msg) {
                return {
                    message: "Vui lòng nhập tin nhắn để trò chuyện."
                };
            }

            const encodedMsg = encodeURIComponent(msg);
            const response = await axios.get(`${API}?type=ask&ask=${encodedMsg}`);
            const answer = response.data.answer;

            return {
                message: answer
            };
        } catch (error) {
            console.error("Error in Simi module:", error);
            return {
                message: "Có lỗi xảy ra khi trò chuyện. Vui lòng thử lại sau.",
                error: error.message
            };
        }
    },

    handleEvent: async ({ args }) => {
        const msg = args.join(' ');

        if (!msg) {
            return null; // Không phản hồi nếu tin nhắn trống
        }

        try {
            const encodedMsg = encodeURIComponent(msg);
            const response = await axios.get(`${API}?type=ask&ask=${encodedMsg}`);
            const answer = response.data.answer;

            return {
                message: answer
            };
        } catch (error) {
            console.error("Error in Simi handleEvent:", error);
            return {
                message: "Có lỗi xảy ra khi trò chuyện. Vui lòng thử lại sau.",
                error: error.message
            };
        }
    }
};