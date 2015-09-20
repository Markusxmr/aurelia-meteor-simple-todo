export class App {

  constructor(){
    this.owner = [];
    this.current_user = false;
    Meteor.subscribe("tasks");

    Tracker.autorun(() => {
      this.tasks = Tasks.find({}, {sort: {createdAt: -1}}).fetch();

      if (Session.get("hideCompleted")) {
        this.tasks = Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}}).fetch();
      } else {
        this.tasks = Tasks.find({}, {sort: {createdAt: -1}}).fetch();
      }

      this.userId = Meteor.userId();
      this.user = Meteor.user();

      if(this.user){
        this.current_user = true;
      } else {
        this.current_user = false;
      }

    });
  }

  get hideCompleted(){
    Session.set("hideCompleted", this.hide_completed);
  }

  newTask(){
    Meteor.call("addTask", this.text);
    this.text = '';
  }

  toggleChecked(id, checked){
    Meteor.call("setChecked", id, ! checked);
  }

  togglePrivate(id, p){
    Meteor.call("setPrivate", id, ! p);
  }

  delete(id, p){
    Meteor.call("deleteTask", id, ! p);
  }

}

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
