import Ember from 'ember';

export default Ember.Component.extend({
    progress: 0,
    firebaseApp: Ember.inject.service(),
    actions: {
    didSelectFiles(data) {
      console.log(data);
      this.set('model.imageURL', null);
      let storage = this.get('firebaseApp').storage();
      let storageRef = storage.ref();
      let file = data;
      var uploadTask = storageRef.child('images/' + file[0].name).put(file[0]);
      uploadTask.on('state_changed', 
      (snapshot) => {
          var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log('Upload is ' + progress + '% done');
          //this.set('progressText', `Upload is ${progress} % done`);
          this.set('progress', progress);
          switch (snapshot.state) {
            case 'paused':
              this.set('status', 'Upload is paused');
              break;
            case 'running':
              this.set('status', 'Upload is running');
              break;
            }
      },
      (error) => {
        switch (error.code) {
            case 'storage/unauthorized': break;
            case 'storage/canceled': break;
            case 'storage/unknown': break;
        }
      }, 
      () => {
        this.set('model.imageURL', uploadTask.snapshot.downloadURL);
      });
    }
  }
});
