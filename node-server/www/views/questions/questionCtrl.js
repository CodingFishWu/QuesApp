angular.module('QuesApp')
.controller('QuestionCtrl', function($scope, $stateParams) {
	var self = this
	self.index = 0
	self.answers = []

	self.id = $stateParams.id
	getAll()
	

	self.select = function(index) {
		console.log(index)
		self.answers.push(index)
		self.index ++
		if (self.index >= self.questions.length) {
			var correctNumber = 0
			for (i in self.questions) {
				if (self.answers[i] == self.questions[i].get('correct'))
					correctNumber += 1
			}
			alert('一共回答了' + self.answers.length + '道题，正确数目为' + correctNumber)
		}
	}

	function getAll() {
        var query1 = new AV.Query('Quesair')
        var query2 = new AV.Query('Question')
        query1.include('questions')
        query1.get(self.id).then(function(result) {
            self.quesair = result

            query2.equalTo('quesair', result)
            query2.equalTo('isDeleted', false)
            query2.find().then(function(results) {
                self.questions = results
                console.log(results)
                $scope.$apply()
            })
        })
    }
})