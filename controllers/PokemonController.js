var PokemonController = (function () {
    function PokemonController($scope, pokemonService) {
        this.$scope = $scope;
        this.pokemonService = pokemonService;
        console.trace('PokemonController constructor');
        this.$scope.vm = this;
        $scope.vm.titulo = "Listado de Pokemons";
        $scope.vm.mensaje = undefined;
        pokemonService.getPokemon().then(function (datos) {
            $scope.vm.pokedex = datos;
            console.debug('datos %o', $scope.vm.pokedex);
        }, function (errorResponse) {
            console.warn('Respuesta en servicio de controlador %o', errorResponse);
            $scope.vm.mensaje = {
                "texto": "Servicio Rest parado o incorrecto" + errorResponse.status,
                "clase": "danger"
            };
        });
        $scope.vm.detallar = function (poke) {
            pokemonService.getPokeDetalle(poke).then(function (datos) {
                $scope.vm.pokemon = datos;
                console.debug('datos %o', $scope.vm.pokemon);
            }, function (errorResponse) {
                console.warn('Respuesta en servicio de controlador %o', errorResponse);
                $scope.vm.mensaje = {
                    "texto": "Servicio Rest parado o incorrecto" + errorResponse.status,
                    "clase": "danger"
                };
            });
        };
    }
    PokemonController.$inject = ["$scope", "pokemonService"];
    return PokemonController;
}());
//# sourceMappingURL=PokemonController.js.map