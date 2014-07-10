//we’re defining the router within the ContactsApp module 
//because it will handle the routes for all the sub-modules attached to ContactsApp (such as List, Show, etc.)
ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
  //We attach a Router instance containing an appRoutes object 
  //associating the URL fragments on the left with callback methods on the right.
  ContactsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
    	//list contacts function specified in the appRoutes object above must exist in the router’s controller (API)
      	"contacts": "listContacts",
      	"contacts/:id": "showContact"
    }
  });
   
  //we define public methods within an API object, which is provided to the router during instantiation   
  var API = {
    listContacts: function(){
      	ContactsApp.List.Controller.listContacts();
    },
    showContact: function(id){
    	//we extract the contact’s id from the URL, we send it on to our trusty Show controller to display the data
    	ContactsApp.Show.Controller.showContact(id);
    }
  };

	ContactManager.on("contacts:list", function(){
	    ContactManager.navigate("contacts");
	    API.listContacts();
	});

	ContactManager.on("contact:show", function(id){
	  ContactManager.navigate("contacts/" + id);
	  API.showContact(id);
	});
  
  //addInitializer: the provided function will be executed WHEN the application is running
  //initialize-after event is triggered after the application is running
  ContactManager.addInitializer(function(){
    new ContactsApp.Router({
    	//routing installation
      	controller: API
    });
  });
});