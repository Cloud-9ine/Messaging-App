const User = require('../models/user')

const loginUser = async (req, res) => {
    res.render('login')
};

const registerUser = async (req, res) => {
    res.render('signup')
}


const loginUserAccess = async (req, res) => {
    let userInput = await req.body
    //confirm user input...
    let userFound = await User.findOne({username: userInput.username});
    // userFound ? res.send('User Not Found!!!') : res.render('user', {userInfo : userInput});
    userFound ?  res.render('user', {user : userFound}) : res.send('User Not Found!!!');
};

const registerUserAccess = async (req, res) => {
    let userInput = await req.body;
    //user exists...
    let userExists = await User.findOne({username: userInput.username});

    if(!userExists){
        let user = {
            username : userInput.username,
            email : userInput.email,
            password : userInput.password
        }
        let newUser = new User(user)
        const saved = await newUser.save();
        saved ? res.json({error: false, message: "new user saved in database"}) : res.json({error: true, message: "user couldn't be saved"})
    }else{
        res.json({
            error: true, 
            message: "user already exists"
        })
    }
};


const homeAccess = async (req, res) => {
    let userInfo = await req.body;
    //user chats exists...
}





module.exports = {
    loginUser,
    registerUser,
    loginUserAccess,
    registerUserAccess
}