const textInputEnElement = document.getElementById("textInputEn");
const passwordInputEnElement = document.getElementById("passwordInputEn");
const encodeElement = document.getElementById("encode");

const textInputDeElement = document.getElementById("textInputDe");
const passwordInputDeElement = document.getElementById("passwordInputDe");
const decodeElement = document.getElementById("decode");

//ASCII printable characters
const asciiMinShift = 32;
const numOfLetters = BigInt(95);

function NewLinePass() 
{
	var textIn = textInputEnElement.value;
	var textOut = textIn.replaceAll(String.fromCharCode(10), " ");
	return textOut;
}

function PasswordEncode() 
{
    var inputText = NewLinePass();
    var inputPassword = passwordInputEnElement.value;

    //Get Password Number
    var passwordBackwardsCounter = 0;
    var passwordNum = BigInt(0);

    passwordBackwardsCounter = inputPassword.length - 1;
    for (var i = 0; i < inputPassword.length; i++)
    {
        var inputPasswordValue = BigInt(inputPassword.charCodeAt(i) - asciiMinShift);
        passwordNum += inputPasswordValue * numOfLetters ** BigInt(passwordBackwardsCounter);
        passwordBackwardsCounter--;
    }

    //Get Text Number
    var textBackwardsCounter = 0;
    var textNum = BigInt(0);

    textBackwardsCounter = inputText.length - 1;
    for (var i = 0; i < inputText.length; i++)
    {
        var inputTextValue = BigInt(inputText.charCodeAt(i) - asciiMinShift);
        textNum += inputTextValue * numOfLetters ** BigInt(textBackwardsCounter);
        textBackwardsCounter--;
    }

    //Encode
    var encodeNumber = textNum * passwordNum;
    console.log(textNum + " " + passwordNum);

    encodeElement.textContent += inputText;
    encodeElement.textContent += " Encoded password -" + inputPassword + ":" + String.fromCharCode(10);
    encodeElement.textContent += encodeNumber;
    encodeElement.textContent += String.fromCharCode(10);
}

function PasswordDecode() 
{
    var inputNumber = BigInt(textInputDeElement.value);
    var inputPassword = passwordInputDeElement.value;


    //Get Password Number
    var passwordBackwardsCounter = 0;
    var passwordNum = BigInt(0);

    passwordBackwardsCounter = inputPassword.length - 1;
    for (var i = 0; i < inputPassword.length; i++)
    {
        var inputPasswordValue = BigInt(inputPassword.charCodeAt(i) - asciiMinShift);
        passwordNum += inputPasswordValue * numOfLetters ** BigInt(passwordBackwardsCounter);
        passwordBackwardsCounter--;
    }

    //Decode
    var decodeNumber = inputNumber / passwordNum;

    decodeElement.textContent += decodeNumber;
    decodeElement.textContent += " Decoded Password -" + inputPassword + ":" + String.fromCharCode(10);

    var returner = decodeNumber;
    var powerIncrement = 0;
    while(returner >= 1)
    {
        powerIncrement++;
        returner = returner/numOfLetters;
    }

    for (var i = powerIncrement; i >= 0; i--)
    {
        var letterNum = decodeNumber / numOfLetters ** BigInt(i) % numOfLetters;
        decodeElement.textContent += String.fromCharCode(Number(letterNum) + asciiMinShift);
    }
    decodeElement.textContent += String.fromCharCode(10);
}