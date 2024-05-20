const crypto = require('crypto');
const user = require("../models/userModel");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const jwtkey = process.env.JWT_KEY
const pepper = process.env.PEPPER//Difference entre pepper et salt et que le salt est dans la bdd et le pepper en local . Les deux servent a modifiée le mdp
const hashPassword = (password, salt) => {
    const hash = crypto.createHmac('sha512', salt);//Je set le hash a sha512 avec mon salt
    hash.update(password + pepper);//Je rajoute mon pepper au hashage du mdp
    const value = hash.digest('hex');
    return {
        salt: salt,
        hashedPassword: value
    };
};

exports.getUser = async (req , res) =>{
    const userById = req.article;

    return res.status(200).json({
        message: `User with id ${req.params.id} successfully found`,
        status: 200,
        User: userById
    })
};

exports.Login = async (req,res)=>{
    const { email,username , password ,remember} = req.body;
    try{
        const utilisateur = await user.login(email,username);
        if (!utilisateur){
            return res.status(401).json({
                message:`Invalid username or password`,
                status: 401
            });
        }
        const hashedPassword = hashPassword(password, utilisateur.Salt);//Récupere le password hashé
        if (hashedPassword === utilisateur.Pwd) {//Test s'il est egale au password de l'utilisateur a l'email donné par l'utilisateur
            if (email){
                const Token = jwt.sign({ email: utilisateur.Email }, jwtkey, { expiresIn: remember ? '365j':'24h' });//Me passe un token pendant 24h et le régle avec le jwtkey
                res.status(200).json({ Token });//Je renvoie un nouveau token a chaque login
            }else{
                const Token = jwt.sign({username: utilisateur.Name}, jwtkey, { expiresIn: remember ? '365j': '24h' });
                res.status(200).json({ Token });
            }
        } else {
            return res.status(401).json({
                message:`Invalid username or password`,
                status: 401
            });
        }
    }catch (err){
        res.status(500).json({
            message:err,
            status:500
        });
    }
}

exports.Regiter = async (req,res)=>{
    const { username, email, password } = req.body;
    const salt = crypto.randomBytes(16).toString('hex')//Prend un salt bien chiant
    const hashedPassword  = hashPassword(password, salt);//hash mon password
    try{
        await user.register({username, email, hashedPassword, salt});
        res.status(201).json({
            message : `User registered successfully`,
            status: 201
        })
    }catch (err){
        res.status(500).send({
            message:err,
            status:500
        })
    }
}

exports.patchUser = async (req,res)=>{
    const id = req.params.id
    const body = req.body;

    //Check si une clé du body appartient a cette liste
    if (!body || !Object.keys(body).some(key => ["Name", "Biography", "Email", "Password", "Id_roles"].includes(key))) {
        return res.status(400).json({
            message: "Au moins un des champs (Name, Biography, Email, Password, Id_roles) doit être modifié",
            status: 400
        });
    }

    try{
        await user.updatePatchUser(id, body);

        return res.status(200).json({
            message: `User with id ${id} successfully updated`,
            status: 200,
        });
    }catch (err){
        res.status(500).json({
            message: err,
            status:500
        });
    }
}


exports.deleteUser = async (req,res)=>{
    const id = req.params.id;
    try {
        await user.deleteUser(id);
        return res.status(200).json({
            message: `User with id ${id} successfully delete`,
            status: 200,
        })
    }catch (err){
        res.status(500).json({
            message:err,
            status: 500
        });
    }
}

