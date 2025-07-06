function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;

    const isAlpha = (c) =>{
      return /[a-zA-Z]/.test(c);
    }

    let index = 0;
    while(index < input.length && !isAlpha(input[index])){
      index++;
    }
    let numStr = input.slice(0,index);
    if(numStr.length === 0) return 1;

    let parts = numStr.split('/');
    if(parts.length > 2) return NaN;
    if(parts.length === 2){
      const [numerator,denominator] = parts;
      return parseFloat(numerator) / parseFloat(denominator);
    }
    return parseFloat(parts[0]);
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/);
    const unit = result[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if(!validUnits.includes(unit)) return null;
    return unit === 'l' ? 'L' : unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase();
    let result;
    if(initUnit === 'gal' || initUnit === 'l'){
      result = initUnit === 'l' ? 'gal' : 'L';
    }
    else if (initUnit === 'kg' || initUnit === 'lbs'){
      result = initUnit === 'kg' ? 'lbs' : 'kg';
    }
    else{
      result = initUnit === 'mi' ? 'km' : 'mi';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    const map = new Map();
    map.set('gal','gallons');
    map.set('L','liters');
    map.set('lbs','pounds');
    map.set('kg','kilograms');
    map.set('mi','miles');
    map.set('km','kilometers');
    let result = map.get(unit);
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let unitConvert;
    let result;
    if(initUnit === 'gal' || initUnit === 'L'){
      unitConvert = initUnit === 'gal' ? galToL : 1/galToL;
    }
    else if(initUnit === 'lbs' || initUnit === 'kg'){
      unitConvert = initUnit === 'lbs' ? lbsToKg : 1/lbsToKg;
    }
    else{
      unitConvert = initUnit === 'mi' ? miToKm : 1/miToKm;
    }
    result = parseFloat((initNum * unitConvert).toFixed(5));
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`; 
    return result;
  };
  
}

module.exports = ConvertHandler;
