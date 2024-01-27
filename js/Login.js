

const button = document.getElementById("login-btn");

button.addEventListener("click", doLogin);


function doLogin(){
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	let tmp = {login:login,password:password};

	
	//console.log(tmp);

	let jsonPayload = JSON.stringify( tmp );
	
	let url ="https://cardboardmc.com/LAMPAPI/Login.php";


	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
                console.log(jsonObject);
				window.location.href = "landing-page.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err);
	}
}