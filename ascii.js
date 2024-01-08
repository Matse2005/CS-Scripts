function asciiToNumber(character) {
  if (typeof character !== "string" || character.length !== 1) {
    return "Invalid input. Please enter a single character.";
  }

  const asciiValue = character.charCodeAt(0);
  return asciiValue;
}

function numberToAscii(input) {
  var number = parseInt(input);
  if (!Number.isInteger(number) || number < 0 || number > 255) {
    return "Invalid input. Please enter a valid number between 0 and 255.";
  }

  const asciiChar = String.fromCharCode(number);
  return asciiChar;
}

// Example usage:
const input = 45; // Change this to any ASCII character

// const result = asciiToNumber(input);
const result = numberToAscii(input);

console.log(result);
