angular.module('QuesApp')
.controller('QuestionCtrl', function($scope, $stateParams) {
	let self = this
	self.index = 0

	self.id = $stateParams.id
	getAll()
	

	self.select = function(index) {
		console.log(index)
		self.index ++
		if (self.index >= self.questions.length) {
			alert('ending')
		}
	}

	function getAll() {
        let query1 = new AV.Query('Quesair')
        let query2 = new AV.Query('Question')
        query1.include('questions')
        query1.get(self.id).then((result) => {
            self.quesair = result

            query2.equalTo('quesair', result)
            query2.equalTo('isDeleted', false)
            query2.find().then((results) => {
                self.questions = results
                console.log(results)
                $scope.$apply()
            })
        })
    }
})