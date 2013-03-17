var app;
var parseID = "0lkeIOECpDSJQIpjDjI5IuS0wi1C6epWPaDg7KvQ"
var parseKey = "1i3qyoYALrXmPW2cKvZ85NDF6w92tpLTQJgEnc6H"

var router = Backbone.Router.extend({
  routes: {
    '': 'home',
    "*actions": "home"
  },
  initialize: function(){  	
  	getMessages();  	
  	// Parse.initialize(parseID,parseKey);
 
  	this.headerView = new HeaderView();
	this.headerView.render();
	this.footerView = new FooterView();
	this.footerView.render();
  },
  home: function(){
    // this.homeView = new HomeView();
    // this.homeView.render();
  }
});

HeaderView = Backbone.View.extend({
	el: "#header",
	templateFileName: "views/header.html",
	template: '',   
	initialize: function() {
	},
	render: function() {
		$(this.el).html(_.template(this.template));
	}
});

FooterView = Backbone.View.extend({
	el: "#footer",
	templateFileName: "views/footer.html",
	template: '',	
	render: function() {
		this.$el.html(_.template(this.template));
	}
});

Message = Parse.Object.extend({
	className: "MessageBoard"
})
MessageBoard = Parse.Collection.extend ({
	model: Message
});

HomeView = Backbone.View.extend({
	el: "#content",
	templateFileName: "views/header.html",
	template: '',
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


$(document).ready(function(){
	$("#send").click(function() {
		
		var username = document.getElementById("username").value;
		var message = document.getElementById("message").value;		
		console.log(username)
		console.log(message)
		console.log("!")	
		$.ajax({
			url: " https://api.parse.com/1/classes/MessageBoard",
			headers: {
				"X-Parse-Application-Id": parseID,
				"X-Parse-REST-API-Key": parseKey
			},
			contentType: "application/json",
			dataType: "json",
			processData: false,
			data: JSON.stringify({
				"username": username,
				"message": message
			}),
			type: 'POST',
			success: function() {
				console.log("sent");
				getMessages();
			},
			error: function() {
				console.log("error");
			}
		});
	});

	app = new router;
	Backbone.history.start();      
})

