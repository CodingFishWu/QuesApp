angular.module('QuesApp')
.controller('IndexCtrl', function($scope, $state, $ionicPopup, Quesair) {
    let self = this
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
                        let title = document.getElementById('popupInput').value
                        if (!title) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault()
                        }
                        else {
                            let quesair = new Quesair()
                            quesair.set('title', title)
                            quesair.save()
                            getAll()
                        }
                    }
                }
            ]
        })
    }

    self.delete = function($index) {
        // console.log(self.quesList[$index])
        // QuesStorage.delete(self.quesList[$index])
        // quesList.splice($index, 1)
        // QuesStorage.save()
    }

    self.edit = function(index) {
        $state.go('create', {id: quesList[index].id})
    }

    self.go = function(index) {
        $state.go('question', {id: quesList[index].id})
    }

    function getAll() {
        let query = new AV.Query('Quesair')
        query.find((results) => {
            self.quesList = results
            $scope.$apply()
        })
    }

})