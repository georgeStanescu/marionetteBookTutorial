var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: "#main-region",
  dialogRegion: "#dialog-region"
});

//navigate doesn’t just change the URL fragment, it also adds the new URL to the browser’s history. 
//This, in turn, makes the browser’s “back” and “forward” buttons behave as expected
ContactManager.navigate = function(route, options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function(){
  return Backbone.history.fragment
};

//we can only start Backbone’s routing (via the history attribute) 
//once all initializers have been run, to ensure the routing controllers are ready to respond to routing events
ContactManager.on("initialize:after", function(){
  if(Backbone.history){
    Backbone.history.start();
    	//When using pushState :Backbone.history.start({pushState: true});, 
    	//URL fragments look like the usual “/contacts/3” instead of “#contacts/3”
    	//to use pushState in your application your server has to respond to that URL
    
    //if the user comes to our app at the root URL, let’s redirect him to “#contacts”
    //this is done by using the ContactManager.getCurrentRoute()
    if(this.getCurrentRoute() === ""){

    	//Backbone.history.navigate("contacts"); //updating the URL with the proper fragment
    	//ContactManager.ContactsApp.List.Controller.listContacts(); //executing the proper controller action, displaying the right view
    		//the first two lines can be replaced by: Backbone.history.navigate("contacts", {trigger: true});
    		//	or by the next two lines:

    	//this.navigate("contacts"); //equivalent to ContactManager.navigate("contacts");
    	//ContactManager.ContactsApp.List.Controller.listContacts();
    		//replaced by:

      	ContactManager.trigger("contacts:list");
    }
  }
});
