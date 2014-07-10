//List controller coordinates the various pieces (typically models/collections and views), 
//and gets them to produce a coherent result (i.e. a displayed page). 
//Later on, when we add routing to our application, typing in URLs will fire various controller actions. 

//We can have our controller and views defined in separate files, 
//while keeping them within the same Marionette sub-module
ContactManager.module("ContactsApp.List", function(List, ContactManager,
Backbone, Marionette, $, _){
  List.Controller = {
    //within the controller we’ll put all the functions we intend to be publicly available
    //these public methods will typically be the ones that are triggered by entering URLs into the address bar
    listContacts: function(){
      //make a request to retrieve the contacts
      var fetchingContacts = ContactManager.request("contact:entities");

      $.when(fetchingContacts).done(function(contacts){
        //Defining this code within the same ContactsApp.List sub-module,
        //we can refer to our views (which are also defined within a ContactsApp.List sub-module) 
        var contactsListView = new List.Contacts({
          collection: contacts
        });

        contactsListView.on("itemview:contact:show",
        function(childView, model){
          //ContactManager.navigate("contacts/" + model.get("id"));
          //ContactManager.ContactsApp.Show.Controller.showContact(model);
            //the two lines are equivalent to:
          ContactManager.trigger("contact:show", model.get("id"));
        });

        contactsListView.on("itemview:contact:edit", function(childView, model){
          //create a view instance
          var view = new ContactManager.ContactsApp.Edit.Contact({
            model: model,
            asModal: true
          });

          view.on("form:submit", function(data){
            //try to update the model
            if(model.save(data)){
              childView.render();
                //once the view gets rerendered, the model’s data is serialized and provided to the template again. 
                //In other words, we’ll see the new data values displayed.
              
              ContactManager.dialogRegion.close(); //we close the dialogRegion and Marionette takes care of closing the view it contains
              childView.flash("success");
            }
            else{
              //displaying the errors on the form
              view.triggerMethod("form:data:invalid", model.validationError);
            }
          });

          //show the view within the dialogRegion
          ContactManager.dialogRegion.show(view);
        });

        //When an item view within a collection view triggers an event,
        //that event will bubble up through the parent collection view with “itemview:” prepended to the event name.
        contactsListView.on("itemview:contact:delete",
        function(childView, model){
          model.destroy();
        });

        ContactManager.mainRegion.show(contactsListView);
      });
    }
  }
});
