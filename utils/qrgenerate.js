const QRCode = require('qrcode');

const generateQRCode = async (userData) => {
  const dataString = JSON.stringify(userData);
  try {
    const qrCodeUrl = await QRCode.toDataURL(dataString); // Generate QR code as a data URL
    return qrCodeUrl;
  } catch (error) {
    console.error("Error generating QR code", error);
    throw error;
  }
};

module.exports = generateQRCode;
