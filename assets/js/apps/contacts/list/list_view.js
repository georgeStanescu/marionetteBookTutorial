//We’re going to create a module to contain our ContactsApp, 
//which will in turn contain a ContactsApp.List sub-module to list our contacts. 
//This List sub-module will contain our controller to manage listing the contacts, 
//and it will also contain the required views
//When defining sub-modules using the dot-notation, the parent modules do not need to exist. 
//They will be created for you if they don’t exist
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  //layouts are used for rendering an application layout with multiple sub-regions to be managed by specified region managers.
    //A layout manager can also be used as a composite-view to aggregate multiple views 
    //and sub-application areas of the screen where multiple region managers need to be attached to dynamically rendered HTML.
  List.Layout = Marionette.Layout.extend({
    template: "#contact-list-layout",
    
    //we define our regions within the layout and we provide DOM ids that are present within our template
    regions: {
      panelRegion: "#panel-region",
      contactsRegion: "#contacts-region"
    }
  });
  List.Panel = Marionette.ItemView.extend({
    template: "#contact-list-panel"
  });

  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",
    events:{
    	'click':'highlightName',
      'click td': 'showCellContent',
      'click button.js-delete': 'onDeleteContact', //the delete button is identified by the CSS selector
      "click td a.js-show": "showClicked",
      "click td a.js-edit": "editClicked"
    },

    //highlight the updated contact
    flash: function(cssClass){
      var $view = this.$el;
      $view.hide().toggleClass(cssClass).fadeIn(800, function(){
        setTimeout(function(){
          $view.toggleClass(cssClass)
        }, 500);
      });
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
      arg.stopPropagation(); //prevent the event from bubbling up in the DOM and getting our row highlighted
      this.trigger("contact:delete", this.model);
    },
    showClicked: function(e){
      e.preventDefault();   // we need to prevent the browser from navigating to the link’s location (see index page)
      e.stopPropagation();  // prevent the event from bubbling up in the DOM and getting our row highlighted
      this.trigger("contact:show", this.model);
    },
    editClicked: function(e){
      e.preventDefault();
      e.stopPropagation();
      this.trigger("contact:edit", this.model);
    }
  });

  //CompositeView is used for scenarios where a collection needs to be rendered within a wrapper template
  //In other words, CompositeView can be seen as a more powerful CollectionView with a template attribute
  List.Contacts = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover", //added some styling class, so that Bootstrap will style it for us
    template: "#contact-list",	//we’ve specified the template our CompositeView should use
    itemView: List.Contact,
    itemViewContainer: "tbody", 	//we’ve told the CompositeView to render the child views within the tbody element
    							//For more complex scenarios where you need more control on where/how to insert the rendered child views, 
    							//you can override the appendHtml function in your CompositeView.

    //this method is triggered automatically when the itemview:contact:delete event is being fired (see list_controller)
    onItemviewContactDelete: function(){
      this.$el.fadeOut(1000, function(){
        $(this).fadeIn(1000);
      });
    }
  });
});
