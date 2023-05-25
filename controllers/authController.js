const usersDB = {
    users : require('../model/users.json')
}

const path = require('path')
const bcrypt = require('bcrypt')

const authlogin = async(req,res)=>{
    const user = req.body.name;
    const pwd = req.body.password;
    if(!user || !pwd) return res.status(400).json({'message':'Username and password are required'})
    const finduser = usersDB.users.find(person=>person.username===user);
    if(!finduser) return res.status(401).json({'message':'user doesnt exist!'})
    try{
        const match = await bcrypt.compare(pwd,finduser.password)
        if(!match){
            // alert('ifnsifmeo')
            return res.redirect('/login')
            // return res.status(401).json({'message':'password is wrong!'})
        } 
        res.status(201).json({'success':`LOGIN ${user} successful!`})

    } catch(err){
        res.status(500).json({'message':err.message})
    }
}

module.exports = {authlogin}