angular.module('productController', [])

	// inject the Product service factory into our controller
	.controller('mainController', ['$scope','$http','Products', function($scope, $http, Products) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all products and show them
		// use the service to get all the products
		Products.get()
			.success(function(data) {
				$scope.products = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createProduct = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Products.create($scope.formData)

					// if successful creation, call our get function to get all the new products
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.products = data; // assign our new list of products
					});
			}
		};

		// DELETE ==================================================================
		// delete a product after checking it
		$scope.deleteProduct = function(id) {
			$scope.loading = true;

			Products.delete(id)
				// if successful creation, call our get function to get all the new products
				.success(function(data) {
					$scope.loading = false;
					$scope.products = data; // assign our new list of products
				});
		};
	}]);