const axios = require("axios");

module.exports = {
    config: {
        name: "ggsearch",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "Kz Khánhh, Tiny (Chỉnh sửa bởi Claude)",
        description: "Tìm kiếm kết quả trên Google",
        commandCategory: "Công cụ",
        usages: "ggsearch [từ khóa]",
        cooldowns: 5,
        dependencies: {
            "google-it": ""
        }
    },

    run: async ({ args }) => {
        try {
            const keyword = args.join(" ");
            if (!keyword) {
                return { message: 'Vui lòng nhập từ khóa tìm kiếm' };
            }

            const results = await require('google-it')({ query: keyword });

            let searchMessage = `[🌟] Kết quả tìm kiếm trên Google cho từ khóa "${keyword}":\n\n`;

            for (let i = 0; i < Math.min(5, results.length); i++) {
                const result = results[i];
                searchMessage += `${i + 1}. ${result.title}\n<a href="${result.link}" target="_blank">${result.link}</a>\n\n`;
            }

            return {
                message: searchMessage
            };
        } catch (error) {
            console.error("Đã có lỗi xảy ra:", error);
            return { message: "Đã có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.", error: error.message };
        }
    }
};