interface IPokemonService{

    /**
     * Peticion GET para obtener un array de todos los pokemons
     * @return angular.IPromise<IPokedex[]> Error angular.IPromise<ng.IHttpResponse<T>>
     */
    getPokemon():angular.IPromise<IPokedex[]>;

    /**
     * Peticion GET para obtener los datos del pokemon seleccionado
     * @param pokemon pokemon seleccionado
     * @return angular.IPromise<IPokemon> Error angular.IPromise<ng.IHttpResponse<T>>
     */
    getPokeDetalle(pokemon: string): angular.IPromise<IPokemon>;

}

const ENDPOINT_POKETOTAL= "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000";
const ENDPOINT_POKE = "https://pokeapi.co/api/v2/pokemon/";

class PokemonService implements IPokemonService {

    private http: ng.IHttpService;
    
    
    constructor($http) {
      this.http = $http;
    }
    
    getPokemon = (): angular.IPromise<IPokedex[]> => {
        return this.http.get<any>(ENDPOINT_POKETOTAL).then(
            (result)=> {
                console.debug('Peticion correcta %o', result);
                return result.data;
            });
    }

   getPokeDetalle(poke: string): angular.IPromise<IPokemon> {
        let url = ENDPOINT_POKE + poke;
        console.log('servicio detalle' + url);
        return this.http.get(url).then(
            (result)=> {
                console.debug('Peticion correcta %o', result);
                return result.data;
            },
            (result)=>{
                console.debug('Peticcion INcorrecta %o', result);
                return result;
            }
        );
    }


}