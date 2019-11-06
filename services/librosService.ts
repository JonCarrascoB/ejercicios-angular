interface ILibrosService{

    /**
     * Peticion GET para obtener un array de todos los libros
     * @return angular.IPromise<ILibro[]>
     */
    getLibros():angular.IPromise<ILibro[]>;

    getLibroDetalle(id:number): angular.IPromise<ILibro>;

    delete(id:number): angular.IPromise<any>;

    crear(libro: ILibro): angular.IPromise<any>;

    /**
     * Modifica un ILibro existente
     * @param id identificador del libro a modificar
     * @param libro nuevos datos a modificar
     * @return true si se modifica, false en caso contrario
     */
    modificar(id:number, libro:ILibro):angular.IPromise<any>; 
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

    delete(id: number): angular.IPromise<any> {
        let url = ENDPOINT + id;
        console.log('servicio eliminar' + url);
        return this.http.delete(url).then(
            (res)=>{
                console.debug('Peticion correcta %o', res);
                return true;
            });
    }
    
    crear(libro: ILibro): angular.IPromise<any> {
        console.log('servicio POST' + ENDPOINT);
        return this.http.post(ENDPOINT, libro).then(
            (result)=>{
                console.debug('Peticion correcta %o', result);
                return result.data;
            });
    }
    
    modificar(id: number, libro: ILibro): angular.IPromise<any> {
        let url = ENDPOINT + id;
        console.log('servicio PUT' + url);
        return this.http.put(url, libro).then(
            (result)=>{
                console.debug('Peticion correcta %o', result);
                return result.data;
            });
    }


}