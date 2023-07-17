const express = require("express");
const router = express.Router();
const {users: User, validation: OTPValidation}  = require('../models');
const { generateOTP, sendOTP } = require("../otp");
const createNewOTP = email => {
  let code = generateOTP()
  sendOTP(email, code);
  return code;
};
router.post("/forgotten-password/get-otp", async (req, res, next) => {
  const email = req.body.email;

  try {
    let user = await User.findOne({where : {email }});

    // If user does not exist, return error & stop at here
    if (!user) {
      return res.status(401).send("Email does not exist");
    }

    let userInOTPTable = OTPValidation.findOne({where: {email}});
    if(!userInOTPTable) {
      let tmpOTPCode = createNewOTP(email);
      await OTPValidation.create({email: email, code: tmpOTPCode})
      res.send(200).send("OTP sent successfully")
    } 
    else {
            // check to see if user is blocked
            let currentTime = new Date();
            let currentTimeInUnix = currentTime.getTime();
            let latestUpdateAt = new Date(userInOTPTable.updatedAt)
            let latestUpdateInUnix = latestUpdateAt.getTime()
            if (currentTimeInUnix < latestUpdateInUnix + 1000 * 60) {
              return res.status(403).send("Too many attempts. Try after a minute."); // will stop execution if blocked
            } else {
              let tmpOTPCode = createNewOTP(email);
              await OTPValidation.update({email: email},  {where: { code: tmpOTPCode}})
            }
    };
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/forgotten-password/login", async (req, res) => {
  const email = req.body.email;
  const OTP = req.body.OTP;

  try {
    const user = await OTPValidation.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if((new Date(user.updatedAt)).getTime() + (1000 * 60 * 5) < Date.now()){
      return res.send("OTP expired")
    }
    if (user.code !== OTP) {
      return res.status(403).send("Invalid OTP");
    }


  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
