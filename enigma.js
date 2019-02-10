//Get rotor setting element.
var rot_1_pos = document.getElementById("rotor1");
var rot_2_pos = document.getElementById("rotor2");
var rot_3_pos = document.getElementById("rotor3");
//Get input/output area and the button element.
var inputSource = document.getElementById("inpuText");
var outputTarget = document.getElementById("outputText");
var eButton = document.getElementById("encryptButton");
//Create the rotor object
var Rotor1 = new Rotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ",0);
var Rotor2 = new Rotor("AJDKSIRUXBLHWTMCQGZNPYFVOE",0);
var Rotor3 = new Rotor("BDFHJLCPRTXVZNYEIWGAKMUSQO",0);
var Reflector = new Rotor("YRUHQSLDPXNGOKMIEBFZCWVJAT",0);

eButton.onclick = function()
{
  var inputSentence = inputSource.value;
  var outputSentence = "";
  var plugInput = "";
  var plugOutput = "";
  //Taking the plugboard settings
  for(var i = 1; i<11; i++)
  {
    var checkid = "check"+ String(i);
    if(document.getElementById(checkid).checked)
    {
      var plugInputID = "plug"+String(i)+"a";
      var plugOutputID = "plug"+String(i)+"b";
      plugInput = plugInput + document.getElementById(plugInputID).value;
      plugOutput = plugOutput + document.getElementById(plugOutputID).value;
    }
  }
  /*
  var temp = plugOutput;
  plugOutput = plugOutput + plugInput;
  plugInput = plugInput + temp;*/
  console.log(plugInput)
  console.log(plugOutput)
  //Setting the rotors position according to the setting in the elements
  Rotor1.setPosition(rot_1_pos.value);
  Rotor2.setPosition(rot_2_pos.value);
  Rotor3.setPosition(rot_3_pos.value);
  for(var i = 0; i<inputSentence.length; i++)
  {
    var testLetter = inputSentence[i];
    testLetter = testLetter.toUpperCase();
    //Passing the letter to the plugboard
    for(var j = 0;  j<plugInput.length; j++)
    {
      if(testLetter==plugInput[j])
      {
        testLetter = plugOutput[j];
      }
      else {
        if(testLetter == plugOutput[j])
        {
          testLetter = plugInput[j];
        }
      }
    }
    testLetter = Rotor1.forwardEncrypt(testLetter);
    testLetter = Rotor2.forwardEncrypt(testLetter);
    testLetter = Rotor3.forwardEncrypt(testLetter);
    testLetter = Reflector.forwardEncrypt(testLetter);
    testLetter = Rotor3.reverseEncrypt(testLetter);
    testLetter = Rotor2.reverseEncrypt(testLetter);
    testLetter = Rotor1.reverseEncrypt(testLetter);
    for(var j = 0;  j<plugOutput.length; j++)
    {
      if(testLetter==plugOutput[j])
      {
        testLetter = plugInput[j];
      }
      else {
        if(testLetter==plugInput[j])
        {
          testLetter =  plugOutput[j];
        }
      }
    }
    Rotor1.rotateRotor();
    rot_1_pos.value = Rotor1.currentPosition;
    if(Rotor1.currentPosition==0)
    {
      Rotor2.rotateRotor();
      rot_2_pos.value = Rotor2.currentPosition;
      if(Rotor2.currentPosition==0)
      {
          Rotor3.rotateRotor();
          rot_3_pos.value = Rotor3.currentPosition;
      }
    }
    outputSentence = outputSentence + testLetter;
  }
  outputTarget.value = outputSentence;
}
