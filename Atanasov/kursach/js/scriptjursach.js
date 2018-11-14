document.getElementById("showMenu").addEventListener("click", function() {
	event.preventDefault();
	document.getElementById("overlay").classList.add("show")
} )
document.getElementById("buttonOverlayClose").addEventListener("click", function() {
	event.preventDefault();
	document.getElementById("overlay").classList.remove("show")
} )

document.getElementById("showMenu").addEventListener("click", function() {
	document.getElementById("mainBlur").classList.add("mainBlurShow")
} )
document.getElementById("buttonOverlayClose").addEventListener("click", function() {
	document.getElementById("mainBlur").classList.remove("mainBlurShow")
} )