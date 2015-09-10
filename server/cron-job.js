Meteor.methods({
	setCronJob: function () {
		var jobName = 'Send email';
		var count = Counts.findOne().totalUsers;
		var secondsInBetween = 604800 / count;
		var minInBetween = secondsInBetween / 60;
		var hourInBetween = minInBetween / 60;
		var dayInBetween = hourInBetween / 24;
		SyncedCron.remove(jobName);
		SyncedCron.add({
		  name: jobName,
		  schedule: function(parser) {
		    // parser is a later.parse object
		    if(dayInBetween > 0) {
			  return parser.recur().every(Math.floor(dayInBetween)).dayOfWeek();
		    } else if (hourInBetween > 0) {
			  return parser.recur().every(Math.floor(hourInBetween)).hour();
		    } else if (minInBetween > 0) {
		    	return parser.recur().every(Math.floor(minInBetween)).minute();
		    } else {
		    	return parser.recur().every(Math.floor(secondsInBetween)).second();
		    }
		  },
		  job: function() {
		  	sendEmail();
		    return 1;
		  }
		});
	}
});

Meteor.startup(function () {
	Meteor.call('setCronJob');
	SyncedCron.start();
});

function sendEmail() {
	var randomEmail = _.sample(Emails.find().fetch());
	Email.send({
	  from: "plsreplytous@ridemarbel.com",
	  to: "hello@ridemarbel.com",
	  subject: randomEmail.subject,
	  text: randomEmail.message
	});
}