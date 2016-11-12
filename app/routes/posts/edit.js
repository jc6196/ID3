import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(model) {
      model.save().then((post) =>
        this.transitionTo('posts.show', post)
      );
    },
    delete(model){
      let post = model;
      let deletions = post.get('comments').map((comment) => {
        comment.get('author').then((author) => {
          comment.destroyRecord();
          author.save();
        });
      });
      
      // Ensures all comments are deleted before the post
      Ember.RSVP.all(deletions).then(() => {
        post.get('author').then((author) => {
          post.destroyRecord();
          author.save().then(() => {
            return this.transitionTo('index');
          });
        });
      });
      },
    cancel(model) {
      model.rollbackAttributes();
      this.transitionTo('posts.show', model);
    }
  }
});
