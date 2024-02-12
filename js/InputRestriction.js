// Input filters to restrict what characters can be entered into input fields

function usernameInputRestrict(keypress)
{
	// Only allow letters, numbers, or underscores
	
	let val = keypress.target;
	val.value = val.value.replace(/[^\w\d_]/gi, '');
}

function passwordInputRestrict(keypress)
{
	// Only allow letters, numbers, or !@#$%^&*_-=+?
	
	let val = keypress.target;
	val.value = val.value.replace(/[^\w\d!@#$%\^&*_\-=+?]/gi, '');
}

function nameInputRestrict(keypress)
{
	// Only allow letters
	
	let val = keypress.target;
	val.value = val.value.replace(/[^a-z]/gi, '');
}

