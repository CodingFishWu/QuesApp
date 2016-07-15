/*
*  [
*		{
			question: '*****',
			options: 
				[
					'****',
					'****'
				]
		},
		......
	]
*
*
*
*/

angular.module('QuesApp')
.factory('QuesStorage', function() {
	return {
		all: function() {
			let questionString = window.localStorage['questions']
			if (questionString) {
				return angular.fromJson(questionString)
			}
			return []
		},
		save: function(questions) {
			window.localStorage['questions'] = angular.toJson(questions)
		}
	}
})