import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveComment(model) {
      // Create the comment
      let newComment = this.store.createRecord('comment', {
        body: this.controller.get('commentBody'),
        timestamp: new Date().getTime(),
        author: this.get('session.currentUser.uid')
      });
      // Get the parent post, then add the comment
      model.get('comments').addObject(newComment);
      // Save the comment, then save the post
      newComment.save().then(function() {
        model.save();
      });
      // Clear the input fields
      this.controller.set('commentBody', null);
      return;
    },
    cancelComment() {
      // Clear input fields
      this.controller.set('commentBody', null);
      return;
    }
  }
});
