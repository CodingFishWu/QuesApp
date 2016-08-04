var APP_ID = 'tzT7Dtaokwu7gk8j38X8ttKc-gzGzoHsz';
var APP_KEY = 'eJJ18UYMbpM1jmeeaBk83R8v';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var Quesair = AV.Object.extend('Quesair')
var Question = AV.Object.extend('Question')


angular.module('QuesApp')
.factory('Quesair', function() {
	return Quesair
})
.factory('Question', function() {
	return Question
})
