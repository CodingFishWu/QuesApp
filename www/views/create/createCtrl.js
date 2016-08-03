angular.module('QuesApp')
.controller('CreateCtrl', function($state, $stateParams, $window, $ionicPopup, QuesStorage) {
    let self = this
    self.saved = true
    self.saving = false
    self.quesList = QuesStorage.all()

    self.title = $stateParams.title
    self.questions = angular.copy(QuesStorage.get(self.title).questions)

    if (self.questions == []) {
        add()
    }

    self.save = function() {
        self.saving = true
        let flag = false
        for (item of quesList) {
            if (item.title = self.title) {
                item.questions = self.questions
                flag = true
            }
        }
        if (!flag) {
            quesList.push({title: self.title, questions: self.questions})
        }
        QuesStorage.save(self.questions)
        self.saving = false
        self.saved = true
        console.log(QuesStorage.all())
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
        self.questions.push({
            question: '',
            options: ['', '', '', '']
        })
    }
})