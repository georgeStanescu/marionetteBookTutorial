ContactManager.module("ContactsApp.Show", function(Show, ContactManager,Backbone, Marionette, $, _){
  Show.Controller = {
  	//the controller receives an id as the argument 
	showContact: function(id){
		//create a new loading view and display it.
		var loadingView = new ContactManager.Common.Views.Loading({
			//Passing view parameters on instantiation
			title: "Artificial Loading Delay",
	        message: "Data loading is delayed to demonstrate using a loading view."
		});
	    ContactManager.mainRegion.show(loadingView);

	  var fetchingContact = ContactManager.request("contact:entity", id); //we get the promise returned by our handler
	  $.when(fetchingContact).done(function(contact){	
	  	// then wait until the data has been fetched ($when...done) before displaying our view with the data
	    var contactView;
	    if(contact !== undefined){
	      contactView = new Show.Contact({
	        model: contact
	      });

          contactView.on("contact:edit", function(contact){
            ContactManager.trigger("contact:edit", contact.get("id"));
          });
	    }
	    else{
	      contactView = new Show.MissingContact();
	    }
	    ContactManager.mainRegion.show(contactView);
	  });
	}
  }
});