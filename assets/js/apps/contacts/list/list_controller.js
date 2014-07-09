//List controller coordinates the various pieces (typically models/collections and views), 
//and gets them to produce a coherent result (i.e. a displayed page). 
//Later on, when we add routing to our application, typing in URLs will fire various controller actions. 

//We can have our controller and views defined in separate files, 
//while keeping them within the same Marionette sub-module
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){

    	//make a request to retrieve the contacts
    	var contacts = ContactManager.request("contact:entities");

    	//Defining this code within the same ContactsApp.List sub-module,
    	//we can refer to our views (which are also defined within a ContactsApp.List sub-module)
	    var contactsListView = new List.Contacts({
	      collection: contacts
	    });

      	ContactManager.mainRegion.show(contactsListView);
    }
  }
});
