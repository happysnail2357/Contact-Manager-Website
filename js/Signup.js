
const button = document.getElementById("sign-up-btn");

if(button)
{
	button.addEventListener("click", doLogin);
}

let jsonObject = null;

function doLogin(){
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let conf_password = document.getElementById("confirm-password").value;
    let firstName = document.getElementById("f-name").value;
    let lastName = document.getElementById("l-name").value;
	
	// Clear error messages if any
	document.getElementById("username-error").textContent = "";
	document.getElementById("password-error").textContent = "";
	document.getElementById("f-name-error").textContent = "";
	document.getElementById("l-name-error").textContent = "";
	document.getElementById("username").style.borderColor = "#ccc";
	document.getElementById("password").style.borderColor = "#ccc";
	document.getElementById("confirm-password").style.borderColor = "#ccc";
	document.getElementById("f-name").style.borderColor = "#ccc";
	document.getElementById("l-name").style.borderColor = "#ccc";
	
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
		document.getElementById("confirm-password").style.borderColor = "red";
		
		missingField = true;
	}
	if (firstName == "")
	{
		document.getElementById("f-name-error").textContent = "First Name required";
		document.getElementById("f-name").style.borderColor = "red";
		
		missingField = true;
	}
	if (lastName == "")
	{
		document.getElementById("l-name-error").textContent = "Last Name required";
		document.getElementById("l-name").style.borderColor = "red";
		
		missingField = true;
	}
	
	if (missingField)
		return;
	
	// Password minimum requirements
	if (password.length < 8)
	{
		document.getElementById("password-error").textContent = "Password must have at least 8 characters";
		document.getElementById("password").style.borderColor = "red";
		
		return;
	}
	if (password.search(/[0-9]/) == -1 || password.search(/[A-Z]/) == -1 || password.search(/[a-z]/) == -1)
	{
		document.getElementById("password-error").textContent = "Password must have a lowercase letter, an UPPERCASE letter, and a number";
		document.getElementById("password").style.borderColor = "red";
		
		return;
	}
	
	// Passwords must match
	if (password != conf_password)
	{
		document.getElementById("password-error").textContent = "Passwords must match";
		document.getElementById("password").style.borderColor = "red";
		document.getElementById("confirm-password").style.borderColor = "red";
		
		return;
	}
	
	
	
	
	let temp = {
		'login':login,
		'password':password,
		'firstName':firstName,
		'lastName':lastName
	};
	
	let url ="https://cardboardmc.com/LAMPAPI/Register.php";

	postData(url, temp).then((data) => 
	{
		if(data.error != null){
			jsonObject=data;
			saveCookie();
			
			window.location.href = "landing-page.html";
		}
	});
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + jsonObject.firstName + ",lastName=" + jsonObject.lastName + ",userId=" + jsonObject.id + ",expires=" + date.toGMTString();
	console.log('cookies saved!');
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

