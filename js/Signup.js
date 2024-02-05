
const button = document.getElementById("sign-up-btn");

if(button)
{
	button.addEventListener("click", doLogin);
}

let jsonObject = null;

function doLogin(){
	let login = document.getElementById("username").value;
	let password = document.getElementById("pass").value;
    let firstName = document.getElementById("f-name").value;
    let lastName = document.getElementById("l-name").value;
	
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