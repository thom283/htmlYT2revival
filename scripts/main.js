//settings
let glype = localStorage.getItem('glype');
let invidious = localStorage.getItem('invidious');
if (!glype) {
	localStorage.setItem('glype', 'https://nnp.nnchan.ru/glype/browse.php?u=');
	glype = localStorage.getItem('glype');
}
if (!invidious) {
	localStorage.setItem('invidious', 'https://inv.nadeko.net/');
	invidious = localStorage.getItem('invidious');
}

//per page fns
function trends(region) {
	//alert(region);
}
function video() {
	let videoid = getParameterByName('id');
}
function search() {
	let query = getParameterByName('searchField');
	let encquery = encodeURIComponent(query);
	let containerQuery = document.getElementById('containerQuery');
	containerQuery.innerHTML = query;
	//alert(encquery);
}
function channel() {
	let channelId = getParameterByName('channelId');
}
function playlist() {
	let playlistId = getParameterByName('playlistId');
}
function showPopup() {
	let popup = document.getElementById('popup');
	let wrapper = document.getElementById('wrapper');
	popup.style.display = "block";
	wrapper.style.display = "none";
}
function hidePopup() {
	let popup = document.getElementById('popup');
	let wrapper = document.getElementById('wrapper');
	wrapper.style.display = "block";
	popup.style.display = "none";
}

//stealed scripts

//urlparser
function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//tab manager
function openTab(evt, tabName) {
	var i, tabcontent, tablinks;

	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

//spoiler
window.acc=(e)=>{
	let q=document.querySelectorAll(".acc"),
	w=document.querySelectorAll(".accD");
	q.forEach((e2,l)=>{
		if(e==e2){
			if(!e.classList.contains("accCl")){
				e.classList.add("accCl");
				w[l].classList.remove("dn")
			}else{
				e.classList.remove("accCl");
				w[l].classList.add("dn")
			}
		}

	})
};
