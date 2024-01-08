function decimalToSystem(decimalNumber, system) {
  if (
    isNaN(parseInt(decimalNumber)) ||
    !Number.isInteger(parseInt(decimalNumber)) ||
    decimalNumber < 0
  ) {
    return "Invalid input. Please enter a valid non-negative integer.";
  }

  let convertedNumber;
  if (system > 9) {
    convertedNumber = parseInt(decimalNumber).toString(system).toUpperCase();
  } else {
    convertedNumber = parseInt(decimalNumber).toString(system);
  }

  return convertedNumber;
}

function systemToDecimal(number, system) {
  if (isNaN(parseInt(number, system))) {
    return "Invalid input. Please enter a valid number in the specified system.";
  }

  let decimalNumber;
  decimalNumber = parseInt(number, system);

  return decimalNumber;
}

function systemToSystem(number, to, from) {
  return decimalToSystem(systemToDecimal(number, from), to);
}

/*
  USAGE
  Required:
    number
    chosenSystem
  Return:
    String or Integer
  Most Used:
    Binary: chosenSystem = 2
    Decimal: chosenSystem = 10
    Hex: chosenSystem = 16
*/
const number = "0101101110000"; // The number you want to convert in a string so you could also type 5A6
const chosenSystem = 2; // The system you want to use

// Uncomment the function you want to use
// const result = systemToDecimal(number, chosenSystem); // From the system to decimal
// const result = decimalToSystem(number, chosenSystem); // From decimal to the system

// When you want to from a system to a system
const from = 16;
const result = systemToSystem(number, chosenSystem, from);

// Log the result
console.log(result);
