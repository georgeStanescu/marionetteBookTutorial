//we’re defining the router within the ContactsApp module 
//because it will handle the routes for all the sub-modules attached to ContactsApp (such as List, Show, etc.)
ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
  //We attach a Router instance containing an appRoutes object 
  //associating the URL fragments on the left with callback methods on the right.
  ContactsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
    	//list contacts function specified in the appRoutes object above must exist in the router’s controller (API)
      	"contacts": "listContacts"
    }
  });
   
  //we define public methods within an API object, which is provided to the router during instantiation   
  var API = {
    listContacts: function(){
      ContactsApp.List.Controller.listContacts();
    }
  };

ContactManager.on("contacts:list", function(){
    ContactManager.navigate("contacts");
    API.listContacts();
});
  
  //addInitializer: the provided function will be executed when the application is running
  ContactManager.addInitializer(function(){
    new ContactsApp.Router({
    	//routing installation
      	controller: API
    });
  });
});