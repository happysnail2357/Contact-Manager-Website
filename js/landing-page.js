
//Gets UserId
let result = (document.cookie).match(/userId=(\d+),/)
const user_id =Number(result[1]);




let jsonObject = "";

let state = 
{
    'querySet': [],
    'page':1,
    "rows":3,
};

let currentpage= 1;
let MAX_PAGE = 1;

url = "https://cardboardmc.com/LAMPAPI/GetContacts.php";

const temp ={"userId": user_id};
postData(url, temp).then(data=>
    {
        state.querySet = data;
        
        buttonVisibility(currentpage);

        buildTable();


    }
)




const emojis = {
   
   "beluga": `<img src="images/beluga.svg" alt="">`,
   "boat":`<img src="images/boat.svg" alt="">`,
   "coral":`<img src="images/coral.svg" alt="">`,
   "crab":`<img src="images/crab.svg" alt="">`,
   "dolphin":`<img src="images/dolphin.svg" alt="">`,
   "fish":`<img src="images/fish.svg" alt="">`,
   "fish2":`<img src="images/fish2.svg" alt="">`,
   "jellyfish":`<img src="images/jellyfish.svg" alt="">`,
   "orca":`<img src="images/orca.svg" alt="">`,
   "orcasprout":`<img src="images/orcasprout.svg" alt="">`,
   "sailing":`<img src="images/sailing.svg" alt="">`,
   "sandal":`<img src="images/sandal.svg" alt="">`,
   "shark":`<img src="images/shark.svg" alt="">`,
   "surfer":`<img src="images/surfer.svg" alt="">`,
   "smiley": `<img src="images/smiley.svg" alt="">`,
   "umbrella":`<img src="images/umbrella.svg" alt="">`,
   "whale":`<img src="images/whale.svg" alt="">`,
   "whalesprout":`<img src="images/whalesprout.svg" alt="">`,
}

const emoji_length = Object.keys(emojis).length;

const table = document.getElementById("t-body");


$(document).ready(function(){

    $("#right").on("click", function(){

    
        currentpage++;
        $("#t-body").empty();
        state.page = currentpage;
        buildTable();
    
        buttonVisibility(currentpage);
       
    
    
    });

    $("#right").click();

    $("#left").on("click", function(){

        currentpage--;
        $("#t-body").empty();
        state.page = currentpage;
        buildTable();
        buttonVisibility(currentpage);
  
    
    });
    $("#left").click();


});




function pagination(querySet, page, rows){
    let trimStart = (page-1)*rows;
    let trimEnd = trimStart+rows;

    let trimmedData = querySet.slice(trimStart,trimEnd);
    let pages = Math.ceil(querySet.length/rows);

    return{
        'querySet':trimmedData,
        'pages':pages
    }
}


function buildTable(){
   
    data = pagination(state.querySet, state.page, state.rows);
    let list = data.querySet;


    for(i in list){
        fill_in_table(list[i],table);
        
    }
}



function pagination(querySet, page, rows){
    let trimStart = (page-1)*rows;
    let trimEnd = trimStart+rows;

    let trimmedData = querySet.slice(trimStart,trimEnd);
    let pages = Math.ceil(querySet.length/rows);

    return{
        'querySet':trimmedData,
        'pages':pages
    }
}








// After button clicked, sends a request to Search API
$("#search-input").on( "keyup change",function()
{

    let input = $(this).val();
 

    if(input.length != 0){

       
        url = "https://cardboardmc.com/LAMPAPI/Search.php";
        
        
        let search_json = {"userId" : user_id, "query": input};
    
        postData(url,search_json).then((data)=>
        {   
            
            $("#t-body").empty();
           
            if(data.error !='Could not find any contacts.'){



                state.querySet = data;

                buildTable();
            }else{
                
                currentpage =1;
                state.page = currentpage;
                MAX_PAGE =1;
                state.querySet = "";
            }
            buttonVisibility(currentpage);
           
            
        }).catch((e)=>{
            console.log("search api " + e);
            currentpage = 1;
            state.querySet = "";
            $("#t-body").empty();
            buttonVisibility(currentpage);

        });
    }
    else{
        
   
        url = "https://cardboardmc.com/LAMPAPI/GetContacts.php";
        postData(url, temp).then(data=>
        {
                $("#t-body").empty();
                currentpage =1;
                state.page = currentpage;
                state.querySet = data;

                buildTable();
                buttonVisibility(currentpage);

        }
        ).catch((e)=>
        {
            console.log("get contact api "+e);
        });
    }


});





$("#trash-icon").click(function(event){

    event.preventDefault();
    
    let searchIDs = $("input:checkbox:checked").map(function()
    {
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
            
            delete_list(url, searchIDs).then(()=>
            {

                for(i of searchIDs){
                    let index = state.querySet.findIndex(item => item.ID == i);
                 
                    state.querySet.splice(index,1);
                }

                buttonVisibility(currentpage);
                
                $("#t-body").empty();
                buildTable(); 
                $("#warning-modal").modal("hide");


            }).catch();
        });
        
        

    }else{
        $("#warning-modal").modal("hide");

    }

    
});




$('#userinfo').on('show.bs.modal', function (event) 
    {
        let emoji_name = "smiley";
        let emoji_index = 0;

        //The emoji svg image is clicked
        $("#emoji-profile").click(function()
        {
            
            emoji_index = emoji_index< emoji_length ?emoji_index:0;

            emoji_name = Object.keys(emojis)[emoji_index];

            $("#emoji-profile").html(emojis[emoji_name]);
            
            emoji_index++;
            
        });

        
        let button = $(event.relatedTarget); 
        let contact_user_id = button.attr("id");

        //Fills the data edit button is clicked
        if(button.attr('id') != "create-btn"){

        
            
            emoji_name = $(`#t-row${contact_user_id}`).find("p").attr("value");
            $("#phone").text()


            $("#emoji-profile").html(emojis[emoji_name]);
            
            $("#first").val($(`#t-row${contact_user_id}`).find(".r-first").text());
            $("#last").val($(`#t-row${contact_user_id}`).find(".r-last").text());
            $("#phone").val($(`#t-row${contact_user_id}`).find(".r-phone").text().replace(/[^0-9]/g, ""));
            $("#email").val($(`#t-row${contact_user_id}`).find(".r-email").text());
            $("#address").val($(`#t-row${contact_user_id}`).find(".r-address").text());
            $("#age").val($(`#t-row${contact_user_id}`).find(".r-age").text());
            $('#birth').val($(`#t-row${contact_user_id}`).find(".r-birth").text());
 
            
        }    

        if(button.attr("id")=='create-btn'){
            $("#emoji-profile").html(emojis["smiley"]);

        }


        $("form").off().on("submit", function(event){
            if($("#first").val() == 0 || $("#last").val() ==0 )
            {
                
                $( ".modal-footer span" ).text( "Missing required field(s)." ).show().fadeOut( 8000 );
            }else if($("#phone").val()>0 && $("#phone").val()<10){
                $( ".modal-footer span" ).text( "Invalid phone number." ).show().fadeOut( 8000 );

            }else{
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
                  
                        get_contact_info = {
                           
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
                        $("#t-body").empty();
                       
                        
                        state.querySet.unshift(get_contact_info);
                        currentpage =1;
                        buttonVisibility(currentpage);
                        state.page =currentpage;
                        buildTable();     
                    

    
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
                
                    
                    postData(url,get_contact_info).then(()=>
                    {
                        $("#userinfo").modal('hide');

                        let get_contact_info = {
                            
                            "FirstName": $("#first").val(),
                            "LastName": $("#last").val(),
                            "Phone":  $("#phone").val(),
                            "Email": $("#email").val(),
                            "Address": $("#address").val(),
                            "Age": $("#age").val(),
                            "Birthday": $('#birth').val(),
                            "Emoji": emoji_name,
                            "ID": contact_user_id
                        }

                       
                        let obj = state.querySet.find((o, i) => {
                            if (o.ID == get_contact_info.ID) {
                                state.querySet[i] =get_contact_info;
                                
                                return true; // stop searching
                            }
                        });

                        $("#t-body").empty();
                        state.page = currentpage;
                        buildTable();


                    }).catch((e)=>{
                    
                    });


                }
               
            }
            event.preventDefault();
            
        });



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
        jsonObject.Emoji = "smiley";
    }
	let html= `<tr id=t-row${jsonObject.ID}>
                    <td>     
                        <div class="div d-flex justify-content-center mt-2">
                        <input class="form-check-input" type="checkbox" value="${jsonObject.ID? jsonObject.ID : "#"}" style="height: 20px;width: 20px;">
                        </div>
                    </td>
                    <td><p class="text-center" value = "${jsonObject.Emoji}">${emojis[jsonObject.Emoji]}</p></td>
                    <td class="text-center"><div class="r-first">${jsonObject.FirstName?jsonObject.FirstName:""}</div><div class="r-last">${jsonObject.LastName?jsonObject.LastName: ""}</div></td>
                        <td class="text-center r-birth">${jsonObject.Birthday?jsonObject.Birthday:""}</td>
                        <td class="text-center r-phone">${jsonObject.Phone?phoneNumberFormat(jsonObject.Phone):""}</td>
                        <td class="text-center r-address">${jsonObject.Address?jsonObject.Address:""}</td>
                        <td class="text-center r-email" >${jsonObject.Email?jsonObject.Email:""}</td>
                        <td class="text-center r-age">${jsonObject.Age?jsonObject.Age:""}</td>
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

function phoneNumberFormat(string){
	if(string.length !=10){
        
		return "";
	}
	return `(${string.substring(0,3)}) - ${string.substring(3,6)} - ${string.substring(6,10)}`
}



$("#delete-btn-user").click(function(){
    let url = "https://cardboardmc.com/LAMPAPI/DeleteUser.php";

    const object ={
        "userId":user_id
    }
    postData(url,object).then(()=>{
        doLogout();
    });
});



function doLogout()
{
	document.cookie = "";
	window.location.href = "index.html";
}


function buttonVisibility(currentpage){

    let MAX_PAGE = Math.ceil(state.querySet.length/state.rows);

    if(MAX_PAGE ==0){
        MAX_PAGE =1;
    }
    if(currentpage ==MAX_PAGE){
        $("#right").addClass("d-none");

    }else{
        $("#right").removeClass("d-none");

    }

    if(currentpage ==1){
        $("#left").addClass("d-none");

    }else{
        $("#left").removeClass("d-none");

    }
}