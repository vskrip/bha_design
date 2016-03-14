(function(){
	'use strict';

	angular
	.module('bhaProtoApp')
	.controller('Projects.ProjectDetailsController', Controller);

    function Controller($scope, $state, $stateParams, ProjectService) {
			var vm = this;

			vm.title = 'Add Project';
			vm.project = {};
			vm.saveProject = saveProject;

			initController();

			function initController() {
				if ($stateParams.id) {
					vm.title = 'Edit Project';
					vm.project = ProjectService.GetById($stateParams.id);
				}
			}

			function saveProject() {
				console.log('vm.project', vm.project);

				ProjectService.Save(vm.project);

				$state.go('projects');

				$scope.$emit('projects-updated');
			}
		}

})();