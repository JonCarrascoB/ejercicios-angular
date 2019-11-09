var ENDPOINT_POKETOTAL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000";
var ENDPOINT_POKE = "https://pokeapi.co/api/v2/pokemon/";
var PokemonService = (function () {
    function PokemonService($http) {
        var _this = this;
        this.getPokemon = function () {
            return _this.http.get(ENDPOINT_POKETOTAL).then(function (result) {
                console.debug('Peticion correcta %o', result);
                return result.data;
            });
        };
        this.http = $http;
    }
    PokemonService.prototype.getPokeDetalle = function (poke) {
        var url = ENDPOINT_POKE + poke;
        console.log('servicio detalle' + url);
        return this.http.get(url).then(function (result) {
            console.debug('Peticion correcta %o', result);
            return result.data;
        }, function (result) {
            console.debug('Peticcion INcorrecta %o', result);
            return result;
        });
    };
    return PokemonService;
}());
//# sourceMappingURL=pokemonService.js.map