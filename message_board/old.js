var app;
var router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  initialize: function(){
  	Parse.initialize("0lkeIOECpDSJQIpjDjI5IuS0wi1C6epWPaDg7KvQ", "1i3qyoYALrXmPW2cKvZ85NDF6w92tpLTQJgEnc6H");
  },
  home: function(){
    this.homeView = new HomeView();
    this.homeView.render();
  }
});


HomeView = Backbone.View.extend({
	el: "#content",
	template: homeTpl,
	events: {
		"click #send": "saveMessage"
	},

	initialize: function() {
		this.collection = new MessageBoard();
		this.collection.bind("all", this.render, this);
		this.collection.fetch();
		this.collection.on("add", function(message) {
			message.save(null, {
				success: function(message) {
					console.log('saved '+message);
				},
				error: function(message) {
					console.log('error');
				}
			});
			console.log('saved'+message);
		})
	},
	saveMessage: function(){
		var newMessageForm=$("#new-message");
		var username=newMessageForm.find('[name="username"]').attr('value');
		var message=newMessageForm.find('[name="message"]').attr('value');
		this.collection.add({
			"username": username,
			"message": message
			});
	},
	render: function() {
		console.log(this.collection)
		$(this.el).html(_.template(this.template, this.collection));
	}
});

function getMessages() {
	$.ajax({
		url: " https://api.parse.com/1/classes/MessageBoard",
		headers: {
			"X-Parse-Application-Id": parseID,
			"X-Parse-REST-API-Key": parseKey
		},
		contentType: "application/json",
		dataType: "json",
		type: 'GET',
		success: function(data) {
			console.log("get");
			updateView(data);
		},
		error: function() {
			console.log("error");
		}
	});
}

function updateView(messages) {	
	var table=$(".table tbody");
	table.html('');
	$.each(messages.results, function (index, value) {
		var trEl=$('<tr><td>'+value.username+'</td><td>'+value.message+'</td></tr>');		
		table.append(trEl);		
	});

	console.log(messages);
}	

// FooterView = Backbone.View.extend({
// 	el: "#footer",
// 	template: footerTpl,
// 	render: function() {
// 		this.$el.html(_.template(this.template));
// 	}
// });

// Message = Parse.Object.extend({
// 	className: "MessageBoard"
// })
// MessageBoard = Parse.Collection.extend ({
// 	model: Message
// });

// var homeView = Backbone.View.extend({
//   el: 'body',
//   template: _.template('Welcome to the Femgineer Message Board'),
//   render: function(){
//     this.$el.html(this.template({}));
//   }
// });

$(document).ready(function(){
  app = new router;
  Backbone.history.start();      
})


/*
Rapid Prototyping with JS is a JavaScript and Node.js book that will teach you how to build mobile and web apps fast. — Read more at
http://rapidprototypingwithjs.com.
*/

// require(['libs/text!header.html', 'libs/text!home.html', 'libs/text!footer.html'], function (headerTpl, homeTpl, footerTpl) {
	
// 	var ApplicationRouter = Backbone.Router.extend({
// 		routes: {
// 			"": "home",
// 			"*actions": "home"
// 		},
// 		initialize: function() {
// 			this.headerView = new HeaderView();
// 			this.headerView.render();
// 			this.footerView = new FooterView();
// 			this.footerView.render();
// 		},
// 		home: function() {
// 			this.homeView = new HomeView();
// 			this.homeView.render();
// 		}
// 	});

// 	HeaderView = Backbone.View.extend({
// 		el: "#header",
// 		templateFileName: "header.html",
// 		template: headerTpl,
// 		initialize: function() {
// 		},
// 		render: function() {
// 			$(this.el).html(_.template(this.template));
// 		}
// 	});

// 	FooterView = Backbone.View.extend({
// 		el: "#footer",
// 		template: footerTpl,
// 		render: function() {
// 			this.$el.html(_.template(this.template));
// 		}
// 	});
// 	Message = Parse.Object.extend({
// 		className: "MessageBoard"
// 	})
// 	MessageBoard = Parse.Collection.extend ({
// 		model: Message
// 	});
	
// 	HomeView = Backbone.View.extend({
// 		el: "#content",
// 		template: homeTpl,
// 		events: {
// 			"click #send": "saveMessage"
// 		},

// 		initialize: function() {
// 			this.collection = new MessageBoard();
// 			this.collection.bind("all", this.render, this);
// 			this.collection.fetch();
// 			this.collection.on("add", function(message) {
// 				message.save(null, {
// 					success: function(message) {
// 						console.log('saved '+message);
// 					},
// 					error: function(message) {
// 						console.log('error');
// 					}
// 				});
// 				console.log('saved'+message);
// 			})
// 		},
// 		saveMessage: function(){
// 			var newMessageForm=$("#new-message");
// 			var username=newMessageForm.find('[name="username"]').attr('value');
// 			var message=newMessageForm.find('[name="message"]').attr('value');
// 			this.collection.add({
// 				"username": username,
// 				"message": message
// 				});
// 		},
// 		render: function() {
// 			console.log(this.collection)
// 			$(this.el).html(_.template(this.template, this.collection));
// 		}
// 	});

// 	app = new ApplicationRouter();
// 	Backbone.history.start();	
// });