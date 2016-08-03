'use strict'

let APP_ID = 'tzT7Dtaokwu7gk8j38X8ttKc-gzGzoHsz';
let APP_KEY = 'eJJ18UYMbpM1jmeeaBk83R8v';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

let Quesair = AV.Object.extend('Quesair')
let Question = AV.Object.extend('Question')


angular.module('QuesApp')
.factory('Quesair', () => {
	return Quesair
})
.factory('Question', () => {
	return Question
})
.factory('QuesStorage', function() {
	return {
		add: function(title) {
			let quesair = new Quesair()
			quesair.set('title', title)
			quesair.save()
			quesList.push(quesair)
		},
		all: function() {
			let query = new AV.Query('Quesair')
			query.find().then((results) => {
				return results
			})
		},
		get: function(title) {
			for (item of quesList) {
				if (item.title == title) {
					return item
				}
			}
			return null
		}
	}
})