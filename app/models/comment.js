import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  timestamp: DS.attr('number'),
  post: DS.belongsTo('post', { async: true, inverse: null }),
  author: DS.belongsTo('profile', { async: true, inverse: null })
});
