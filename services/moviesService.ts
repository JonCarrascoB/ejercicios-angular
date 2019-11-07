interface IMoviesService{
    /**
     * Peticion GET para obtener una movie buscada desde la API externa
     * @see http://www.omdbapi.com/
     * @return angular.IPromise<IMovie>
     */
    getMovies(search:string):angular.IPromise<IMovie>;
}

const ENDPOINT1= "http://www.omdbapi.com/?apikey=16d32677&t=";

class MoviesService implements IMoviesService {

    private http: ng.IHttpService;
    
    constructor($http) {
      this.http = $http;
    }
    
    getMovies = (search:string): angular.IPromise<IMovie> => {
        let url = ENDPOINT1 + search;
        return this.http.get<any>(url).then(
            (result)=> {
                console.debug('Peticion correcta %o', result);
                return result.data;
            },
            (result)=>{
                console.debug('Peticcion INcorrecta %o', result);
                return result;
            });
    }

}