const generateOtp = () => {
    const otpCreate = Math.floor(100000 + Math.random() * 900000);
    return otpCreate
};

module.exports = { generateOtp }