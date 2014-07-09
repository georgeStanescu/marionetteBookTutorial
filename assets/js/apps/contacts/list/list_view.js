//We’re going to create a module to contain our ContactsApp, 
//which will in turn contain a ContactsApp.List sub-module to list our contacts. 
//This List sub-module will contain our controller to manage listing the contacts, 
//and it will also contain the required views
//When defining sub-modules using the dot-notation, the parent modules do not need to exist. 
//They will be created for you if they don’t exist
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",
    events:{
    	'click':'highlightName',
      'click td': 'showCellContent',
      'click button.js-delete': 'onDeleteContact'  //the delete button is identified by the CSS selector
    },
    //override remove to animate the removed child item views
    //the fadeOut callback removes the DOM element once it's done fading out
    remove: function(){
      var self = this;
      this.$el.fadeOut(function(){
        Marionette.ItemView.prototype.remove.call(self);
          //calls the original remove function as if we hadn’t redefined it. This translates to:
            //1. Get the ItemView “class” definition with Marionette.ItemView.prototype
            //2. Refer to the remove function defined on the “class”
            //3. Call the remove method, telling it to use the value in self when refering to this within the remove function’s definition
      });
    },

    highlightName: function(e){
    	this.$el.toggleClass('warning');
    		//each view has an $el attribute returning a jQuery object wrapping the view’s DOM element: 
    		//this.$el is equivalent to $(this.el)
    		//in order to toggle the “warning” class on our tr containing the clicked item view
    		//we simply call jQuery’s toggleClass method on the view’s jQuery object.
    },
    showCellContent: function(arg){
      alert('You have selected: ' + $(arg.target).text());
    },
    onDeleteContact: function(arg){
      arg.stopPropagation(); // this will prevent the default action to be triggered(hightlight in this case)
      this.trigger("contact:delete", this.model);
    }
  });

  //CompositeView is used for scenarios where a collection needs to be rendered within a wrapper template
  //In other words, CompositeView can be seen as a more powerful CollectionView with a template attribute
  List.Contacts = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover", //added some styling class, so that Bootstrap will style it for us
    template: "#contact-list",	//we’ve specified the template our CompositeView should use
    itemView: List.Contact,
    itemViewContainer: "tbody" 	//we’ve told the CompositeView to render the child views within the tbody element
    							//For more complex scenarios where you need more control on where/how to insert the rendered child views, 
    							//you can override the appendHtml function in your CompositeView.
  });
});
