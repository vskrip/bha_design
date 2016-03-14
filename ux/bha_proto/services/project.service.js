(function(){
	'use strict';

	angular
	.module('bhaProtoApp')
	.factory('ProjectService', Service);

	function Service($filter) {

		var service = {};

		service.GetAll = GetAll;
		service.GetById = GetById;
		service.Save = Save;
		service.Delete = Delete;

		return service;

		function GetAll() {
			return getProjects();
		}

		function GetById(id) {
			var filtered = $filter('filter')(getProjects(), { id: id });
			var project = filtered.length ? filtered[0] : null;

			return project;
		}

		function Save(project) {
			var projects = getProjects();

			if (project.id) {

				for (var i = 0; i < projects.length; i++) {
					if (projects[i].id === project.id) {
						projects[i] = project;
						break;
					}
				}
				setProjects(projects);
			} else {

				var lastProject = projects[projects.length - 1] || { id: 0 };
				project.id = lastProject.id + 1;

				projects.push(project);
				setProjects(projects);
			}

			return;
		}

		function Delete(id) {
			var projects = getProjects();
			for (var i = 0; i < projects.length; i++) {
				var project = projects[i];
				if (project.id === id) {
					projects.splice(i, 1);
					break;
				}
			}
			setProjects(projects);

			return;
		}

		function getProjects() {
			if (!localStorage.projects) {
				localStorage.projects = JSON.stringify([]);
			}

			return JSON.parse(localStorage.projects);
		}

		function setProjects(projects) {
			localStorage.projects = JSON.stringify(projects);
		}
	}
})();