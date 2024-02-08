
function pageTransition(pagename)
{
	setTimeout(changePage, 1000, pagename);

	fadable = document.getElementsByClassName("fade-me-in");

	for (let i = 0; i < fadable.length; i++)
	{
		//fadable[i].classList.remove("fade-me-in");
		fadable[i].classList.add("fade-me-out");
	}
}

function changePage(pagename)
{
	window.location.href = pagename;
}
