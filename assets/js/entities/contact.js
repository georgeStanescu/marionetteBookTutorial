//Here a new module is created
//Marionette Modules allow you to create modular encapsulated logic. 
//They can be used to split apart large applications into multiple files, and to build individual components of your app.
  //the second argument is a callback function that takes 6 args:
    //the module itself
    //the object that module was called from
    //Backbone
    //Backbone.Marionette
    //jQuery
    //Underscore
ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  
  //You can add functions and data directly to your module to make them publicly accessible.
  //You can also add private functions and data by using locally scoped variables.
  
  //We’ve attached our model and collection as attributes to the module
  Entities.Contact = Backbone.Model.extend({
    urlRoot: "contacts"
  });

  Entities.configureStorage(Entities.Contact);

  Entities.ContactCollection = Backbone.Collection.extend({
    url: "contacts",
    model: Entities.Contact,
    comparator: "firstName"
  });

  Entities.configureStorage(Entities.ContactCollection);

  var contacts;
  //this type of data initialization can be handy when dealing with data that is relevant to the user 
  //but doesn’t need to be stored (or retrieved) server-side
  var initializeContacts = function(){
    var contacts = new Entities.ContactCollection([
      { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184" },
      { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163" },
      { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129" }
    ]);
    contacts.forEach(function(contact){
      contact.save();
    });
    return contacts.models;
  };

  var API = {
    getContactEntity: function(contactId){
      var contact = new Entities.Contact({id: contactId});
      var defer = $.Deferred();
        //we use a deferred object to return a promise from our “contact:entity” handler
        //jquery deferred object is essentially “something that will happen later”
        //it can register multiple callbacks into callback queues, invoke callback queues
        // and relay the success or failure state of any synchronous or asynchronous function
      setTimeout(function(){
        contact.fetch({
          success: function(data){
            defer.resolve(data);
              //if it’s not possible to load the requested contact, we’ll simply return undefined in our handler
          },
          error: function(data){
            defer.resolve(undefined);
          }
        });
      }, 2000);
      return defer.promise();
          //allows code elsewhere to simply monitor the promise and react appropriately to any changes (e.g. fresh data coming in)
          //promise() method allows an asynchronous function to prevent other code from interfering 
          //with the progress or status of its internal request
    },
    getContactEntities: function(){
      var contacts = new Entities.ContactCollection();
      var defer = $.Deferred();
      contacts.fetch({
        success: function(data){
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(contacts){
        if(contacts.length === 0){
          // if we don't have any contacts yet, create some for convenience
          var models = initializeContacts();
          //all models in the collection are removed, and replaced by the models provided
          contacts.reset(models);
            //Any time you cause a collection to change (filtering the models to display, changing the sorting order, etc.), 
            //you can force a collection/composite view to rerender the entire collection by calling myCollection.trigger("reset")
        }
      });
      return promise;
    }
  };

  //This allows components in an application to request some information or work be done by another part of the app, 
  //but without having to be explicitly coupled to the component that is performing the work
  //reqres = “request-response” system, and it’s automatically defined at the application level by Marionnette
  //register a request handler to call when the contact:entities request is received
  ContactManager.reqres.setHandler("contact:entities", function(){
    return API.getContactEntities();
  });

  ContactManager.reqres.setHandler("contact:entity", function(id){
    return API.getContactEntity(id);
  });
});
