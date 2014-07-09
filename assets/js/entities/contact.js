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
  Entities.Contact = Backbone.Model.extend({});

  Entities.ContactCollection = Backbone.Collection.extend({
    model: Entities.Contact,
    comparator: "firstName"
  });


  var contacts;
  var initializeContacts = function(){
    contacts = new Entities.ContactCollection([
      { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184" },
      { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163" },
      { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129" }
    ]);
  };

  var API = {
    getContactEntities: function(){
      if(contacts === undefined){
        initializeContacts();
      }
      return contacts;
    }
  };

  //reqres = “request-response” system, and it’s automatically defined at the application level by Marionnette
  ContactManager.reqres.setHandler("contact:entities", function(){
    return API.getContactEntities();
  });
});
