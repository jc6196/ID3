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
      });
    },
    signOut() {
      this.get('session').close();
    },
  }
});
