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
  if(plaintext.length < 1){ alert("please enter some plaintext"); return; }
  if(isNaN(key))
    {alert("Please enter key")}
  if(key > Math.floor(2*(plaintext.length-1))){ alert("key is too large for the plaintext length."); return; }  

  ciphertext = "";
  
   for(line=0; line<key-1; line++){
       skip=2*(key-line-1);   j=0;
        for(i=line; i<plaintext.length;){
            ciphertext += plaintext.charAt(i);
            if((line==0) || (j%2 == 0)) i+=skip;
           else i+=2*(key-1) - skip;  
           j++;          
        }
    }
    
   for(i=line; i<plaintext.length; i+=2*(key-1)) ciphertext += plaintext.charAt(i);
  
   var finaltext=ciphertext;
    ciphertextnew=ciphertext;
    finaltext=finaltext.replace(/\s+/g, '');
    
  
  return finaltext;
}

function decrypt(ciphertext, key) {
    key = parseInt(key);
    var length=ciphertext.length;
    
    //   ciphertext= ciphertext.slice(key+1, length+1); 
       
       length=ciphertext.length;

       //ciphertext=ciphertext.substr(0,length-(key+1));
       
     
    pt = new Array(ciphertext.length);   k=0;
    for(line=0; line<key-1; line++){
       skip=2*(key-line-1);  j=0;
        for(i=line; i<ciphertext.length;){
            pt[i] = ciphertext.charAt(k++);
            if((line==0) || (j%2 == 0)) i+=skip;
           else i+=2*(key-1) - skip;  
           j++;        
        }
    }
    for(i=line; i<ciphertext.length; i+=2*(key-1)) pt[i] = ciphertext.charAt(k++);

  return pt.join("");
}


function zigzag(str, rows) {
  const zig = (period, phase) => [...str]
    .map((character, index) => [phase, period - phase].includes(index % period) ? character : ' ')
    .join('');
    var hasil = "";
  for (let row = 0; row < rows; ++row) {
    hasil += "&#8205;" + zig(rows + rows - 2 || 1, row) + "<br>";
  }
  return hasil;
}


$(document).ready(function() {
  $("#encrypt").click(function() {
    plaintext = $("#plaintextInput").val();
    key = $("#keyEncryptInput").val();
    $("#output").text(encrypt(plaintext, key));
    $("#output4").text(key.split('').join(' '));
    $("#output5").text(plaintext.split('').join(''));
    
    var hasil = document.getElementById("output6");
        hasil.innerHTML = zigzag(plaintext, parseInt(key));
  });

  $("#decrypt").click(function() {
    ciphertext = $("#ciphertextInput").val();
    key = $("#keyDecryptInput").val();
    $("#output").text(decrypt(ciphertext, key));
    $("#output4").text(key.split('').join(' '));
    $("#output5").text(ciphertext.split('').join(''));
  });

});

