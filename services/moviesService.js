var ENDPOINT1 = "http://www.omdbapi.com/?apikey=16d32677&t=";
var MoviesService = (function () {
    function MoviesService($http) {
        var _this = this;
        this.getMovies = function (search) {
            var url = ENDPOINT1 + search;
            return _this.http.get(url).then(function (result) {
                console.debug('Peticion correcta %o', result);
                return result.data;
            }, function (result) {
                console.debug('Peticcion INcorrecta %o', result);
                return result;
            });
        };
        this.http = $http;
    }
    return MoviesService;
}());
//# sourceMappingURL=moviesService.js.map