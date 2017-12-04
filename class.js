
//for tha ajax
var request = new XMLHttpRequest();

var AJAX = function(){
}

//the finish state
AJAX.prototype.onLoad = function(success, error) {

	request.onreadystatechange = function(event){
		if(this.readyState == XMLHttpRequest.DONE){
			if(this.status === 200){
				success(this.response)
			}else{
				error([this.status, this.statusText]);
			}
		}
	}
};
//the request progression
AJAX.prototype.onProgess = function(event) {
	if(event.lengthComputable){
		return currentPercent = (event.loaded / event.total)*100;
	}else{
		return false;
	}
};

/*
* @params METHOD the request method string
* @params URL the request url string
* @params error the function to be execute if error
* @params success the function to be execute if success
*/
AJAX.prototype.send = function(METHOD, URL, error, success) {
	request.open(METHOD, URL, true);
	request.onprogess = this.onProgess;
	request.onload = this.onLoad(success, error);
	request.send(null);
};

//for the DOM

var DOM = function(id){
	this.identifiers = document.querySelector(id);
}
DOM.prototype.html = function(value) {
	this.identifiers.innerHTML = value;
};
DOM.prototype.fadeIn = function() {
	this.identifiers.className = 'visible-transition';
};

DOM.prototype.fadeOut = function() {
	this.identifiers.className = 'hidden-transition';
};

DOM.prototype.click = function(fn) {
	this.identifiers.addEventListener("click", fn);
};

DOM.prototype.css = function(style) {
	this.identifiers.style = style;
};