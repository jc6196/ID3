import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {};
  },
   actions: {
      save(model) {
        let myPost = model;
        let currentUser = this.get('session.currentUser.uid');
        let myProfile = this.store.peekRecord('profile', currentUser);
        if (myProfile && myPost.title && myPost.body) {
          let newPost = this.store.createRecord('post', {
            title: myPost.title,
            body: myPost.body,
            timestamp: new Date().getTime(),
            author: myProfile
          });
          myProfile.get('posts').addObject(newPost);
          newPost.save().then(() => {
            myProfile.save();
            this.transitionTo('posts.show', newPost);
          });
        } else {
          alert('Please fill in title and body');
        }
    },
    cancel() {
      // Clear input fields
      this.set('model.title', null);
      this.set('model.body', null);
      this.transitionTo('index');
    }
  }
});