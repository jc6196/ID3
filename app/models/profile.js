import DS from 'ember-data';
 
export default DS.Model.extend({
   email: DS.attr('string'),
   photoURL: DS.attr('string'),
   displayName: DS.attr('string'),
   timestamp: DS.attr('number'),
   posts: DS.hasMany('post', { async: true, inverse: null }),
   comments: DS.hasMany('comment', { async: true, inverse: null })
 });