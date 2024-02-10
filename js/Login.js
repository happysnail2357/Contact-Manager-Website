
// Redirect
if(document.cookie != '')
{
    window.location.href = "landing-page.html";
}


const button = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Add event listeners
if (button) button.addEventListener("click", doLogin);
if (usernameInput) usernameInput.addEventListener("input", usernameInputRestrict);
if (passwordInput) passwordInput.addEventListener("input", passwordInputRestrict);


let jsonObject = null;


function doLogin(){
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	
	// Clear error messages if any
	document.getElementById("username-error").textContent = '';
	document.getElementById("password-error").textContent = '';
	document.getElementById("username").style.borderColor = "#ccc";
	document.getElementById("password").style.borderColor = "#ccc";
	
	let missingField = false;
	
	// Check for empty fields
	if (login == "")
	{
		document.getElementById("username-error").textContent = "Username required";
		document.getElementById("username").style.borderColor = "red";
		
		missingField = true;
	}
	if (password == "")
	{
		document.getElementById("password-error").textContent = "Password required";
		document.getElementById("password").style.borderColor = "red";
		
		missingField = true;
	}
	
	if (missingField)
		return;
	

	let temp = {login:login,password:password};

	let url ="https://cardboardmc.com/LAMPAPI/Login.php";

	postData(url, temp).then((data) => 
	{
		if (data.error == '')
		{
			jsonObject=data;
			saveCookie();
			pageTransition("landing-page.html");
		}
		else if (data.error == 'No Records Found')
		{
			document.getElementById("password-error").textContent = "Username or Password incorrect";
			document.getElementById("password").style.borderColor = "red";
			document.getElementById("username").style.borderColor = "red";
		}
		else
		{
			document.getElementById("password-error").textContent = "Error: contact administrator";
		}
	});
}


function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = `user=firstName=${jsonObject.firstName},lastName=${jsonObject.lastName},userId=${jsonObject.id};expires=${date.toGMTString()};path=/;`;
}

async function postData(url = "", data = {}) 
{
	const response = await fetch(url, 
	{
		method: "POST", 
		mode: "cors", 
		cache: "no-cache", 
		credentials: "omit", 
		headers:
		{
			"Content-Type": "application/json",
			
		},
		redirect: "follow", 
		referrerPolicy: "no-referrer", 
		body: JSON.stringify(data), 
	});
	return response.json(); 
}
