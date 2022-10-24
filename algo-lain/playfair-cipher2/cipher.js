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

function encrypt(plaintext, key) {
  plaintext = sanitize(plaintext);

  ciphertext = "";
  for (i = 0; i < plaintext.length; i++) {
    p = plaintext.charCodeAt(i) - 97;

    ciphertext += String.fromCharCode(((parseInt(p) + parseInt(key)) % 26) + 97);
  }
  return ciphertext;
}

function decrypt(ciphertext, key) {
  ciphertext = sanitize(ciphertext);

  plaintext = "";
  for (i = 0; i < ciphertext.length; i++) {
    c = ciphertext.charCodeAt(i) - 97;

    plaintext += String.fromCharCode(((parseInt(c) - parseInt(key) + 26) % 26) + 97);
  }
  return plaintext;
}

$(document).ready(function() {
  $("#encrypt").click(function() {
    plaintext = $("#plaintextInput").val();
    key = $("#keyEncryptInput").val();
    $("#output").text(encrypt(plaintext, key));
    $("#output4").text(key.split('').join(' '));
    $("#output5").text(plaintext.split('').join(' '));
    $("#output6").text(getCodeOutput(encrypt(plaintext, key)));
    //console.log(encrypt(plaintext, key));
  });

  $("#decrypt").click(function() {
    ciphertext = $("#ciphertextInput").val();
    key = $("#keyDecryptInput").val();
    $("#output").text(decrypt(ciphertext, key));
    $("#output4").text(key.split('').join(' '));
    $("#output5").text(ciphertext.split('').join(' '));
    $("#output6").text(getCodeOutput(decrypt(ciphertext, key)));
    //console.log(decrypt(ciphertext, key));
  });

});