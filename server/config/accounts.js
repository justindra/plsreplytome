ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      appId: Meteor.settings.facebook.appId,
      secret: Meteor.settings.facebook.secret
    }
  }
);

Accounts.onCreateUser(function(options, user) {
	var count = Counts.findOne();
	Counts.update(count._id, {
		$inc: {totalUsers: 1}
	});

	Meteor.call('setCronJob')
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;
});

Meteor.startup(function () {
	if(Counts.find().count() < 1) {
		Counts.insert({
			totalUsers: Meteor.users.find().count()
		});
	} else {
		var count = Counts.findOne();
		Counts.update(count._id, {
			$set: {
				totalUsers: Meteor.users.find().count()
			}
		});
	}
});