// All upper case letters in alphabetic order.
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Buffer character for padding.
const bufferChar = "X";

function validateType(variable, type, variableName)
{
    if(typeof(variable) !== type)
        throw new Error("Invalid input. Expected type '" + type + "' for " + variableName + ", got type '" + typeof(variable) + "'.");
}





// Enciphers the given text using the Playfair cipher.
// J is treated as an I so the keysquare is a perfect 5x5 square.
function playfairEncipher(plaintext, keyword)
{
    // Validate inputs.
    validateType(plaintext, "string", "plaintext");
    validateType(keyword, "string", "keyword");

    var keySquare = generateKeySquare(keyword.toUpperCase().replace(/[^A-Z]/gi, "").replace("J", "I"));
    var input = plaintext.toUpperCase().replace(/[^A-Z]/gi, "").replace("J", "I");
    var chars = input.split("");
    var charsInts = [];
    var result = [];

    if (chars.length == 0)
        return null;

    // Add a buffer for double letters.
    for (var i = 0; i < chars.length - 1; i++)
    {
        if (chars[i] !== chars[i + 1])
            continue;
        
        chars.splice(i + 1, 0, bufferChar)
    }

    // Add a buffer at the end if the size is not even.
    if (chars.length % 2 == 1)
        chars.push(bufferChar);

    // Convert each character to its ASCII equivalent minus 64 (A=1, B=2, ..., Z=26).
    chars.forEach(e => {
        charsInts.push(e.charCodeAt(0) - 64);
    });
    
    // Performs the substituion.
    for (var i = 0; i < charsInts.length - 1; i += 2)
    {
        // Get the location of the char in the key square.
        var char1 = keySquare.indexOf(charsInts[i])
        var char2 = keySquare.indexOf(charsInts[i + 1])

        // Get the rows and columns of both letters.
        var row1 = math.floor(char1 / 5);
        var row2 = math.floor(char2 / 5);

        var column1 = math.mod(char1, 5);
        var column2 = math.mod(char2, 5);

        // If the chars are in the same column, they go down 1 and wrap around if needed.
        if (column1 === column2)
        {
            // New letter indexes.
            char1 = math.mod(char1 + 5, 25);
            char2 = math.mod(char2 + 5, 25);   

            charsInts[i] = keySquare[char1];
            charsInts[i + 1] = keySquare[char2];
        }
        // If the chars are in the same row, they go right 1 and wrap around if needed.
        else if (row1 === row2)
        {
            // New row indexes.
            column1 = math.mod(column1 + 1, 5);
            column2 = math.mod(column2 + 1, 5);

            // Calculate new indices.
            char1 = 5 * row1 + column1;
            char2 = 5 * row2 + column2;

            charsInts[i] = keySquare[char1];
            charsInts[i + 1] = keySquare[char2];
        }
        // If the char isn't in the same row or column, both are slid to the column of the other letter.
        else
        {
            // New column indexes.
            var swap = column1;
            column1 = column2;
            column2 = swap;

            // Calculate new indices.
            char1 = 5 * row1 + column1;
            char2 = 5 * row2 + column2;

            charsInts[i] = keySquare[char1];
            charsInts[i + 1] = keySquare[char2];
        }
    }

    // Convert the integers back into their letter form.
    charsInts.forEach(e => {
        result.push(String.fromCharCode(e + 64));
    });

    return result.join("");
}

// Deciphers the given text using the Playfair cipher.
// I and J are interchangable, so any J's expected during deciphering will come out as an I.
function playfairDecipher(ciphertext, keyword)
{
    // Validate inputs.
    validateType(ciphertext, "string", "ciphertext");
    validateType(keyword, "string", "keyword");

    var keySquare = generateKeySquare(keyword.toUpperCase().replace(/[^A-Z]/gi, "").replace("J", "I"));
    var input = ciphertext.toUpperCase().replace(/[^A-Z]/gi, "");
    var chars = input.split("");
    var charsInts = [];
    var result = [];

    if (chars.length == 0)
        return null;

    if (chars.length % 2 == 1)
        throw new Error("Invalid ciphertext, must have an even length.");

    // Convert each character to its ASCII equivalent minus 64 (A=1, B=2, ..., Z=26).
    chars.forEach(e => {
        charsInts.push(e.charCodeAt(0) - 64);
    });

    // Performs the substituion.
    for (var i = 0; i < charsInts.length - 1; i += 2)
    {
        // Get the location of the char in the key square.
        var char1 = keySquare.indexOf(charsInts[i])
        var char2 = keySquare.indexOf(charsInts[i + 1])

        // Get the rows and columns of both letters.
        var row1 = math.floor(char1 / 5);
        var row2 = math.floor(char2 / 5);

        var column1 = math.mod(char1, 5);
        var column2 = math.mod(char2, 5);

        // If the chars are in the same column, they go down 1 and wrap around if needed.
        if (column1 === column2)
        {
            // New letter indexes.
            char1 = math.mod(char1 - 5, 25);
            char2 = math.mod(char2 - 5, 25);   

            charsInts[i] = keySquare[char1];
            charsInts[i + 1] = keySquare[char2];
        }
        // If the chars are in the same row, they go right 1 and wrap around if needed.
        else if (row1 === row2)
        {
            // New row indexes.
            column1 = math.mod(column1 - 1, 5);
            column2 = math.mod(column2 - 1, 5);

            // Calculate new indices.
            char1 = 5 * row1 + column1;
            char2 = 5 * row2 + column2;

            charsInts[i] = keySquare[char1];
            charsInts[i + 1] = keySquare[char2];
        }
        // If the char isn't in the same row or column, both are slid to the column of the other letter.
        else
        {
            // New column indexes.
            var swap = column1;
            column1 = column2;
            column2 = swap;

            // Calculate new indices.
            char1 = 5 * row1 + column1;
            char2 = 5 * row2 + column2;

            charsInts[i] = keySquare[char1];
            charsInts[i + 1] = keySquare[char2];
        }
    }

    // Convert the integers back into their letter form.
    charsInts.forEach(e => {
        result.push(String.fromCharCode(e + 64));
    });

    return result.join("");
}

// Constructs and returns the key square from the keyword.
function generateKeySquare(keyword)
{
    var keySquare = [];

    // Construct the first part of the keysquare from the keyword.
    keyword.split("").forEach(e => {
        if (!keySquare.includes(e.charCodeAt(0) - 64))
            keySquare.push(e.charCodeAt(0) - 64);
    });

    // Construct the remainder of the keysquare from the alphabet.
    alphabet.replace("J", "I").split("").forEach(e => {
        if (!keySquare.includes(e.charCodeAt(0) - 64))
            keySquare.push(e.charCodeAt(0) - 64);
    });

    return keySquare;
}



function generateKey(text, key) {
  newKey = key;
  x = text.length;
  for (i = 0; true; i++) {
    if (i == x) {
      i = 0;
    }
    if (newKey.length == text.length) {
      break;
    }
    newKey += newKey.charAt(i);
  }
  return newKey;
}

function sanitize(input) {
  lowercase = input.toLowerCase();

  noSymbols = "";
  alpha = "abcdefghijklmnopqrstuvwxyz";
  for (i = 0; i < lowercase.length; i++) {
    for (j = 0; j < alpha.length; j++) {
      if (lowercase.charAt(i) == alpha.charAt(j)) {
        noSymbols += lowercase.charAt(i);
        break;
      }
    }
  }

  return noSymbols;
}

function getCodePlainText(plaintext) {
  plaintext = sanitize(plaintext);
  z = "";
  
  for (i = 0; i < plaintext.length; i++) {
    p = plaintext.charCodeAt(i) - 97;
    
    z = z + " " + p;
    
  }
  return z;
}

function getCodekey(key) {
  z = "";
  
  for (i = 0; i < plaintext.length; i++) {
    n = key.charCodeAt(i) - 97;
    
    z = z + " " + n;
    
  }
  return z;
}

function getCodeOutput(key) {
  z = "";
  
  for (i = 0; i < plaintext.length; i++) {
    n = key.charCodeAt(i) - 97;
    
    z = z + " " + n;
    
  }
  return z;
}

$(document).ready(function() {
  $("#encrypt").click(function() {
    plaintext = $("#plaintextInput").val();
    key = $("#keyEncryptInput").val();
    $("#output").text(playfairEncipher(plaintext, key));
    $("#output4").text(key.split('').join(' '));
    $("#output5").text(plaintext.split('').join(' '));
    $("#output6").text(getCodeOutput(playfairEncipher(plaintext, key)));
    //console.log(encrypt(plaintext, key));
  });

  $("#decrypt").click(function() {
    ciphertext = $("#ciphertextInput").val();
    key = $("#keyDecryptInput").val();
    $("#output").text(playfairDecipher(ciphertext, key));
    $("#output4").text(key.split('').join(' '));
    $("#output5").text(ciphertext.split('').join(' '));
    $("#output6").text(getCodeOutput(playfairDecipher(ciphertext, key)));
    //console.log(decrypt(ciphertext, key));
  });

});