// Assignment code here
var specialCharacters = [ '@', '%', '+', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var passwordType = [];
var charTrue = [];
var passwordLength = 0;
var passwordText = document.querySelector("#password");


// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page


function generatePassword() {
  var passwordConcat = [].concat.apply([], passwordType); //concat user defined array
  
  while (passwordLength < passwordType[0]) {
    charSelect = Math.floor(Math.random()*passwordConcat.length + 1);
    passwordText.textContent = passwordText.textContent + passwordConcat[charSelect];
    passwordLength++;
  }
  if (charTrue[0] === true && hasLowerCase(passwordText) === false) {
    passwordText = ('');
    generatePassword();
  }
  if (charTrue[1] === true && hasUpperCase(passwordText) === false) {
    passwordText = ('');
    generatePassword();
  }
  if (charTrue[2] === true && hasNumbers(passwordText) === false) {
    passwordText = ('');
    generatePassword();
  }
  if (charTrue[3] === true && hasSpecial(passwordText) === false) {
    passwordText = ('');
    generatePassword();
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function chooseChar() {
  var lowerCase = window.confirm('Would you like to use lowercase characters? (a,b,c,d,e)');
    if (lowerCase === true) {
      passwordType.push(lowerCasedCharacters);
      charTrue.push(lowerCase);
    }
    else {
      charTrue.push(lowerCase);
    }
  var upperCase = window.confirm('Would you like to use uppercase characters? (A,B,C,D,E)');
    if (upperCase === true) {  
      passwordType.push(upperCasedCharacters);
      charTrue.push(upperCase);
    }
    else {
      charTrue.push(upperCase);
    }
  var numeric = window.confirm('Would you like to use numeric characters? (1,2,3,4,5)');
    if (numeric === true) {  
      passwordType.push(numericCharacters);
      charTrue.push(numeric);
    }
    else {
      charTrue.push(numeric);
    }
  var special = window.confirm('Would you like to use special characters? (!,@,#,$,%)');
    if (special === true) {  
      passwordType.push(specialCharacters);
      charTrue.push(special);
    }
    else {
      charTrue.push(special);
    }
  if (lowerCase === false && upperCase === false && numeric === false && special === false) {
    window.alert('Please choose at least one set of characters.');
    chooseChar();
  }
  console.log(charTrue);
}

// Write password to the #password input
function writePassword() {
  passwordType = [];
  passwordLength = 0;
  passwordText = ('');
  charTrue = [];
  var promptPassword = window.prompt('Please choose between 8 and 128 characters for your password. Enter integers only.');
    promptPassword = parseInt(promptPassword)
    if (promptPassword < 8 || promptPassword > 128) {
      writePassword();
    }
    else if (isNaN(promptPassword)) {
      window.alert('Enter integers only.');
      writePassword();
    }
    else {
      console.log()
      passwordType.push(promptPassword); //index 0 defines length
      
      chooseChar();
      
      var password = generatePassword();
      
      // passwordText.value = password;
    }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
