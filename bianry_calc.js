function sum(s1, s2) {
  // Converting binary strings to decimal numbers with parseInt
  var num1 = parseInt(s1, 2);
  var num2 = parseInt(s2, 2);

  // Add decimal numbers num1 and num2 together
  var sum = num1 + num2;

  // Converting back to binary string with toString method
  var binarySum = sum.toString(2);

  // Return string
  return binarySum;
}

function substract(s1, s2) {
  // Converting binary strings to decimal numbers with parseInt
  var num1 = parseInt(s1, 2);
  var num2 = parseInt(s2, 2);

  // Add decimal numbers num1 and num2 together
  var sum = num1 - num2;

  // Converting back to binary string with toString method
  var binarySum = sum.toString(2);

  // Return string
  return binarySum;
}

function multiply(s1, s2) {
  // Converting binary strings to decimal numbers with parseInt
  var num1 = parseInt(s1, 2);
  var num2 = parseInt(s2, 2);

  // Add decimal numbers num1 and num2 together
  var sum = num1 * num2;

  // Converting back to binary string with toString method
  var binarySum = sum.toString(2);

  // Return string
  return binarySum;
}

function divide(s1, s2) {
  // Converting binary strings to decimal numbers with parseInt
  var num1 = parseInt(s1, 2);
  var num2 = parseInt(s2, 2);

  // Add decimal numbers num1 and num2 together
  var sum = num1 / num2;

  // Converting back to binary string with toString method
  var binarySum = sum.toString(2);

  // Return string
  return binarySum;
}

function calculate(numbers, calculation = "sum", fill = false) {
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    var result = "";
    switch (calculation) {
      case "sum":
        result = sum(number["one"], number["two"]);
        break;
      case "substract":
        result = substract(number["one"], number["two"]);
        break;
      case "multiply":
        result = multiply(number["one"], number["two"]);
        break;
      case "divide":
        result = divide(number["one"], number["two"]);
        break;
      default:
        result = sum(number["one"], number["two"]);
        break;
    }

    var string = "";
    if (fill) {
      for (let j = 0; j < 16 - result.length; j++) {
        string += "0";
      }
    }
    string += result;

    console.log(i + 1 + ": " + string); //true
  }
}

var numbers = [
  {
    one: "0000001111011100",
    two: "0000000100100000",
  },
];

// calculate(numbers, "sum");
calculate(numbers, "substract");
// calculate(numbers, "multiply");
// calculate(numbers, "divide");

// 16 bit notatie
// calculate(numbers, "sum", true);
// calculate(numbers, "substract", true);
// calculate(numbers, "multiply", true);
// calculate(numbers, "divide", true);
