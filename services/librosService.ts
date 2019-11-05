interface ILibrosService{

    /**
     * Peticion GET para obtener un array de todos los libros
     * @return angular.IPromise<ILibro[]>
     */
    getLibros():angular.IPromise<ILibro[]>;

    getLibroDetalle(id:number): angular.IPromise<ILibro>;

    delete(id:number): angular.IPromise<boolean>;

    crear(libro: ILibro): angular.IPromise<boolean>;

    /**
     * Modifica un ILibro existente
     * @param id identificador del libro a modificar
     * @param libro nuevos datos a modificar
     * @return true si se modifica, false en caso contrario
     */
    modificar(id:number, libro:ILibro):angular.IPromise<boolean>; 
}

const ENDPOINT= "http://localhost:3000/libros/";

class LibrosService implements ILibrosService {

    private http: ng.IHttpService;
    
    
    constructor($http) {
      this.http = $http;
    }
    
    getLibros = (): angular.IPromise<ILibro[]> => {
        
        return this.http.get<any>(ENDPOINT).then(
            (result)=> {
                console.debug('Peticion correcta %o', result);
                return result.data;
            },
            (result)=>{
                console.debug('Peticcion INcorrecta %o', result);
                return result;
            });
    }

    // TODO poner public los metodos y tipar correctamente
    getLibroDetalle(id: number): angular.IPromise<ILibro> {
        let url = ENDPOINT + id;
        console.log('servicio detalle' + url);
        return this.http.get(url).then(
            (result)=> {
                console.debug('Peticion correcta %o', result);
                return result.data;
            },
            (result)=>{
                console.debug('Peticcion INcorrecta %o', result);
                return result;
            });
    }

    delete(id: number): angular.IPromise<boolean> {
        let url = ENDPOINT + id;
        console.log('servicio eliminar' + url);
        return this.http.delete(url).then(res=>true);
    }

    crear(libro: ILibro): angular.IPromise<boolean> {
        console.log('servicio crear' + ENDPOINT);
        return this.http.post(ENDPOINT, libro).then(result=>true);
    }

    modificar(id: number, libro: ILibro): angular.IPromise<boolean> {
        let url = ENDPOINT + id;
        console.log('servicio modificar' + url);
        return this.http.put(url, libro).then(result=>true);
    }


}