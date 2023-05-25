const express = require('express')
const route = express.Router()
const ec = require('../../controllers/employeescontroller')

route.route('/')
    .get(ec.getallemp)
    .post(ec.postemp)
    .put(ec.putemp)
    .delete(ec.delemp)

route.route('/:id').get(ec.getemp)

module.exports = route

