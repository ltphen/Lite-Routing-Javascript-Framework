# Lite-Routing-Javascript-Framework

a simple lite routing framework in javacsript for single page applications
<p>
this is the simple framework usage <br>
1- into your html file set the receiver div by giving him the #views id<br>
2-setInitialPath manuely or programaticaly with the setInitialPath method<br>
3- then define routes as define below<br>
4- add linked as <a href="#extraction">link</a><br>
then enjoy the framework
</p>
<pre>
<code>
    var route = new Routing();
      route.setInitialPath("./partials");
      route.when("hash", "path/to/file.html", callbackFunction)
        .run();
    window.onpopstate = function(){
       route.run();
    }
</code>
</pre>
<h4>for the helper class very simple</h4>
<p>

this is the simple framework usage <br>
1- for the AJAX requester<br>
you just have to do this<br>
var a = new AJAX();<br>
a.send(METHOD(POST, GET), url, errorCallback, successCallback)<br>
2-for the DOM<br>
var d = new DOM(identifier(#myId, .myClass, p))<br>
d.css for css setting<br>
d.click for click event <br>
d. ...<br>
</p>
