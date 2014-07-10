var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: "#main-region"
});

ContactManager.navigate = function(route, options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function(){
  return Backbone.history.fragment
};

//we can only start Backbone’s routing (via the history attribute) 
//once all initializers have been run, to ensure the routing controllers are ready to respond to routing events
ContactManager.on("initialize:after", function(){
  if(Backbone.history){
    Backbone.history.start();
    	//When using pushState, URL fragments look like the usual “/contacts/3” instead of “#contacts/3”
    	//to use pushState in your application your server has to respond to that URL
      
    if(this.getCurrentRoute() === ""){
      ContactManager.trigger("contacts:list");
    }
  }
});
