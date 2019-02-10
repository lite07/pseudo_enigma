
class Rotor
{
	constructor(getRotatingString, initialPosition){
		this.fixedString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		this.rotatingString = getRotatingString;
		this.currentPosition = 0;
		//Set Initial Rotor Position;
		for(var i = 0; i<initialPosition; i++)
		{
			this.rotateRotor();
		}
	}

	setPosition(targetPosition)
	{
		while(this.currentPosition!=targetPosition)
		{
			this.rotateRotor();
		}
	}

	forwardEncrypt(inputLetter)
	{
		if(inputLetter == " ")
		{
			return " ";
		}
		var i = 0;
		for(;i<this.fixedString.length; i++)
		{
			if(this.fixedString[i]==inputLetter)
			{
					break;
			}
		}
		var encryptedLetter = this.rotatingString[i]
		return encryptedLetter;
	}

	reverseEncrypt(inputLetter)
	{
		if(inputLetter == " ")
		{
			return " ";
		}
		var i = 0;
		for(;i<this.rotatingString.length; i++)
		{
			if(this.rotatingString[i]==inputLetter)
			{
					break;
			}
		}
		var encryptedLetter = this.fixedString[i]
		return encryptedLetter;
	}

	rotateRotor() {
			var n = this.rotatingString.length;
			this.rotatingString = this.rotatingString[n-1] + this.rotatingString.substring(0,n-1);
			this.currentPosition++;
			if(this.currentPosition==n)
			{
				this.currentPosition = 0;
			}
	}
}
