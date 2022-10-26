import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','username',]
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async(req, res) => {
    
    const { username, password, confPassword } = req.body;
    
    if(!username || !password) return res.status(400).json({message: 'username or password cannot empty'})

    // if(!username.includes('@')) return res.status(400).json({message: 'Username format invalid'})

    const user = await Users.findAll({
        where:{
            username:  username,
        }
    });

    if(user[0]) return res.status(400).json({message: 'username is exits'});

    if(password.length < 8) return res.status(400).json({message: 'Password minimum 8 characters'})

    if(password !== confPassword) return res.status(400).json({message: "Password dan Confirm Password tidak cocok"});
    
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: username,
            password: hashPassword
        });
        res.json({message: "Register Berhasil"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({message: "Wrong Password"});
        const userId = user[0].id;
        const username = user[0].username;
        const accessToken = jwt.sign({userId, username}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, username}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({message:"Username tidak ditemukan"});
    }
}
