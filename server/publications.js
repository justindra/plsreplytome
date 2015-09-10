Meteor.publish('allUserCount', function () {
	return Counts.find();
});

Meteor.publish('allMessages', function () {
	return Emails.find();
});