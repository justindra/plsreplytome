if (Meteor.isClient) {
  Template.main.created = function () {
    this.subscribe('allUserCount');
    this.subscribe('allMessages');
  };
  Template.main.helpers({
    count: function () {
      var count = Counts.findOne();
      return count && count.totalUsers || 0;
    }
  });
 Template.form.events({
   'submit #emailform': function (evt, template) {
      evt.preventDefault();
      console.log(evt.target.subject.value);
      console.log(evt.target.message.value);
      Meteor.call('insertNewMessage', Meteor.userId(), evt.target.subject.value, evt.target.message.value);
   }
 });
 Template.messages.helpers({
   messages: function () {
     return Emails.find();
   }
 });
}
