import express from "express";
import bodyParser from "body-parser";
// import request from "request";

import { getUsers, Register, Login } from "../controllers/Users.js";
import { JobList , JobDetail } from "../controllers/Jobs.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.get('/job-list', JobList);

router.get('/job-detail/:uid', JobDetail);


// router.get('/test',  async (req, res) =>  {
//     try {
//         res.json(process.env.API_URL + `?description=${req.query.description}&location=${req.query.location}&full_time=${req.query.full_time}`)
//         const apiResponse = await fetch(process.env.API_URL )
//         const apiResponseJson = await apiResponse.json()
//         console.log(apiResponseJson)
//         res.send(apiResponseJson)
//     } catch (err) {
//         console.log(err)
//         res.status(500).send('Something went wrong')
//     }
// });


// router.get('/test', (req, res) => {
//     res.send('Test')
// })
  
 
export default router;