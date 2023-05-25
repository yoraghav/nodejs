const usersDB = {
    users : require('../model/users.json'),
    setUser : function(data){this.users = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async(req,res)=>{
    const user = req.body.name
    const pwd = req.body.password
    if(!user || !pwd) return res.status(400).json({'message':'Username and password are required'})
    const duplicate = usersDB.users.find(person=>person.username===user);
    if(duplicate){return res.status(409)}
    try{
        const newpwd = await bcrypt.hash(pwd,10)
        const newuser = {"username":user,"password":newpwd}
        usersDB.setUser([...usersDB.users,newuser])
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users)
        res.status(201).json({'success':`New user ${user} created!`})

    } catch(err){
        res.status(500).json({'message':err.message})
    }
}

module.exports = {handleNewUser}