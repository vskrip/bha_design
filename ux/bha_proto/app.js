(function(){
	'use strict';

	angular
	.module('bhaProtoApp', ['ui.router', 'ngAnimate'])
	.config(config)
	.run(run);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'home/home.html',
			controller: 'Home.HomeController',
			controllerAs: 'vm'
		})
    .state('projects', {
			url: '/projects',
			templateUrl: 'projects/projectList.html',
			controller: 'Projects.ProjectController',
			controllerAs: 'vm'
		})
		.state('projects.add', {
			url: '/add',
			templateUrl: 'projects/projectDetails.html',
			controller: 'Projects.ProjectDetailsController',
			controllerAs: 'vm'
		})
		.state('projects.edit', {
			url: '/edit/:id',
			templateUrl: 'projects/projectDetails.html',
			controller: 'Projects.ProjectDetailsController',
			controllerAs: 'vm'
		})
		;
	}

	function run($rootScope, ProjectService) {
		if (ProjectService.GetAll().length === 0) {
			ProjectService.Save({
				field: 'Labaganskoe',
				site: '5A',
				well: '2043'
			});
			ProjectService.Save({
				field: 'Vstrechnoe',
				site: '1',
				well: '45848'
			});
			ProjectService.Save({
				field: 'Priobskoe',
				site: '336',
				well: '4044'
			});
		}

		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			$rootScope.currentState = toState.name;
		});
	}

})();