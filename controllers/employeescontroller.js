
const data = {
    employees : require('../model/data.json'),
    setEmployees:function(data){this.employees=data}
}


const getallemp = (req,res)=>{
    res.json(data.employees)
}

const postemp = (req,res)=>{
    const newemp = {
        "id":data.employees[data.employees.length-1].id+1||1,
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    }

    if(!newemp.firstname||!newemp.lastname){
        return res.status(400).json({'message':'firstname and lastname required'})
    }
    data.setEmployees([...data.employees,newemp])
    res.json(data.employees)
}

const putemp  =(req,res)=>{
    const findemp = data.employees.find(emp=>emp.id===parseInt(req.body.id))
    if(!findemp){return res.status(400).json({'message':'no one w that id'})}

    if(req.body.firstname) findemp.firstname = req.body.firstname
    if(req.body.lastname) findemp.lastname = req.body.lastname

    const filt = data.employees.filter(emp=>emp.id!==parseInt(req.body.id))
    const unsorted = [...filt,findemp]

    data.setEmployees(unsorted.sort((a,b)=>a.id>b.id?1:-1))
    res.json(data.employees)
}

const delemp = (req,res)=>{
    const findemp = data.employees.find(emp=>emp.id===parseInt(req.body.id))
    if(!findemp){return res.status(400).json({'message':'no one w that id'})}
    const filt = data.employees.filter(emp=>emp.id!==parseInt(req.body.id))
    data.setEmployees([...filt])
    res.json(data.employees)
}

const getemp =(req,res)=>{
    const findemp = data.employees.find(emp=>emp.id===parseInt(req.body.id))
    if(!findemp){return res.status(400).json({'message':'no one w that id'})}
    res.json(findemp)
}

module.exports = {
    getallemp,
    getemp,
    postemp,
    putemp,
    delemp
}