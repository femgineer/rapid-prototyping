// define(['views/text!header.html', 'views/text!home.html', 'views/text!footer.html'], function (headerTpl, homeTpl, footerTpl) {
	var app;
	var parseID = "0lkeIOECpDSJQIpjDjI5IuS0wi1C6epWPaDg7KvQ"
	var parseKey = "1i3qyoYALrXmPW2cKvZ85NDF6w92tpLTQJgEnc6H"
	var parseJSKey = "ixcOHViobsgrWQ2Zfm3iOzajNjZlluQsgdFnOtp4"
	var masterKey = "XR6vscEx7sC062Qw5cylsZ5GTDdLEEup5dq1g1Ht"

	var router = Backbone.Router.extend({
	  routes: {
	    '': 'home',
	    "*actions": "home"
	  },
	  initialize: function(){  	  	
	  	Parse.initialize(parseID,parseJSKey);  	
	  	this.headerView = new HeaderView();
		this.headerView.render();
		this.footerView = new FooterView();
		this.footerView.render();
	  },
	  home: function(){
	    this.homeView = new HomeView();
	    this.homeView.render();
	    // $("#send").html(this.homeView.el);
	  }
	});

	HeaderView = Backbone.View.extend({
		el: "#header",
		templateFileName: "views/header.html",
		template: "",   
		initialize: function() {		
		},
		render: function() {
			$(this.el).html(_.template(this.template));
		}
	});

	FooterView = Backbone.View.extend({
		el: "#footer",
		templateFileName: "views/footer.html",
		template: "",	
		render: function() {
			this.$el.html(_.template(this.template));
		}
	});

	var MessageBoard = Parse.Collection.extend({
	  model: "MessageBoard"
	});

	HomeView = Backbone.View.extend({
		el: "#content",
		templateFileName: "views/home.html",
		template: "views/text!home.html",		
		events: {
			"click #send": "saveMessage"
		},
		
		initialize: function() {				
			this.collection = new MessageBoard();

			this.collection.fetch({
			  success: function(collection) {
			    collection.each(function(object) {
			      console.log(object.get("username"));
			      console.log(object.get("message"));
			    });
			  },
			  error: function(collection, error) {
			    console.error("couldn't fetch MessageBoard");
			  }
			});	


			// console.log(this.collection)
			// this.collection.bind("all", this.render, this);
			// this.collection.fetch();

			// this.collection.on("add", function(message) {
			// 	message.save(null, {
			// 		success: function(message) {
			// 			console.log('saved '+message);
			// 		},
			// 		error: function(message) {
			// 			console.log('error');
			// 		}
			// 	});
			// 	console.log('saved'+message);
			// })
		},
		saveMessage: function(){				
			console.log("inside saveMessage")
			var newMessageForm=$("#new-user");
			var username = document.getElementById("username").value;
			// console.log(username);
			var message = document.getElementById("message").value;		
			// console.log(message);
			// console.log(this.collection);					
			// this.collection.add({
			// 	"username": username, 
			// 	"message": message
			// });
			// console.log(this.collection);
			// var username=newMessageForm.find('[name="username"]').attr('value');
			// var message=newMessageForm.find('[name="message"]').attr('value');
			// this.collection.add({
			// 	"username": username,
			// 	"message": message
			// });
		},
		render: function() {

			this.collection = new MessageBoard();
			this.collection.fetch({
			  success: function(collection) {
			  	var table=$(".table tbody");
				table.html('');
			    collection.each(function(object) {
			    	var trEl=$('<tr><td>'+object.get("username")+'</td><td>'+object.get("message")+'</td></tr>');		
					table.append(trEl);		  
			    });
			  },
			  error: function(collection, error) {
			    console.error("couldn't fetch MessageBoard");
			  }
			});			
			// console.log(this.collection);			
			// $(this.el).html(_.template(this.template, this.collection));
		}
	});

	// function getMessages() {
	// 	$.ajax({
	// 		url: " https://api.parse.com/1/classes/MessageBoard",
	// 		headers: {
	// 			"X-Parse-Application-Id": parseID,
	// 			"X-Parse-REST-API-Key": parseKey
	// 		},
	// 		contentType: "application/json",
	// 		dataType: "json",
	// 		type: 'GET',
	// 		success: function(data) {
	// 			console.log("get");
	// 			updateView(data);
	// 		},
	// 		error: function() {
	// 			console.log("error");
	// 		}
	// 	});
	// }

	function updateView(messages) {	
		var table=$(".table tbody");
		table.html('');
		$.each(messages.results, function (index, value) {
			var trEl=$('<tr><td>'+value.username+'</td><td>'+value.message+'</td></tr>');		
			table.append(trEl);		
		});

		console.log(messages);
	}	


	$(document).ready(function(){
		// $("#send").click(function() {
			
		// 	var username = document.getElementById("username").value;
		// 	var message = document.getElementById("message").value;		
		// 	console.log(username)
		// 	console.log(message)
		// 	console.log("!")	
		// 	$.ajax({
		// 		url: " https://api.parse.com/1/classes/MessageBoard",
		// 		headers: {
		// 			"X-Parse-Application-Id": parseID,
		// 			"X-Parse-REST-API-Key": parseKey
		// 		},
		// 		contentType: "application/json",
		// 		dataType: "json",
		// 		processData: false,
		// 		data: JSON.stringify({
		// 			"username": username,
		// 			"message": message
		// 		}),
		// 		type: 'POST',
		// 		success: function() {
		// 			console.log("sent");
		// 			// getMessages();
		// 		},
		// 		error: function() {
		// 			console.log("error");
		// 		}
		// 	});
		// });

		app = new router;
		Backbone.history.start();      
	})
// });
