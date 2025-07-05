const textInputEnElement = document.getElementById("textInputEn");
const passwordInputEnElement = document.getElementById("passwordInputEn");
const encodeElement = document.getElementById("encode");

const textInputDeElement = document.getElementById("textInputDe");
const passwordInputDeElement = document.getElementById("passwordInputDe");
const decodeElement = document.getElementById("decode");

//Version 1.1

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

const powerElement = document.getElementById("power");
const xTimesElement = document.getElementById("xTimes");
const bCTElement = document.getElementById("bCT");

function BinaryCrackTimer()
{
    var x = xTimesElement.value;
    var exponent = powerElement.value;

    var startTime, endTime;
    var addedTimes = 0, avarageTime;
    var times = [];

    const BigNumber = BigInt(1);

    for (var i = 0; i < x; i++)
    {
        startTime = new Date();
        for (var j = 0; j < 2**exponent; j++)
        {
        }
        endTime = new Date();
        times.push(endTime - startTime);
    }

    for (var i = 0; i < times.length; i++)
    {
        addedTimes += times[i];
    }
    avarageTime = addedTimes / times.length;
    bCTElement.textContent += "Power-" + exponent + "- Min: " + Math.min(...times).toString() + "ms, Max: " + Math.max(...times).toString()+ "ms, Avarage: " + avarageTime + "ms";
    bCTElement.textContent += String.fromCharCode(10);

    /*
    Tested 100 times per power
    Power-30- Min: 449ms, Max: 686ms, Avarage: 501.07ms
    Power-31- Min: 881ms, Max: 1025ms, Avarage: 947.33ms
    501ms / 2^30values = 4.6659261e-7ms per value or 0.46 NanoSeconds
    947ms / 2^31values = 4.4098123e-7ms per value or 0.44 NanoSeconds

    24 = 7
    24+n or 25power = 7*2^n or 14ms
    24+283 = 7*2^283ms or
    31,500,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000Years
    */
}