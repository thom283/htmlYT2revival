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
	let channelId = getParameterByName('channelId')
}
function playlist(playlistid) {

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
