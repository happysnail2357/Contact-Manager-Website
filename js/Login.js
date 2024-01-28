
const button = document.getElementById("login-btn");

if(button)
{
	button.addEventListener("click", doLogin);

}

let jsonObject;


function doLogin(){
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	let temp = {login:login,password:password};


	
	let url ="https://cardboardmc.com/LAMPAPI/Login.php";

	
  	
  
  postData(url, temp).then((data) => 
	{
		if(data.id !=0){
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



