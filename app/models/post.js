import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  imageURL: DS.attr('string'),
  timestamp: DS.attr('number'),
  comments: DS.hasMany('comment', { async: true, inverse: null }),
  author: DS.belongsTo('profile', { async: true, inverse: null })
 });
