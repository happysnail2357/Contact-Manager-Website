
//Gets UserId
let result = (document.cookie).match(/[userId]+=\d,/g);
const user_id =Number(result[0].match(/\d/g));


url = "https://cardboardmc.com/LAMPAPI/GetUserContacts.php";

temp ={"userId": user_id};


const emojis = {
    "Silent": `<svg class="emoji" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.b{fill:#864e20}</style></defs><rect x="1" y="1" width="22" height="22" rx="7.656" style="fill:#f8de40"/><path class="b" d="M7.055 7.313A1.747 1.747 0 1 0 8.8 9.059a1.747 1.747 0 0 0-1.745-1.746zM16.958 7.313A1.747 1.747 0 1 0 18.7 9.059a1.747 1.747 0 0 0-1.742-1.746z"/><path d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" style="fill:#e7c930"/><path class="b" d="m12.991 13.937 1.091-1.09a.555.555 0 0 0 0-.785l-.206-.207a.556.556 0 0 0-.785 0L12 12.946l-1.091-1.091a.556.556 0 0 0-.785 0l-.206.207a.555.555 0 0 0 0 .785l1.091 1.09-1.091 1.091a.555.555 0 0 0 0 .785l.206.207a.556.556 0 0 0 .785 0L12 14.929l1.091 1.091a.556.556 0 0 0 .785 0l.206-.207a.555.555 0 0 0 0-.785z"/></svg>`,
    "Shock":`<svg class="emoji" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.b{fill:#864e20}.c{fill:#e7c930}</style></defs><rect x="1" y="1" width="22" height="22" rx="7.656" style="fill:#f8de40"/><path class="b" d="M12 5.417a2.934 2.934 0 1 0 2.934 2.934A2.935 2.935 0 0 0 12 5.417z"/><path class="c" d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z"/><path class="b" d="M16.083 13.841A5.487 5.487 0 0 0 12 12.091a5.487 5.487 0 0 0-4.083 1.75c-.959 1.292-.147 2.667.885 2.583s2.781-.285 3.2-.285 2.167.2 3.2.285 1.84-1.291.881-2.583z"/><path d="M13.75 14.551c-1.344-.3-1.75.109-1.75.109s-.406-.406-1.75-.109a2.463 2.463 0 0 0-1.65 1.87 1.1 1.1 0 0 0 .207 0c1.031-.083 2.781-.285 3.2-.285s2.167.2 3.2.285a1.1 1.1 0 0 0 .207 0 2.463 2.463 0 0 0-1.664-1.87z" style="fill:#f06880"/><path class="c" d="M13.965 17.2A9.842 9.842 0 0 0 12 16.9a9.842 9.842 0 0 0-1.965.3c-.294.061-.3.3 0 .261S12 17.326 12 17.326s1.663.09 1.965.13.294-.2 0-.256z"/></svg>`,
    "Smirk":`<svg  class="emoji" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.b{fill:#864e20}</style></defs><rect x="1" y="1" width="22" height="22" rx="7.656" style="fill:#f8de40"/><path class="b" d="M12 5.417a2.934 2.934 0 1 0 2.934 2.934A2.935 2.935 0 0 0 12 5.417z"/><path d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" style="fill:#e7c930"/><path class="b" d="M16.53 12.324a8.617 8.617 0 0 1-.494.726 5.59 5.59 0 0 1-1.029 1.058 4.794 4.794 0 0 1-.6.412 1.6 1.6 0 0 1-.162.091c-.055.028-.109.061-.164.09-.115.051-.226.115-.346.163-.26.119-.533.223-.819.329a.231.231 0 0 0 .055.446 3.783 3.783 0 0 0 .979-.022 3.484 3.484 0 0 0 .878-.25 3.718 3.718 0 0 0 .409-.205l.012-.007a4.1 4.1 0 0 0 .379-.26 3.51 3.51 0 0 0 1.1-1.465 3.381 3.381 0 0 0 .222-.871c0-.031.006-.061.009-.092a.231.231 0 0 0-.429-.143z"/></svg>`,
    "Excited": `<svg class="emoji" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.b{fill:#864e20}.e{fill:#e6e7e8}</style></defs><rect x="1" y="1" width="22" height="22" rx="7.656" style="fill:#f8de40"/><path class="b" d="M8.907 9.844a.182.182 0 0 1-.331.1 2.016 2.016 0 0 0-.569-.567 1.731 1.731 0 0 0-1.915 0 2.016 2.016 0 0 0-.571.569.182.182 0 0 1-.331-.1 1.632 1.632 0 0 1 .346-1.023 1.927 1.927 0 0 1 3.026 0 1.64 1.64 0 0 1 .345 1.021zM18.81 9.844a.182.182 0 0 1-.331.1 2.026 2.026 0 0 0-.568-.567 1.732 1.732 0 0 0-1.916 0 2.016 2.016 0 0 0-.571.569.182.182 0 0 1-.331-.1 1.632 1.632 0 0 1 .346-1.023 1.927 1.927 0 0 1 3.026 0 1.64 1.64 0 0 1 .345 1.021z"/><path d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" style="fill:#e7c930"/><path d="M7.127 12h9.746a1.937 1.937 0 0 1 1.937 1.937 1.938 1.938 0 0 1-1.937 1.938H7.127a1.937 1.937 0 0 1-1.937-1.937A1.937 1.937 0 0 1 7.127 12z" style="fill:#fff"/><ellipse class="e" cx="12" cy="13.938" rx="6.188" ry=".25"/><ellipse class="e" cx="7.257" cy="13.938" rx=".208" ry="1.438"/><ellipse class="e" cx="9.628" cy="13.938" rx=".208" ry="1.438"/><ellipse class="e" cx="12" cy="13.938" rx=".208" ry="1.438"/><ellipse class="e" cx="14.372" cy="13.938" rx=".208" ry="1.438"/><ellipse class="e" cx="16.743" cy="13.938" rx=".208" ry="1.438"/></svg>`,
    "GlassesKiss":`<svg  class="emoji" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="7.656" style="fill:#f8de40"/><path d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" style="fill:#e7c930"/><path d="M21.554 5.693c-.063-.289-2.888-.829-4.871-.829a5.584 5.584 0 0 0-3.3.7A3.125 3.125 0 0 1 12 5.919a3.125 3.125 0 0 1-1.381-.352 5.584 5.584 0 0 0-3.3-.7c-1.983 0-4.808.54-4.871.829s-.113 1.217.088 1.381.439.025.477.6.477 2.976 1.808 3.767 3.741.163 4.6-.365A4.3 4.3 0 0 0 11.3 8.568c.138-.892.351-1.507.7-1.507s.565.615.7 1.507a4.3 4.3 0 0 0 1.883 2.51c.854.528 3.264 1.155 4.6.365s1.77-3.189 1.808-3.767.276-.439.477-.6.149-1.095.086-1.383z" style="fill:#101820"/><path d="M13.308 14.129a1.183 1.183 0 0 0 .434-.908 1.34 1.34 0 0 0-.984-1.2.312.312 0 0 0-.414.228v.005a.312.312 0 0 0 .2.355c.215.081.575.269.575.613 0 .425-.5.608-.516.616a.317.317 0 0 0-.21.3.311.311 0 0 0 .226.292.717.717 0 0 1 .5.68c0 .269-.366.453-.584.54a.31.31 0 0 0-.145.119l-.1.024.061.243a.311.311 0 0 0 .412.2c.366-.146.98-.486.98-1.123a1.285 1.285 0 0 0-.435-.984z" style="fill:#864e20"/><path d="M19.1 13.013a1.3 1.3 0 0 0-1.768.1l-.381.382-.382-.381a1.3 1.3 0 0 0-1.768-.1 1.249 1.249 0 0 0-.048 1.813l1.885 1.887a.441.441 0 0 0 .625 0l1.886-1.887a1.25 1.25 0 0 0-.049-1.814z" style="fill:#f06880"/></svg>`,
    "BigFrown":`<svg  class="emoji" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.b{fill:#864e20}.c{fill:#e7c930}</style></defs><rect x="1" y="1" width="22" height="22" rx="7.656" style="fill:#f8de40"/><path class="b" d="M7.055 7.313A1.747 1.747 0 1 0 8.8 9.059a1.747 1.747 0 0 0-1.745-1.746zM16.958 7.313A1.747 1.747 0 1 0 18.7 9.059a1.747 1.747 0 0 0-1.742-1.746z"/><path class="c" d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z"/><ellipse class="b" cx="12" cy="13.375" rx="5.479" ry=".297"/><ellipse class="c" cx="12" cy="14.646" rx="1.969" ry=".229"/></svg>`,
    "GlassesMoustache":`<svg  class="emoji" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="7.656" style="fill:#f8de40"/><path d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" style="fill:#e7c930"/><path d="M19.2 13.794a5.027 5.027 0 0 1-3.035-1.927 2.629 2.629 0 0 0-3.2-.64A2.948 2.948 0 0 0 12 12.379a2.957 2.957 0 0 0-.964-1.152 2.631 2.631 0 0 0-3.2.64A5.024 5.024 0 0 1 4.8 13.794a.441.441 0 0 0-.371.67A3.659 3.659 0 0 0 8 16.264c2.374-.139 3.532-.979 4-1.833.466.854 1.624 1.694 4 1.833a3.661 3.661 0 0 0 3.58-1.812.439.439 0 0 0-.38-.658z" style="fill:#864e20"/><path d="M21.554 5.693c-.063-.289-2.888-.829-4.871-.829a5.584 5.584 0 0 0-3.3.7A3.125 3.125 0 0 1 12 5.919a3.125 3.125 0 0 1-1.381-.352 5.584 5.584 0 0 0-3.3-.7c-1.983 0-4.808.54-4.871.829s-.113 1.217.088 1.381.439.025.477.6.477 2.976 1.808 3.767 3.741.163 4.6-.365A4.3 4.3 0 0 0 11.3 8.568c.138-.892.351-1.507.7-1.507s.565.615.7 1.507a4.3 4.3 0 0 0 1.883 2.51c.854.528 3.264 1.155 4.6.365s1.77-3.189 1.808-3.767.276-.439.477-.6.149-1.095.086-1.383z" style="fill:#101820"/></svg>`
}
let jsonObject = "";
const table = document.getElementById("t-body");


postData(url,temp).then((data)=>
{   
    jsonObject = data;
   
   
    for(let i in jsonObject){
        fill_in_table(jsonObject[i],table);
    }
    
});


// After button clicked, sends a request to Search API
$("#search-btn").click(function(){

    const input = document.getElementById("search-input").value;
    clear_screen();

    url = "https://cardboardmc.com/LAMPAPI/Search.php";
    
    
    temp = {"userId" : user_id, "query": input};
    let contacts_array = "";

    postData(url,temp).then((data)=>
    {   
        
        if(data.error !='Could not find any contacts.'){
            contacts_array = data;
            display(contacts_array);
        }else{
            console.log("Could not find any contacts.");
        }
        
    }).catch((e)=>{
        console.log(e);
    });


});





$("#trash-icon").click(function(event){

    event.preventDefault();
    
    let searchIDs = $("input:checkbox:checked").map(function(){
        return $(this).val();
    }).toArray();

    if(searchIDs!=0)
    {
        $("#delete-btn").click(function()
        {
            searchIDs = $("input:checkbox:checked").map(function(){
                return Number($(this).val());
            }).toArray();
            url ="https://cardboardmc.com/LAMPAPI/DeleteContact.php";
            
         
                
            delete_list(url, searchIDs).then(()=>$("#warning-modal").modal("hide")).catch();
        });
        
        

    }else{
        $("#warning-modal").modal("hide");

    }

    
});




$('#userinfo').on('show.bs.modal', function (event) 
    {
        let emoji_name = "BigFrown";
        let emoji_index = 0;

        //The emoji svg image is clicked
        $("#emoji-profile").click(function()
        {
            emoji_index = emoji_index<7?emoji_index:0;

            emoji_name = Object.keys(emojis)[emoji_index];

            $("#emoji-profile").html(emojis[emoji_name]);
            
            emoji_index++;
            
        });

        
        let button = $(event.relatedTarget); 
        let contact_user_id = button.attr("id");

        //The edit button is clicked
        if(button.attr('id') != "create-btn"){

        
            
            emoji_name = $(`#t-row${contact_user_id}`).find("p").attr("value");
            
            
            $("#emoji-profile").html(emojis[emoji_name]);
            
            $("#first").val($(`#t-row${contact_user_id}`).find(".r-first").text());
            $("#last").val($(`#t-row${contact_user_id}`).find(".r-last").text());
            $("#phone").val($(`#t-row${contact_user_id}`).find(".r-phone").text());
            $("#email").val($(`#t-row${contact_user_id}`).find(".r-email").text());
            $("#address").val($(`#t-row${contact_user_id}`).find(".r-address").text());
            $("#age").val($(`#t-row${contact_user_id}`).find(".r-age").text());
            $('#birth').val($(`#t-row${contact_user_id}`).find(".r-birth").text());
 
            
        }    

        if(button.attr("id")=='create-btn'){
            $("#emoji-profile").html(emojis["BigFrown"]);

        }

        $("form").off().on("submit", function(event){

            if($("#first").val() != 0 && $("#last").val()!=0 ){
                let get_contact_info = {
                    "contactId": contact_user_id,
                    "firstName": $("#first").val(),
                    "lastName": $("#last").val(),
                    "phone":  $("#phone").val(),
                    "email": $("#email").val(),
                    "address": $("#address").val(),
                    "age": $("#age").val(),
                    "birthday": $('#birth').val(),
                    "emoji": emoji_name,
                    "userId": user_id
                }
                //creates contact user
                if(button.attr('id') == "create-btn"){
                   
                    url = "https://cardboardmc.com/LAMPAPI/CreateContact.php";     
                    
                    postData(url,get_contact_info).then((data)=>{   
                  
                        let get_contact_info = {
                           
                            "FirstName": $("#first").val(),
                            "LastName": $("#last").val(),
                            "Phone":  $("#phone").val(),
                            "Email": $("#email").val(),
                            "Address": $("#address").val(),
                            "Age": $("#age").val(),
                            "Birthday": $('#birth').val(),
                            "Emoji": emoji_name,
                            "ID": data.id

                        }
                       
                        fill_in_table(get_contact_info,table);
                        
                        
    
                    }).then(()=>
                    {
                        $("#userinfo").modal('hide');
                    }).catch((e)=>
                    {
                        console.log(e);
                    });
                
                }else{
                    // edits contact user
       
                    url = "https://cardboardmc.com/LAMPAPI/UpdateContact.php";     
                
                    
                    postData(url,get_contact_info).then((data)=>{   
                        //changes the text inside the table
                        $(`#t-row${contact_user_id}`).find("p").html(emojis[emoji_name]);
                        $(`#t-row${contact_user_id}`).find(".r-first").text(get_contact_info.firstName);
                        $(`#t-row${contact_user_id}`).find(".r-last").text(get_contact_info.lastName);
                        $(`#t-row${contact_user_id}`).find(".r-phone").text(get_contact_info.phone);
                        $(`#t-row${contact_user_id}`).find(".r-email").text(get_contact_info.email);
                        $(`#t-row${contact_user_id}`).find(".r-address").text(get_contact_info.address);
                        $(`#t-row${contact_user_id}`).find(".r-age").text(get_contact_info.age);
                        $(`#t-row${contact_user_id}`).find(".r-birth").text(get_contact_info.birthday);


                    }).then(()=>{
                        $("#userinfo").modal('hide');
                    }).catch((e)=>{
                    
                    });


                }
               
            }else{
               $( "span" ).text( "Missing required field(s)." ).show().fadeOut( 8000 );
            }
            event.preventDefault();
            
        });
//         $('#save-btn').click(function(event)
//         {




    });
    
    $('#userinfo').on('hidden.bs.modal', function () {
        
        $(this).find('input').val('');
        
    });

    //prevents non-integer input
    $('#phone').on('keypress', function(e){
        return e.metaKey || // cmd/ctrl
        e.which <= 0 || // arrow keys
        e.which == 8 || // delete key
        /[0-9]/.test(String.fromCharCode(e.which)); // numbers
    });

    //prevents non-integer input
    $('#age').on('keypress', function(e){
        return e.metaKey || 
        e.which <= 0 ||
        e.which == 8 || 
        /[0-9]/.test(String.fromCharCode(e.which)); // numbers
    })



//Standard format for each contact user
function fill_in_table(jsonObject,table){

    if(!(jsonObject.Emoji in emojis)){
        jsonObject.Emoji = "BigFrown";
    }
	let html= `<tr id=t-row${jsonObject.ID}>
                    <td>     
                        <div class="div d-flex justify-content-center mt-2">
                        <input class="form-check-input" type="checkbox" value="${jsonObject.ID? jsonObject.ID : "#"}" style="height: 20px;width: 20px;">
                        </div>
                    </td>
                    <td><p class="text-center" value = "${jsonObject.Emoji}">${emojis[jsonObject.Emoji]}</p></td>
                    <td class="text-center"><div class="r-first">${jsonObject.FirstName?jsonObject.FirstName:""}</div><div class="r-last">${jsonObject.LastName?jsonObject.LastName: ""}</div></td>
                        <td class="text-center r-birth">${jsonObject.Birthday?jsonObject.Birthday:"#"}</td>
                        <td class="text-center r-phone">${jsonObject.Phone?jsonObject.Phone:"#"}</td>
                        <td class="text-center r-address">${jsonObject.Address?jsonObject.Address:"#"}</td>
                        <td class="text-center r-email" >${jsonObject.Email?jsonObject.Email:"#"}</td>
                        <td class="text-center r-age">${jsonObject.Age?jsonObject.Age:"#"}</td>
                        <td class= "text-center ">
                        <button type="button" class="btn btn-primary rounded edit-btn" data-bs-toggle="modal" data-bs-target="#userinfo" id = ${jsonObject.ID}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"></path>
                                </svg>
                        </button>
                        </td>
            </tr>`
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



async function delete_list(url, searchIDs) {


    const result = []
    for (let i = 0; i < searchIDs.length; i++) {

        let temp = {"contactId": searchIDs[i]};
      
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
			body: JSON.stringify(temp), 
		});
        const data = await response.json()

        if(data.msg ==="The contact was deleted from the database."){
           

            $(`#t-row${searchIDs[i]}`).fadeOut("slow", function() {
                $(this).remove();
            });
        }
        result.push(data);


    }

    return result;

}

