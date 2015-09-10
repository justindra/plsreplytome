Meteor.methods({
	insertNewMessage: function (userId, subject, message) {
		var user = Meteor.users.findOne(userId);
		if(user) {
			Emails.insert({
				subject: subject,
				message: message
			});
		} else throw new Meteor.Error(401, 'Please sign in using facebook to add a new message');
	}
});