var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.post('/changePassword', async (req, res) => {
//   try {
//       const { userId, currentPassword, newPassword } = req.body;

//       // Find the user by their ID
//       const user = await User.findById(userId);
//       if (!user) {
//           return res.status(404).json({ success: false, message: "User not found" });
//       }

//       // Compare the current password with the hashed password in the database
//       const isMatch = await bcrypt.compare(currentPassword, user.password);
//       if (!isMatch) {
//           return res.status(401).json({ success: false, message: "Current password is incorrect" });
//       }

//       // If the current password is correct, hash the new password
//       const salt = await bcrypt.genSalt(10);
//       const hashedNewPassword = await bcrypt.hash(newPassword, salt);

//       // Update the user's password in the database
//       user.password = hashedNewPassword;
//       await user.save(); // Save the updated user

//       res.json({ success: true, message: "Password changed successfully" });
//   } catch (error) {
//       console.error("Error changing password:", error);
//       res.status(500).json({ success: false, message: "An error occurred while changing the password" });
//   }
// });

module.exports = router;
