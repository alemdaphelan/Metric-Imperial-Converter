const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('check not null',()=>{
        assert.isNotNull(convertHandler.getNum(""),"default should be 1");
    })
    test('check null',() => {
        assert.isNull(convertHandler.getNum("2/3/2l"),"illegal number should be a null");
    })
    test('check define',() =>{
        assert.isDefined(convertHandler.getNum(""),"default is 1 and should be defined")
    })
    test('check undefined',() =>{
        assert.isUndefined(convertHandler.getReturnUnit("$"),"$ should be a undefined unit")
    })
    test('equal',() =>{
        assert.equal(convertHandler.getNum('1l'),1,"1 liters should get 1 as a number");
    });
    test('not equal',() => {
        assert.notEqual(convertHandler.getNum('1l'),2,"1 liters should get 2 as a number");
    })
    test('strict equal',() =>{
        assert.strictEqual(convertHandler.getNum('1l'),1,"1 liters should be a number");
    })
    test('not strict equal', () => {
        assert.notStrictEqual(convertHandler.getNum('1l'),'2'," '1' and '2' should not strict equal");
    })   
    test('equal string',() => {
        assert.strictEqual(convertHandler.getUnit('2l'),convertHandler.getReturnUnit('gal'),"gallons and liters should be a pair");
    })
    test('not equal string',() =>{
        assert.notStrictEqual(convertHandler.getUnit('2l'),convertHandler.getReturnUnit('kg'),"liters and kilograms are different unit");
    })
    let validUnits = ["gal","L","kg","lbs","mi","km"];
    test('check valid unit',() =>{
        assert.include(validUnits,convertHandler.getUnit('1l'),"liters is a valid unit");
    })
    test('check not valid unit',() =>{
        assert.notInclude(validUnits,convertHandler.getUnit('1ha'),"ha is not a valid unit");
    })
    test('check spell out',() =>{
        assert.strictEqual(convertHandler.spellOutUnit('L'),'liters','L is liters');
    })
    test('check undefined spell out',() =>{
        assert.isUndefined(convertHandler.spellOutUnit('$'),"$ is undefined");
    })
    test('check defined spell out',() =>{
        assert.isDefined(convertHandler.spellOutUnit('kg'),"kilogram is defined");
    })
    test('check is not null',() =>{
        assert.isNotNull(convertHandler.getString(1,'L',convertHandler.convert(1,'L'),'gal'),"the result should not be null");
    })
});