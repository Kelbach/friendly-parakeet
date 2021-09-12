var specialCharacters = [ '@', '%', '+', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var passwordType = []; //an array containing arrays of characters based on user choices
var charTrue = []; // [passwordlength, lowerCase, upperCase, numbers, special] index 0 is a number and the rest are booleans
var passwordLength = 0; //counter to keep track of while-loop
var passwordText = document.querySelector("#password"); 
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  var passwordConcat = [].concat.apply([], passwordType); //concat user defined array
  passwordText.textContent = ''; //resets .textContent
  passwordLength = 0; //resets while-loop counter
  
  while (passwordLength < charTrue[0]) {
    charSelect = Math.floor(Math.random()*passwordConcat.length);
    passwordText.textContent = passwordText.textContent + passwordConcat[charSelect];
    passwordLength++;
  }

  //character validation, boolean output, took me like 4 hours to figure out
  var hasLowerCase = /(?=.*[a-z])/.test(passwordText.textContent);
  var hasUpperCase = /(?=.*[A-Z])/.test(passwordText.textContent);    
  var hasNumeric = /(?=.*[\d])/.test(passwordText.textContent);  
  var hasSpecial = /(?=.*[\W])/.test(passwordText.textContent);  

  //conditional validations
  if (charTrue[1] === true && hasLowerCase === false) {
    generatePassword();
  }
  if (charTrue[2] === true && hasUpperCase === false) {
    generatePassword();
  }
  if (charTrue[3] === true && hasNumeric === false) {
    generatePassword();
  }
  if (charTrue[4] === true && hasSpecial === false) {
    generatePassword();
  }
}

//prompt to choose character sets
function chooseChar() {
  var lowerCase = confirm('Would you like to use lowercase characters? (a,b,c,d,e)');
    if (lowerCase) {
      passwordType.push(lowerCasedCharacters);
    }
    charTrue.push(lowerCase);
    
  var upperCase = confirm('Would you like to use uppercase characters? (A,B,C,D,E)');
    if (upperCase) {  
      passwordType.push(upperCasedCharacters);
    }
    charTrue.push(upperCase);
    
  var numeric = confirm('Would you like to use numeric characters? (1,2,3,4,5)');
    if (numeric) {  
      passwordType.push(numericCharacters);
    }
    charTrue.push(numeric);
    
  var special = confirm('Would you like to use special characters? (!,@,#,$,%)');
    if (special) {  
      passwordType.push(specialCharacters);
    }
    charTrue.push(special);
    
  if (lowerCase === false && upperCase === false && numeric === false && special === false) {
    alert('Please choose at least one set of characters.');
    chooseChar();
  }
}

function writePassword() {
  passwordType = [];
  passwordLength = 0;
  charTrue = [];

  var promptPassword = prompt('Please choose between 8 and 128 characters for your password. Enter integers only.');
    if (promptPassword === null) {
      return;
    }
    else {
      promptPassword = parseInt(promptPassword)
      if (promptPassword < 8 || promptPassword > 128) {
        writePassword();
      }
      else if (isNaN(promptPassword)) {
        alert('Enter integers only.');
        writePassword();
      }
      else {
        charTrue.push(promptPassword); //index 0 defines length
        
        chooseChar();
        
        generatePassword();
      }
    }
}

generateBtn.addEventListener("click", writePassword);