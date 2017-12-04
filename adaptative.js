
		//////////////////////////////////////////Routing///////////////////////////////////////////////
/*
this is the simple framework usage 
1- into your html file set the receiver div by giving him the #views id
2-setInitialPath manuely or programaticaly with the setInitialPath method
3- then define routes as define below
4- add linked as <a href="#extraction">link</a>
then enjoy the framework
*/

		var route = new Routing();

// extraction represent the hash part of the url . extraction.html represent the file name when wha have set the filePath via route.setFilePath, and addTextareaEvent represent the function to be execute after page loading
			route.setInitialPath("./partials");
			route.when("extraction", "extraction.html", addTextareaEvents)
			 .when("inscription", "inscription.html")
			 .when("connexion", "connexion.html")
			 .when("learning", "learning.html", addLearnEvents)
// represent the default route
			 .when(undefined, "home.html", addBlocEvents)
			 .when("home", "home.html", addBlocEvents)
			 .when("404", "404.html", addBlocEvents)
			 .run();


		window.onpopstate = function(){
			route.run();
		}


///////////////class HElper Usage /////////////////
/*
this is the simple framework usage 
1- for the AJAX requester
you just have to do this
var a = new AJAX();
a.send(METHOD(POST, GET), url, errorCallback, successCallback)
2-for the DOM
var d = new DOM(identifier(#myId, .myClass, p))
d.css for css setting
d.click for click event 
d. ...

*/
//		simple ajax sender without parameters
		var req = new AJAX();
// a simple DOM initializer	
		var receiver =  new DOM('#receiver');
// seting cs property		
		receiver.css("display : block");
// fading out		
		receiver.fadeOut();
		
		function error(data){
			console.log("error");
			receiver.fadeIn();
			console.log(data);
		}

		function success(data){
			
			receiver.html(data);
			
			var skip =  new DOM('.skip-btn');
			var next =  new DOM('.next-btn');
// adding click event on a DOM object
			skip.click(function(){
				receiver.fadeOut();
				document.body.style.overflow = 'auto';
				setTimeout(function(){
					receiver.css("display : none");
				}, 1000);

			});
			next.click(function(){
				req.send('GET', "path/tp/file",error, success);
			});
		}
		// sending a request
		req.send('GET', "path/to/file",error, success);
