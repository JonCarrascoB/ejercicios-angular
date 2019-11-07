var MoviesController = (function () {
    function MoviesController($scope, moviesService) {
        this.$scope = $scope;
        this.moviesService = moviesService;
        console.trace('MoviesController constructor');
        this.$scope.vm = this;
        $scope.vm.titulo = "Buscador de Productos Multimedia (Peliculas, Series, etc)";
        $scope.vm.mensaje = undefined;
        $scope.vm.movie;
        $scope.vm.buscar = function () {
            moviesService.getMovies($scope.vm.search).then(function (datos) {
                $scope.vm.movie = datos;
                console.debug('datos %o', $scope.vm.movie);
                $scope.vm.guionistas = $scope.vm.movie.Writer.split(",");
                $scope.vm.actores = $scope.vm.movie.Actors.split(",");
                $scope.vm.lenguajes = $scope.vm.movie.Language.split(",");
                $scope.vm.temporal = $scope.vm.movie.Ratings.map(function (elem) { return elem.Source; });
                $scope.vm.etiquetas = $scope.vm.temporal.concat('Metascore', 'IMDB');
                $scope.vm.ratioTemp = $scope.vm.movie.Ratings.map(function (elem) { return elem.Value; });
                $scope.vm.ratio = $scope.vm.ratioTemp.concat($scope.vm.movie.Metascore, $scope.vm.movie.imdbRating);
            }, function (errorResponse) {
                console.warn('Respuesta en servicio de controlador %o', errorResponse);
                $scope.vm.mensaje = {
                    "texto": "Servicio Rest parado o incorrecto" + errorResponse.status,
                    "clase": "danger"
                };
            });
        };
    }
    MoviesController.$inject = ["$scope", "moviesService"];
    return MoviesController;
}());
//# sourceMappingURL=MoviesController.js.map