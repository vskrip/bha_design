(function(){
	'use strict';

	angular
	.module('bhaProtoApp')
	.controller('Projects.ProjectController', Controller);

	function Controller($scope, ProjectService) {
		var vm = this;

		vm.projects = [];
		vm.deleteProject = deleteProject;

		initController();

		function initController() {
			loadProjects();

			$scope.$on('projects-updated', loadProjects);
		}

		function loadProjects() {
			vm.projects = ProjectService.GetAll();
		}

		function deleteProject(id) {
			ProjectService.Delete(id);
			loadProjects();
		}
	}

})();