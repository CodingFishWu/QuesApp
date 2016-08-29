angular.module('QuesApp')
.controller('CreateCtrl', function($scope, $state, $stateParams, $window, $ionicPopup, Quesair, Question) {
    var self = this
    self.saved = true

    self.id = $stateParams.id
    getAll()

    self.save = function() {
        for (item of self.questions) {
            item.set('question', item['attributes']['question'])
            item.set('options', item['attributes']['options'])
            file = item['img']
            if (file) {
                var avFile = new AV.File(file['name'], file);
                item.set('img', avFile)
            }
        }
        AV.Object.saveAll(self.questions).then(function() {
            self.saved = true
        }, function() {
            alert('保存失败，请重试')
        })
    }

    self.add = function() {
        self.saved = false
        add()
    }

    self.delete = function(index) {
        var question = self.questions[index]
        question.set('isDeleted', true)
        question.save().then(function() {
            self.questions.splice(index, 1);
            $scope.$apply()
        })
    }

    self.back = function() {
        var flag = true
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

    self.setCorrect = function(item, index) {
        item.set('correct', index)
    }

    self.uploadFiles = function(file, errFiles, index) {
        var errFile = errFiles && errFiles[0];
        if (errFile) {
            alert("图片错误:" + errFile.$error + "  " + errFile.$errorParam)
        }
        if (file) {
            console.log(file)
            self.questions[index].img = file
        }
    }

    self.sthChanged = function() {
        self.saved = false
    }

    function add() {
        var question = new Question()
        question.set('quesair', self.quesair)
        question.set('question', '')
        question.set('options', ['', '', '', ''])
        question.save().then(function() {
            getAll()
        })
    }

    function getAll() {
        var query1 = new AV.Query('Quesair')
        var query2 = new AV.Query('Question')
        query1.include('questions')
        query1.get(self.id).then(function(result) {
            self.quesair = result

            query2.equalTo('quesair', result)
            query2.equalTo('isDeleted', false)
            query2.include('img')
            query2.find().then(function(results) {
                self.questions = results
                console.log(results)
                $scope.$apply()
            })
        })
    }
})