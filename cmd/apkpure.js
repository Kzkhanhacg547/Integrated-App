const axios = require('axios');

module.exports = {
    config: {
        name: "apkpure",
        version: "1.0.1",
        hasPermssion: 0,
        credits: "DC-Nam (modified by Assistant)",
        description: "Tìm kiếm kết quả trên Google với liên kết có thể nhấn",
        commandCategory: "Tiện ích",
        usages: "gg [Text]",
        cooldowns: 5
    },

    run: async ({ args }) => {
        const textNeedSearch = args.join(" ");
        if (!textNeedSearch) {
            return {
                message: "Vui lòng nhập nội dung cần tìm kiếm."
            };
        }

        const regex = /(https?:\/\/.*?\.(?:png|jpe?g|gif)(?:\?(?:[\w_-]+=[\w_-]+)(?:&[\w_-]+=[\w_-]+)*)?(.*))($)/;

        let searchUrl;
        if (regex.test(textNeedSearch)) {
            searchUrl = `https://www.google.com/searchbyimage?&image_url=${encodeURIComponent(textNeedSearch)}`;
        } else {
            searchUrl = `https://apkpure.com/vn/search?q=${encodeURIComponent(textNeedSearch)}`;
        }

        const clickableLink = `<a href="${searchUrl}" target="_blank">Nhấn vào đây để xem kết quả tìm kiếm</a>`;

        return {
            message: `Kết quả tìm kiếm apkpure cho "${textNeedSearch}":\n${clickableLink}`
        };
    }
};