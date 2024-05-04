const express = require('express');
const { github_details } = require('../controllers/github_controllers');
const { users_signUp, users_login, verify_otp, } = require('../controllers/auth_controllers');
const auth_check = require('../middleware/auth_middleware');
const create_post = require('../controllers/create_post');

const router = express.Router();

router.get('/githubdetail/:username', github_details);
router.post('/signup', users_signUp);
router.post('/login', users_login);
router.post('/createpost', auth_check, create_post);
router.post('/verify_otp', verify_otp)



module.exports = router;  // Default Export