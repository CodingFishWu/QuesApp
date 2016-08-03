angular.module('QuesApp')
.controller('QuestionCtrl', function($stateParams, QuesStorage) {
	let self = this
	self.index = 0
	self.title = $stateParams.title
	self.questions = angular.copy(QuesStorage.get(self.title).questions)

	self.select = function(index) {
		console.log(index)
		self.index ++
		if (self.index >= self.questions.length) {
			alert('ending')
		}
	}
})