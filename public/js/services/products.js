angular.module('productService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Products', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/products');
			},
			create : function(productData) {
				return $http.post('/api/products', productData);
			},
			update : function(product) {
				return $http.put('/api/products/'+product._id, product);
			},
			delete : function(id) {
				return $http.delete('/api/products/' + id);
			}
		}
	}]);