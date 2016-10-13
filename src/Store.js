var dispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _likes = 0;

function update(likes) {
	_likes = likes
}

var Store = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getLike: function() {
	return _likes;
  }

});

// Register callback to handle all updates
dispatcher.register(function(action) {
  var text;
  if(action.actionType === 'atualiza') {
      text = action.text;
      if (text !== '') {
        update({text: text});
        Store.emitChange();
      }
  }
});


module.exports = Store;