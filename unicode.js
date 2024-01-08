function unicodeToNumber(character) {
  if (typeof character !== "string" || !character || character.length > 2) {
    return "Invalid input. Please enter a single character.";
  }

  const unicodeValue = character.charCodeAt(0);
  return unicodeValue;
}

function numberToUnicode(input) {
  var number = parseInt(input);
  if (!Number.isInteger(number) || number < 0 || number > 1114111) {
    return "Invalid input. Please enter a valid number between 0 and 1114111.";
  }

  const unicodeChar = String.fromCharCode(number);
  return unicodeChar;
}

// Example usage:
const input = "55354"; // Change this to any Unicode character

// const result = unicodeToNumber(input);
const result = numberToUnicode(input);

console.log(result);
