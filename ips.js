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

function ipToBin(ip) {
  let arr = ip.split(".");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = addZerosToLength(decimalToSystem(arr[i], 2), 8);
  }
  return arr.join(".");
}

function binToIp(ip) {
  let arr = ip.split(".");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = systemToDecimal(arr[i], 2);
  }
  return arr.join(".");
}

function addZerosToLength(number, length) {
  let str = number.toString();
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}

const ip = "192.168.0.0";

const result = ipToBin(ip);
// const result = binToIp(ip);

console.log(result);
