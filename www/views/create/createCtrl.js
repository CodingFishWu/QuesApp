angular.module('QuesApp')
.controller('CreateCtrl', function($scope, $state, $stateParams, $window, $ionicPopup, Quesair, Question) {
    let self = this
    self.saved = true
    self.saving = false

    self.id = $stateParams.id
    getAll()

    self.save = function() {
        self.saving = true
        let flag = false
        for (item of self.questions) {
            item.set('question', item['attributes']['question'])
            item.set('options', item['attributes']['options'])
            item.save()
        }
        AV.Object.saveAll(self.questions).then(() => {
            self.saving = false
            self.saved = true
            $scope.$apply()
        })
    }

    self.add = function() {
        self.saved = false
        add()
    }

    self.back = function() {
        let flag = true
        if (!self.saved) {
            $ionicPopup.confirm({
                title: 'Confirm Exit?',
                template: 'You are exiting without save, are you sure?'
            }).then(function(res) {
                if (res) {
                    window.history.back()
                }
                else {
                    return
                }
            });
        }
        else {
            $window.history.back();
        }
    }

    function add() {
        let question = new Question()
        question.set('quesair', self.quesair)
        question.set('question', '')
        question.set('options', ['', '', '', ''])
        question.save().then(() => {
            getAll()
        })
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