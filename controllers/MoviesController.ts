interface IMoviesControllerScope extends ng.IScope {
    vm: MoviesController;
  }
  class MoviesController implements ng.IController {
    
    public titulo: string;
    public movie: IMovie;
    public mensaje: any;
    public search:any;
    public guionistas:any;
    public actores:any;
    public lenguajes:any;
    public etiquetas:any;
    public series:any;
    public temporal:any;
    public ratioTemp:any;
    public ratio:any;

    public buscar:any;

    public static $inject = ["$scope", "moviesService"];
  
    constructor(private $scope: IMoviesControllerScope, private moviesService:IMoviesService ) {
        console.trace('MoviesController constructor');
        this.$scope.vm = this;
        $scope.vm.titulo = "Buscador de Productos Multimedia (Peliculas, Series, etc)";
        $scope.vm.mensaje = undefined;
        $scope.vm.movie;

        $scope.vm.buscar = () =>{
            moviesService.getMovies($scope.vm.search).then(
                (datos)=>{
                $scope.vm.movie = datos;
                console.debug('datos %o', $scope.vm.movie);

                $scope.vm.guionistas = $scope.vm.movie.Writer.split(",");
                $scope.vm.actores = $scope.vm.movie.Actors.split(",");
                $scope.vm.lenguajes = $scope.vm.movie.Language.split(",");

                $scope.vm.temporal = $scope.vm.movie.Ratings.map((elem)=>elem.Source);
                $scope.vm.etiquetas = $scope.vm.temporal.concat('Metascore','IMDB');
                
                $scope.vm.ratioTemp = $scope.vm.movie.Ratings.map((elem)=>elem.Value);
                $scope.vm.ratio = $scope.vm.ratioTemp.concat($scope.vm.movie.Metascore,$scope.vm.movie.imdbRating);
                
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
        


    } // end constructor

  }