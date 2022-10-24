//This function encypts the message by multiplying the plaintext by the keys matrix and converting the number to their alphabetical value
function hillEncipher(plaintext, keys)
{
    var output = "";

    plaintext = plaintext.toUpperCase().replace(/[^A-Z]/gi, "");
    if (plaintext.length % 2 == 1)
        plaintext + 'X';

    errorChecking(plaintext, keys);
    keygeneration(keys);

    for (i = 0; i < plaintext.length; i += 2) {
        output += String.fromCharCode((keys[0] * (plaintext.charCodeAt(i) - 64) + keys[1] * (plaintext.charCodeAt(i + 1) - 64)) % 26 + 64);
        output += String.fromCharCode((keys[2] * (plaintext.charCodeAt(i) - 64) + keys[3] * (plaintext.charCodeAt(i + 1) - 64)) % 26 + 64);
    }
    return output;
}

//This function deciphers a text from the user by taking their input and the key and inverting in order to get the hidden message
function hillDecipher(ciphertext, keys)
{
    ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/gi, "");

    errorChecking(ciphertext, keys);
    keygeneration(keys);
    var det = keys[0] * keys[3] - keys[1] * keys[2];
    det = ((det % 26) + 26) % 26;
    var di = 0;
    for (var i = 0; i < 26; i++) {
        if ((det * i) % 26 == 1) di = i;
    }
    //This takes the inverse of the keys so that we can use the same algorithm as the encryption
    var ikeys = new Array(4);
    ikeys[0] = (di * keys[3]) % 26;
    ikeys[1] = (-1 * di * keys[1]) % 26;
    ikeys[2] = (-1 * di * keys[2]) % 26;
    ikeys[3] = di * keys[0];
    for (i = 0; i < 4; i++) {
        if (ikeys[i] < 0) ikeys[i] += 26;
    }
    var plaintext = "";
    for (i = 0; i < ciphertext.length; i += 2) {
        plaintext += String.fromCharCode((ikeys[0] * (ciphertext.charCodeAt(i) - 64) + ikeys[1] * (ciphertext.charCodeAt(i + 1) - 64)) % 26 + 64);
        plaintext += String.fromCharCode((ikeys[2] * (ciphertext.charCodeAt(i) - 64) + ikeys[3] * (ciphertext.charCodeAt(i + 1) - 64)) % 26 + 64);
    }
    return plaintext;
}
//Takes the user input for the key and puts it in an array called keys
function keygeneration(keys){
    for (i = 0; i < 4; i++)
        keys[i] = keys[i] % 26;
}
//Checks to make sure that the user input for the text and keys are valid and able to be used to encrypt / decrypt. 
function errorChecking(text, keys){
    if (text.length < 1) {
        console.log("Text can not be blank");
        return;
    }
    if (text.length % 2 == 1) {
        console.log("Text can not be used, use something different.");
        return;
    }
    if (keys.length != 4) {
        console.log("key should consist of 4 integers");
        return;
    }
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
    p = plaintext.charCodeAt(i) - 64;
    
    z = z + " " + p;
    
  }
  return z;
}

function getCodekey(key) {
  z = "";
  
  for (i = 0; i < plaintext.length; i++) {
    n = key.charCodeAt(i) - 64;
    
    z = z + " " + n;
    
  }
  return z;
}

function getCodeOutput(key) {
  z = "";
  
  for (i = 0; i < plaintext.length; i++) {
    n = key.charCodeAt(i) - 64;
    
    z = z + " " + n;
    
  }
  return z;
}




$(document).ready(function() {
  $("#encrypt").click(function() {
    plaintext = $("#plaintextInput").val();
        m1 = Number($('#m1enc').val());
        m2 = Number($('#m2enc').val());
        m3 = Number($('#m3enc').val());
        m4 = Number($('#m4enc').val());
    $("#output").text(hillEncipher(plaintext, [m1, m2, m3, m4]));
    $("#output2").text(getCodePlainText(plaintext));
    $("#output4").text(m1.split('').join(' '));
    $("#output5").text(plaintext.split('').join(' '));
    $("#output6").text(getCodeOutput(hillEncipher(plaintext, [m1, m2, m3, m4])));
    //console.log(encrypt(plaintext, key));
  });

  $("#decrypt").click(function() {
    ciphertext = $("#ciphertextInput").val();
        m1 = Number($('#m1dec').val());
        m2 = Number($('#m2dec').val());
        m3 = Number($('#m3dec').val());
        m4 = Number($('#m4dec').val());
    $("#output").text(hillDecipher(ciphertext, [m1, m2, m3, m4]));
    $("#output2").text(getCodePlainText(ciphertext));
    $("#output4").text(m1.split('').join(' '));
    $("#output5").text(ciphertext.split('').join(' '));
    $("#output6").text(getCodeOutput(hillDecipher(ciphertext, [m1, m2, m3, m4])));
    //console.log(decrypt(ciphertext, key));
  });
  
});