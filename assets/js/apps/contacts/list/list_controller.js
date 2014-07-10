//List controller coordinates the various pieces (typically models/collections and views), 
//and gets them to produce a coherent result (i.e. a displayed page). 
//Later on, when we add routing to our application, typing in URLs will fire various controller actions. 

//We can have our controller and views defined in separate files, 
//while keeping them within the same Marionette sub-module
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
  	//within the controller we’ll put all the functions we intend to be publicly available
    //these public methods will typically be the ones that are triggered by entering URLs into the address bar
    listContacts: function(){

    	//make a request to retrieve the contacts
    	var contacts = ContactManager.request("contact:entities");

    	//Defining this code within the same ContactsApp.List sub-module,
    	//we can refer to our views (which are also defined within a ContactsApp.List sub-module)
	    var contactsListView = new List.Contacts({
	      collection: contacts
	    });

      //When an item view within a collection view triggers an event,
      //that event will bubble up through the parent collection view with “itemview:” prepended to the event name.
      contactsListView.on("itemview:contact:delete", function(childView, model){
        model.destroy();
      });

      contactsListView.on("itemview:contact:show", function(childView, model){
        //ContactManager.navigate("contacts/" + model.get("id"));
        //ContactManager.ContactsApp.Show.Controller.showContact(model);
          //the two lines are equivalent to:

        ContactManager.trigger("contact:show", model.get("id"));
      });

      ContactManager.mainRegion.show(contactsListView);
    }
  }
});
