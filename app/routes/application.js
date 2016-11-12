// app/routes/application.js
import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch((error) => {
      console.log(error);
    });
  },
  actions: {
    signIn(provider) {
      this.get('session').open('firebase', {provider: provider}).then((data) => {
        console.log(data.currentUser);
        this.store.findRecord('profile', data.currentUser.uid).catch(() => {
            let newUser = this.store.createRecord('profile', {
              id: data.currentUser.uid,
              email: data.currentUser.email,
              photoURL: data.currentUser.photoURL,
              displayName: data.currentUser.displayName,
              timestamp: new Date().getTime()
            });
            return newUser.save();
          });
      });
    },
    signOut() {
      this.get('session').close();
    },
  }
});
