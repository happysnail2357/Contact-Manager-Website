
function pageTransition(pagename, id) {
	setTimeout(changePage, 1000, pagename);

	textblock = document.getElementById(id);

	if (textblock) {
		textblock.classList.remove("fade-me-in");
		textblock.classList.add("fade-me-out");
	}
}

function changePage(pagename) {
	window.location.href = pagename;
}
