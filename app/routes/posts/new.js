import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {};
  },
  actions: {
    save(model) {
      if (model.title && model.body) {
        let post = this.store.createRecord('post', {
          title: model.title,
          body: model.body,
          timestamp: new Date().getTime()
        });
        post.save().then( () => this.transitionTo('index'));
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