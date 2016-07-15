angular.module('QuesApp')
.controller('CreateCtrl', function() {
	this.questions = [
		{
			question: 'First Question',
			options: ['option1', 'option2', 'option3', 'option4']
		}
	]
	this.options = ['option1', 'option2', 'option3', 'option4']
})