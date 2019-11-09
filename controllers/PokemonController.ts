interface IPokemonControllerScope extends ng.IScope {
    vm: PokemonController;
  }
  class PokemonController implements ng.IController {
    
    public titulo: string;
    public pokedex: any;
    public mensaje: any;
    public pokemon: any;
    public tipos:any;

    //funciones
    public detallar: any;
    
    public static $inject = ["$scope", "pokemonService"];
  
    constructor(private $scope: IPokemonControllerScope, private pokemonService:IPokemonService ) {
        console.trace('PokemonController constructor');
        this.$scope.vm = this;
        $scope.vm.titulo = "Listado de Pokemons";
        $scope.vm.mensaje = undefined;
        
       

        pokemonService.getPokemon().then(
            (datos)=>{
                $scope.vm.pokedex = datos;
                console.debug('datos %o', $scope.vm.pokedex);
            },
            (errorResponse)=>{
                console.warn('Respuesta en servicio de controlador %o', errorResponse);
                $scope.vm.mensaje= {
                    "texto":"Servicio Rest parado o incorrecto" + errorResponse.status,
                    "clase":"danger"
                    }
            });

            

        /* FUNCIONES
        **********************************************************************************/
        $scope.vm.detallar = (poke:string) =>{
            pokemonService.getPokeDetalle(poke).then(
                (datos)=>{
                    $scope.vm.pokemon = datos;
                    console.debug('datos %o', $scope.vm.pokemon);

                },
                (errorResponse)=>{
                    console.warn('Respuesta en servicio de controlador %o', errorResponse);
                    $scope.vm.mensaje= {
                        "texto":"Servicio Rest parado o incorrecto" + errorResponse.status,
                        "clase":"danger"
                    }
                }
            );
        }
        

    

    }

    
  }