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


function affineEncipher(multiplicativeKey, additiveKey, plainText)
{
    multiplicativeKey = math.mod(multiplicativeKey, 26);
    additiveKey = math.mod(additiveKey, 26);

    if (math.mod(multiplicativeKey, 2) == 0 || multiplicativeKey == 13)
        return null;
       
    var stringInput = plainText.toString();
    stringInput = stringInput.replace(/\W/ig, "").toUpperCase();
    var chars = stringInput.split("");
        
    for (i = 0; i < chars.length; i++)
    {
        var char = chars[i].charCodeAt(0) - 64;

            var multiplicativeValue = math.mod(char * multiplicativeKey, 26);

            if (multiplicativeValue == 0)
                multiplicativeValue = 26;
                
            char = math.mod(multiplicativeValue * additiveKey, 26);

            

        if (char == 0)
            char = 26;

        chars[i] = String.fromCharCode(char + 64);
    }

    return chars.join("");
}



function affineDecipher(multiplicativeKey, additiveKey, plainText)
{
    multiplicativeKey = math.mod(multiplicativeKey, 26);
    additiveKey = math.mod(additiveKey, 26);

    const mValues = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
    const inverseValues = [1, 9, 21, 15, 3, 19, 7, 23, 11, 5, 17, 25];
    
    if (math.mod(multiplicativeKey, 2) == 0 || multiplicativeKey == 13)
        return null;
    
    var multiplicativeInverse = inverseValues[mValues.indexOf(multiplicativeKey)];
    
    var stringInput = plainText.toString();
    stringInput = stringInput.replace(/\W/ig, "").toUpperCase();
    var chars = stringInput.split("");
     
    for (var i = 0; i < chars.length; i++)
    {
        var char = chars[i].charCodeAt(0) - 64;


            var undoAddition = math.mod(char - additiveKey, 26);

            if (undoAddition == 0)
                undoAddition = 26;

            char = math.mod(undoAddition * multiplicativeInverse, 26);

        if (char == 0)
            char = 26;
        
        chars[i] = String.fromCharCode(char + 64);
    }

    return chars.join("");
}

$(document).ready(function() {
  $("#encrypt").click(function() {
    plaintext = $("#plaintextInput").val();
    additiveKey = $("#additiveKeyEncryptInput").val();
    multiplicativeKey = $("#multiplicativeKeyEncryptInput").val();
    $("#output").text(affineEncipher(multiplicativeKey, additiveKey, plaintext));
    $("#output2").text(getCodePlainText(plaintext));
    $("#output4").text(additiveKey.split('').join(' '));
    $("#output5").text(plaintext.split('').join(' '));
    $("#output6").text(getCodeOutput(affineEncipher(multiplicativeKey, additiveKey, plaintext)));
    //console.log(encrypt(plaintext, key));
  });

  $("#decrypt").click(function() {
    ciphertext = $("#ciphertextInput").val();
    additiveKey = $("#additiveKeyDecryptInput").val();
    multiplicativeKey = $("#multiplicativeKeyDecryptInput").val();
    $("#output").text(affineDecipher(multiplicativeKey, additiveKey, ciphertext));
    $("#output2").text(getCodePlainText(ciphertext));
    $("#output4").text(additiveKey.split('').join(' '));
    $("#output5").text(ciphertext.split('').join(' '));
    $("#output6").text(getCodeOutput(affineDecipher(multiplicativeKey, additiveKey, ciphertext)));
    //console.log(decrypt(ciphertext, key));
  });
  
});