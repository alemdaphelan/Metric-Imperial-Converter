'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get('/api/convert' ,(req,res) =>{
    let {input} = req.query;
    if(!input) return res.send('invalid unit');

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if(!initNum && !initUnit) return res.send("invalid number and unit");
    if(!initNum) return res.send('invalid number');
    if(!initUnit) return res.send('invalid unit');

    let returnNum = convertHandler.convert(initNum,initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum,initUnit,returnNum,returnUnit);
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  })
  app.get('/ping',(req,res) =>{
    res.send('pong');
  })
};
