	

	// js

	setTimeout(function(){
		function addBlocEvents(){
			var blocs = document.querySelectorAll('.great-bloc');
			for (var i = blocs.length - 1; i >= 0; i--) {
				blocs[i].addEventListener('click', function(){
					window.location.href = "#"+this.getAttribute('data-url');	
				})
			}
		}

		function addTextareaEvents(){
			var textarea = document.querySelectorAll(".form-field");

			for (var i = textarea.length - 1; i >= 0; i--) {
				textarea[i].addEventListener('focus', function(){
					//this.style.position = "absolute";
				});
			}

			// gerer after
			
			var dropdowns = document.querySelectorAll(".dropdown-header");
			for (var i = dropdowns.length - 1; i >= 0; i--) {
				dropdowns[i].onclick = function(){
					if(document.querySelector(".dropdown-main").style.display == "none"){
						document.querySelector(".dropdown-main").style.display = "block";
					}else{
						document.querySelector(".dropdown-main").style.display = "none";
					}
				}
			}

		}


		function LearnFileGestion(inputText, inputFile){

			var file = inputFile.files[0];

				var reader = new FileReader();

				reader.addEventListener('load', function()
				{
					inputText.value = reader.result;
				}, false);

				reader.readAsText(file);

		}

		////////////////////////////////// IA /////////////////////////////////

		function addLearnEvents(){

			///////////////////// events //////////////////////////
			var file = document.querySelector("#file_input");
			var loadBtn = document.querySelector("#learn-load");
			// ia
			loadBtn.addEventListener("click", function(){
				file.click();
			});
			file.addEventListener('change', function(){
				LearnFileGestion(document.querySelector("#learn-input"), file);
			})
			var fields = [document.querySelector("#learn-pre")
			, document.querySelector("#learn-target")
			, document.querySelector("#learn-post")
			, document.querySelector("#learn-others")
			];
			var probability = {
					pre : {
						post : 0,
						target : 0,
						pre : 0,
						others : 0,
					},
					post : {
						post : 0,
						target : 0,
						pre : 0,
						others : 0,
					},
					target : {
						post : 0,
						target : 0,
						pre : 0,
						others : 0,
					},
					others : {
						post : 0,
						target : 0,
						pre : 0,
						others : 0,
					}
				};
			if (localStorage.getItem("generalParams") == null) {
				var generalParams = probability;
			}else{
				console.log("general params have been found in this storage");
				var generalParams = JSON.parse(localStorage.getItem("generalParams"));
			}
			var params = {
				pre : [],
				post : [],
				target : [],
				others : []
			};
			var hiddenParams = {
				pre : {
					items : [],
					length : 0
				},
				post : {
					items : [],
					length : 0
				},
				target : {
					items : [],
					length : 0
				},
				others : {
					items : [],
					length : 0
				}
			};

			var hiddenParamsProbability = {
				pre : {
					items : [],
				},
				post : {
					items : [],
				},
				target : {
					items : [],
				},
				others : {
					items : [],
				}
			};

			if (localStorage.getItem("hiddenModel") == null) {
				var hiddenModel = hiddenParams;		
			}else{
				console.log(" hidden model have been found in this storage");
				var hiddenModel = JSON.parse(localStorage.getItem("hiddenModel"));
			}
			var btns = {
				configure : document.querySelector("#learn-configure"),
				update : document.querySelector("#learn-update")
			};
			var model = ["pre", "post", "target", "others"];
			var textarea = document.querySelector("#learn-input");
			var output = document.querySelector("#viewer-zone");

			var numParameters = {	
				generalParams : generalParams,
				probability : probability,
				initialParams : {
					pre:1,
					target: 0,
					post : 0,
					others : 0
				}
			};
			var identifiers = {
					params : params,
					hiddenModel : hiddenModel,
					hiddenParamsProbability : hiddenParamsProbability
				};
			var uneticatedState = "target";

			var ia = new IA(identifiers, model, numParameters, uneticatedState);
			ia.learn(fields, btns, textarea, output);
			
			var extract = document.querySelector("#learn-extract");
			extract.onclick = function(){
				ia.extract(textarea.value);
			}

			function changeConfigValue(input){
				var newValue;
				newValue = parseFloat(prompt("Veuillez entrer la nouvelle valeur"));
				if (newValue > 1) {
					alert('impossible ');
				}
				else{
					input.innerHTML= newValue;
				}

			}
		}


		//////////////////////////////////////////Routing///////////////////////////////////////////////

		var route = new Routing();


		route.when("extraction", "extraction.html", addTextareaEvents)
			 .when("inscription", "inscription.html")
			 .when("connexion", "connexion.html")
			 .when("learning", "learning.html", addLearnEvents)
			 .when(undefined, "home.html", addBlocEvents)
			 .when("home", "home.html", addBlocEvents)
			 .when("404", "404.html", addBlocEvents)
			 .run();


		window.onpopstate = function(){
			route.run();
		}

	}, 500)



	function helping(){

		var req = new AJAX();
		var receiver =  new DOM('#receiver');
		receiver.css("display : block");
		receiver.fadeOut();
		function error(data){
			console.log("error");
			receiver.fadeIn();
			console.log(data);
		}

		function success(data){
			console.log("success");
			receiver.html(data);
			document.body.style.overflow = 'hidden';
			//setTimeout(function(){
				console.log(receiver);
				receiver.fadeIn();
			//}, 1000);
			var skip =  new DOM('.skip-btn');
			var next =  new DOM('.next-btn');
			skip.click(function(){
				receiver.fadeOut();
				document.body.style.overflow = 'auto';
				setTimeout(function(){
					receiver.css("display : none");
				}, 1000);

			});
			next.click(function(){
				req.send('GET', "./partials/welcome-2.html",error, success);
			});
		}
		req.send('GET', "./partials/welcome.html",error, success);
	}	

	if(localStorage.getItem('firstLaunch') == null){
		setTimeout(function(){
			helping();
		}, 3000);
		localStorage.setItem('firstLaunch', true);
	}
