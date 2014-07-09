//We’re going to create a module to contain our ContactsApp, 
//which will in turn contain a ContactsApp.List sub-module to list our contacts. 
//This List sub-module will contain our controller to manage listing the contacts, 
//and it will also contain the required views
//When defining sub-modules using the dot-notation, the parent modules do not need to exist. 
//They will be created for you if they don’t exist
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item"
  });

  //CompositeView is used for scenarios where a collection needs to be rendered within a wrapper template
  List.Contacts = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover", //added some styling class, so that Bootstrap will style it for us
    template: "#contact-list",	//we’ve specified the template our CompositeView should use
    itemView: List.Contact,
    itemViewContainer: "tbody" //we’ve told the CompositeView to render the child views within the tbody element
  });
});
