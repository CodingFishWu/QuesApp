angular.module('QuesApp')
.controller('IndexCtrl', function($scope, $state, $ionicPopup, Quesair) {
    var self = this
    getAll()
    
    self.add = function() {
        $ionicPopup.show({
            template: '<input type="text" id="popupInput">',
            title: 'Enter The Title',
            subTitle: 'Will show in the begining of the questions',
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        var title = document.getElementById('popupInput').value
                        if (!title) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault()
                        }
                        else {
                            var quesair = new Quesair()
                            quesair.set('title', title)
                            quesair.save().then(function() {
                                getAll()
                            })
                        }
                    }
                }
            ]
        })
    }

    self.delete = function($index) {
        $ionicPopup.confirm({
            title: 'Confirm Delete?',
            template: 'The action can\'t be restore, are you sure?'
        }).then(function(res) {
            if (res) {
                var quesair = self.quesList[$index]
                quesair.set('isDeleted', true)
                quesair.save().then(function() {
                    self.quesList.splice($index, 1)
                    $scope.$apply()
                })
            }
            else {
                return
            }
        });
    }

    self.edit = function(index) {
        $state.go('create', {id: self.quesList[index].id})
    }

    self.go = function(index) {
        $state.go('question', {id: self.quesList[index].id})
    }

    function getAll() {
        var query = new AV.Query('Quesair')
        query.equalTo('isDeleted', false)
        query.find(function(results) {
            self.quesList = results
            $scope.$apply()
        })
    }

})