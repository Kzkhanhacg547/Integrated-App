const axios = require('axios');

module.exports = {
  config: {
    name: "ad",
    version: "0.0.2",
    hasPermssion: 0,
    credits: "Kz",
    description: "xem thông tin",
    commandCategory: "Admin",
    cooldowns: 5
  },

  run: async ({ args }) => {
    const API = 'https://j8c2z9-2007.csb.app';

    const adminInfo = [
      {
        name: '𝐊𝐳_𝐊𝐡á𝐧𝐡',
        uid: '100081129610697',
        gender: 'Nam',
        birthday: '10-11-27',
        location: 'Hải Dương',
        facebook: 'https://fb.me/kzkhanh547'
      },
      {
        name: '𝐘𝐞̂́𝐧 𝐍𝐡𝐢',
        nickname: '𝐂𝐡𝐢𝐁𝐢',
        birthyear: '2007',
        gender: 'Nữ',
        birthday: '10 - 3',
        height: '1m65',
        hometown: 'Ninh Bình',
        location: 'Thành phố Hồ Chí Minh',
        zodiac: 'Song Ngư',
        facebook: 'https://www.facebook.com/yennhy27.chibi'
      },
      {
        name: '𝐍𝐠ọ𝐜 𝐇â𝐧',
        nickname: '𝐓𝐢𝐧𝐲',
        birthyear: '2007',
        gender: 'Nữ',
        birthday: '24/6',
        height: '1m63',
        hometown: 'Ninh Bình',
        location: 'Hồ Chí Minh City',
        facebook: 'https://www.facebook.com/100085279261059'
      }
    ];

    if (!args[0]) {
      try {
        const response = await axios.get(`${API}/vdnhac`);
        const videoUrl = response.data.url;

        return {
          message: `==== [ 𝗠𝗘𝗡𝗨 𝗔𝗗𝗠𝗜𝗡 ] ====
━━━━━━━━━━━━━━━━━━
1. Kz Khánhh 🍔
2. Yến Nhi 🎠
3. Ngọc Hân🦨

Sử dụng ad 1, ad 2, ad 3 để xem thông tin admin bạn muốn xem`,
          mediaUrl: videoUrl
        };
      } catch (error) {
        console.error("Error fetching video: ", error);
        return { message: "Có lỗi xảy ra khi lấy video. Vui lòng thử lại sau." };
      }
    } else {
      const choice = parseInt(args[0]);
      if (isNaN(choice) || choice < 1 || choice > 4) {
        return { message: "Vui lòng nhập số hợp lệ trong danh sách." };
      }

      const selectedAdmin = adminInfo[choice - 1];
      return {
        message: `==== [ 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 ] ====
👤 Tên: ${selectedAdmin.name}
🌐 UID: ${selectedAdmin.uid || ''}
👤 Giới tính: ${selectedAdmin.gender}
🎊 Sinh nhật: ${selectedAdmin.birthday}
🏠 Đến từ: ${selectedAdmin.location}
🌸 Facebook: ${selectedAdmin.facebook}
${selectedAdmin.note || ''}`
      };
    }
  }
};