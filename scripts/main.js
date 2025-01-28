//settings
let glype = localStorage.getItem('glype');
let apikey = localStorage.getItem('key');
if (!glype) {
	localStorage.setItem('glype', 'https://api.cors.lol/?url=');
	glype = localStorage.getItem('glype');
}
if (!apikey) {
	localStorage.setItem('key','AIzaSyAFfAXy_qKdeCY7ypwDbLA63HbCuilVvHU');
	apikey = localStorage.getItem('key');
}

//per page fns
function trends(region) {
	//alert(region);
	let xhr = new XMLHttpRequest();
	xhr.open('GET', glype+encodeURIComponent('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode='+region+'&key='+apikey), true);
	xhr.send();
	xhr.onload = function() {
		var response = xhr.responseText;
		let videolist = document.getElementById('videobits');
		response.forEach(function(entry){
			videolist+=entry.kind;
		});
	}
}
function video() {
	let videoid = getParameterByName('id');
}
function search() {
	let query = getParameterByName('searchField');
	let sort = getParameterByName('sort');
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

//stolen scripts

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
