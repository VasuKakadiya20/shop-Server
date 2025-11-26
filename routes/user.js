// const {User} = require("../models/user")
// const express = require('express')
// const router = express.Router()
// const bcrypt = require('bcrypt');

// router.get('/', async (req, res) => {
//     try {
//         const user = await User.find({})
//         return res.status(200).json(user)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: error.message })
//     }
// })
// router.post('/create', async (req, res) => {
//     const usern = req.body.username
//     try {
//         const existuser = await User.findOne({ username: usern });
//         if (existuser) {
//             return res.status(404).json({ msg: "User already exists!" });
//         } else {
//             const { username, Email, password, cpassword } = req.body;
//             let user = new User({
//                 username,
//                 Email,
//                 password,
//                 cpassword
//             });
//             console.log(user);
//             user = await user.save();
//             res.status(201).json(user);
//             console.log("client added", user)
//         }

//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: error.message })
//     }
// })

// router.post('/loginuser', async (req, res) => {
//     const { Email, password } = req.body;

//     try {
//         const user = await User.findOne({ Email });
//         if (!user) {
//             return res.status(404).json({ msg: "Email not found!" });
//         }
//         if (user.password !== password) {
//             return res.status(401).json({ msg: "Invalid password!" });
//         }
//         return res.status(200).json({
//             msg: "Login successful!",
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 Email: user.Email
//             }
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: error.message });
//     }
// });


// module.exports = router;
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


router.get("/", async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/create", async (req, res) => {
  const { username, Email, password } = req.body;

  try {
    const existuser = await User.findOne({ Email });
    if (existuser) {
      return res.status(400).json({ msg: "User already exists!" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      Email,
      password: hashPassword
    });

    await user.save();
    return res.status(201).json({ msg: "User created successfully!", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


router.post("/loginuser", async (req, res) => {
  const { Email, password } = req.body;

  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ msg: "Email not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password!" });
    }

    return res.status(200).json({
      msg: "Login successful!",
      user: {
        id: user._id,
        username: user.username,
        Email: user.Email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
