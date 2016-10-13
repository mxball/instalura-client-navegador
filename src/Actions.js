var dispatcher = require('./AppDispatcher');
var Actions = {
	updateLike: function(text) {
		dispatcher.dispatch({
	  	actionType: 'atualiza',
	  	text: text
		});
	}
};

module.exports = Actions;