
//Gets UserId
let result = (document.cookie).match(/[userId]+=\d,/g);
const user_id =Number(result[0].match(/\d/g));


url = "https://cardboardmc.com/LAMPAPI/GetUserContacts.php";
temp ={"userId": user_id};

let jsonObject = "";
const table = document.getElementById("t-body");

postData(url,temp).then((data)=>
{   
    jsonObject = data;
   
    let table = document.getElementById("t-body");
    console.log(jsonObject);
    // for(let i in jsonObject){
    //     fill_in_table(jsonObject[i],table);
    // }
    
});

const search_button = document.getElementById("search-btn");

search_button.addEventListener("click", ()=>
    {
        
        const input = document.getElementById("search-input").value;
        clear_screen();

        url = "https://cardboardmc.com/LAMPAPI/Search.php";
        
        
        temp = {"id" : user_id, "query": input};

        let contacts_array = "";
        console.log(temp);

        postData(url,temp).then((data)=>
        {   
            
            if(data.error !='Could not find any contacts.'){
                contacts_array = data;
                display(contacts_array);
                console.log(contacts_array);
            }
            
        })
    });

//Standard format for each contact user
function fill_in_table(jsonObject,table){


	let html= `<tr id=trow-${jsonObject.ID}>

                <th scope="row"  > 
                    <div class="div d-flex justify-content-center mt-4">
                        <input class="form-check-input" type="checkbox" value="" id="cbox-${jsonObject.ID}" style="height: 20px;width: 20px;">
                    </div>
                </th>
                    <td><p class="display-1 text-center">${jsonObject.Emoji? jsonObject.Emoji: "&#x2601"}</p></td>
                    <td class="text-center"><div class="first-name">${jsonObject.FirstName? jsonObject.FirstName: "#"}</div><div class="last-name">${jsonObject.LastName? jsonObject.LastName: " "}</div></td>
                        <td class="text-center">${jsonObject.Birthday?jsonObject.Birthday:"#"}</td>
                        <td class="text-center">${jsonObject.Phone? jsonObject.Phone: "#"}</td>
                        <td class="text-center">${jsonObject.Address? jsonObject.Address: "#"}</td>
                        <td class="text-center">${jsonObject.Email? jsonObject.Email: "#"}</td>
                        <td class="text-center">${jsonObject.Age? jsonObject.Age: "#"}</td>
                        <td clas= "text-center">
                            <button type="button" class="btn btn-secondary rounded m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"></path>
                                </svg>
                            </button>
                        </td>
                </tr>`;
    table.insertAdjacentHTML("beforeend",html);
       
}


//Requests data from API
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

//After getting a response from the Search API, it displays contact information on screen
function display(contacts_array){
    const table = document.getElementById("main-table");
    const t_body = document.getElementById("t-body");
    table.classList.remove("d-none");
    

    for(i in contacts_array){
        fill_in_table(contacts_array[i],t_body);
    }

}

//Client wont see table displayed on screen
function clear_screen(){
    const table = document.getElementById("main-table");
    const t_body = document.getElementById("t-body");
    t_body.innerHTML = "";
    table.classList.add("d-none");

}