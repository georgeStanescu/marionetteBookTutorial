ContactManager.module("ContactsApp.Edit", function(Edit,ContactManager, Backbone, Marionette, $, _){
  Edit.Contact = Marionette.ItemView.extend({
    template: "#contact-form",

 	initialize: function(){
 	  this.title = "Edit " + this.model.get("firstName");
 	  this.title = this.title + " " + this.model.get("lastName");
 	},
    
    events: {
      "click button.js-submit": "submitClicked"
    },
    
	submitClicked: function(e){
	  e.preventDefault();
	  var data = Backbone.Syphon.serialize(this);
	  this.trigger("form:submit", data);
	},
	onFormDataInvalid: function(errors){
	  var $view = this.$el;
	
	  var clearFormErrors = function(){
	    var $form = $view.find("form");
	    $form.find(".help-inline.error").each(function(){
	      $(this).remove();
	    });
	    $form.find(".control-group.error").each(function(){
	      $(this).removeClass("error");
	    });
	  }
	  
	  var markErrors = function(value, key){
	    var $controlGroup = $view.find("#contact-" + key).parent();
	    var $errorEl = $("<span>", {class: "help-inline error", text: value});
	    $controlGroup.append($errorEl).addClass("error");
	  }
	  
	  clearFormErrors();
	  _.each(errors, markErrors);
	},
	onRender: function(){
		//since the title should only be inserted when the view is not displayed as a modal, 
		//we need to make sure asModal is absent or false
	  if( ! this.options.asModal){
	    var $title = $("<h1>", { text: this.title });
	    this.$el.prepend($title);
	  }
	},
	
	onShow: function(){
		//we only want this code to be run when we want to create a modal window
	  if(this.options.asModal){
	    this.$el.dialog({
	      modal: true,
	      title: this.title,
	      width: "auto"
	    });
	  }
	}
  });
});