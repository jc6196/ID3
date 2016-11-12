import Ember from 'ember';

export default Ember.Route.extend({
actions: {
      saveComment(model) {
        // Create the comment
        let myPost = model;
        let currentUser = this.get('session.currentUser.uid');
        let myProfile = this.store.peekRecord('profile', currentUser);
        let newComment = this.store.createRecord('comment', {
          body: this.controller.get('commentBody'),
          timestamp: new Date().getTime(),
          author: myProfile,
          post: myPost
        });
        // Add the comment to belongsTo parent records
        myPost.get('comments').addObject(newComment);
        myProfile.get('comments').addObject(newComment);
        // Save the comment, then save the post and profile
        newComment.save();
        myProfile.save();
        myPost.save();
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
