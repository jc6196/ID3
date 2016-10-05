import Ember from 'ember';

let books = [{
  id: 'moby-dick',
  title: 'Moby Dick',
  author: 'Herman Melville',
  published: '1851',
}, {
  id: 'scarlet-letter',
  title: 'Scarlet Letter',
  author: 'Nathaniel Hawthorne',
  published: '1850',
}, {
  id: 'frankenstein',
  title: 'Frankenstein',
  author: 'Mary Shelley',
  published: '1818',
}, {
  id: 'leaves-of-grass',
  title: 'Leaves of Grass',
  author: 'Walt Whitman',
  published: '1855',
}];

export default Ember.Route.extend({
  model() {
    //return books;
    return this.store.findAll('post').then((posts) =>
      posts.sortBy('timestamp').reverse()
    );
  }
});
