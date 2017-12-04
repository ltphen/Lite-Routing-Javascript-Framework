var Routing = function(){
	this.initialPath = "./partials/";
	this.views = document.querySelector('#views');
	this.request = new AJAX();
	this.Routes = [];
	this.currents = [];
}


Routing.prototype.when = function(url, page, fn) {
	page = this.initialPath + page;
	this.Routes.push({url : url, page : page, fn : fn});
	return this;
};

Routing.prototype.run = function() {
	var page = this.find(this.getUrl());
	if(page){
		this.execute(page);
	}else{
		this.otherwise();
	}
};

Routing.prototype.getUrl = function() {
	var url = window.location.href.split("#");
	if(url.length > 0){
		return url[1];
	}
	else{
		return null;
	}
};

Routing.prototype.watch = function() {
	if(this.currents.length == 0){
		this.currents.push(this.getUrl);
	}
};

Routing.prototype.find = function(url) {
	for (var i = this.Routes.length - 1; i >= 0; i--) {
		if(this.Routes[i].url == url){
			return {page : this.Routes[i].page, fn : this.Routes[i].fn};
		}
	}

	return false;	
};
Routing.prototype.execute = function(data) {
	this.request.send("GET", data.page, function(errors){
		alert(errors);
	}, function(requestData){
		this.views.innerHTML = requestData;
		if(data.fn != undefined) data.fn();
	});
};

Routing.prototype.setInitialPath = function(path) {
	this.initialPath = path;
};

Routing.prototype.otherwise = function(otherwise) {
	this.otherwiseVariable = otherwise;
};

Routing.prototype.otherwise = function() {
	if (this.otherwiseVariable) {
		this.otherwiseVariable();
	}else{
		alert("404 not found");
	}
};
