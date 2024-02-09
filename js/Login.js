
const button = document.getElementById("login-btn");

if(button)
{
	button.addEventListener("click", doLogin);

}

let jsonObject;


function doLogin(){
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	
	// Clear error messages if any
	reportUsernameError('');
	reportPasswordError('');
	document.getElementById("username").style.borderColor = "#ccc";
	document.getElementById("password").style.borderColor = "#ccc";
	
	// Check for empty fields
	if (login == "")
	{
		reportUsernameError("Username Required");
		document.getElementById("username").style.borderColor = "red";
		
		return;
	}
	if (password == "")
	{
		reportPasswordError("Password Required");
		document.getElementById("password").style.borderColor = "red";
		
		return;
	}

	let temp = {login:login,password:password};

	let url ="https://cardboardmc.com/LAMPAPI/Login.php";

	postData(url, temp).then((data) => 
	{
		
		if(data.error !='No Records Found'){
			jsonObject=data;
			saveCookie();
			console.log(jsonObject);
			window.location.href = "landing-page.html";
		}
		else{
			console.log(data.error);
			console.log(temp);
		}
  
	});
	
}

function reportUsernameError(message)
{
	let errorp = document.getElementById("username-error");
	
	errorp.textContent = message;
}

function reportPasswordError(message)
{
	let errorp = document.getElementById("password-error");
	
	errorp.textContent = message;
}



function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + jsonObject.firstName + ",lastName=" + jsonObject.lastName + ",userId=" + jsonObject.id + ",expires=" + date.toGMTString();
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
