ContactManager.module("ContactsApp.Show", function(Show, ContactManager,Backbone, Marionette, $, _){
  Show.Controller = {
  	//the controller receives an id as the argument 
    showContact: function(id){
    	var contacts = ContactManager.request("contact:entities");
      	var model = contacts.get(id); //we retrieve the model instance from the collection

		var contactView;
		if(model !== undefined){
		   contactView = new Show.Contact({
		     model: model
		   });
		 }
		else{
			contactView = new Show.MissingContact();
		}
      
      ContactManager.mainRegion.show(contactView);
    }
  }
});