interface ILibrosControllerScope extends ng.IScope {
    vm: LibrosController;
  }
  class LibrosController implements ng.IController {
    
    public titulo: string;
    public libros: Array<ILibro>;
    public mensaje: any;
    public valido: any;
    
    public libroEditar:ILibro;
    public mostrarForm:boolean;
    
    //funciones
    public obtenerFormatos:any;
    public editar:any;
    public nuevo:any;
    public modificar:any;
    public borrar:any;
    public crear:any;
    public formatos:any;
    public temp:any;
    public guardar:any;
    
    public static $inject = ["$scope", "librosService"];
  
    constructor(private $scope: ILibrosControllerScope, private librosService:ILibrosService ) {
        console.trace('LibrosController constructor');
        this.$scope.vm = this;
        $scope.vm.titulo = "Listado de Libros";
        $scope.vm.mensaje = undefined;
        $scope.vm.libros=[];

        librosService.getLibros().then(
            (datos)=>{
            $scope.vm.libros = datos;
            console.debug('datos %o', $scope.vm.libros);
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
        $scope.vm.editar = (libro:ILibro) =>{
            console.trace('funcion editar');
            $scope.vm.mostrarForm = true;
            $scope.vm.libroEditar = angular.copy(libro); // angular.copy() clona el objeto y no 
            $scope.vm.obtenerFormatos();

        } 
        $scope.vm.nuevo = () =>{
            console.trace('funcion nuevo');
            $scope.vm.mostrarForm = true;
            $scope.vm.obtenerFormatos();
        }

        $scope.vm.borrar = (id:number)=> {
            console.trace('click para eliminar libro por id %s', id);
            librosService.delete(id).then(
                (response) => {
                  console.debug('Llamada Rest OK %o', response);
                  $scope.vm.mensaje = {
                    "texto": "OK, el libro ha sido eliminado con exito",
                    "clase": "success"
                  }
                },
                (response) => {
                  console.warn('Llamada Rest ERROR %o', response);
                  $scope.vm.mensaje = {
                    "texto": "ERROR, no se ha podido eliminar el libro",
                    "clase": "danger"
                  }
                }
            );
        }; // eliminar

        $scope.vm.guardar = () =>{
            const lib = $scope.vm.libroEditar;
            console.debug('submitado formulario %o', lib);
            if(lib.id){ // modificar
                librosService.modificar(lib.id,lib).then(
                    (data) =>{
                        console.debug('Llamada Rest OK %o', data);
                        $scope.vm.mensaje = {
                            "texto": "OK, El libro ha sido modificado con exito",
                            "clase": "success"
                        }
                        $scope.vm.libros.splice(data);
                        $scope.vm.libroEditar = undefined;
                    },
                    (response)=>{
                        console.warn('Llamada Rest ERROR %o', response);
                        $scope.vm.mensaje = {
                            "texto": "ERROR, no se ha podido modificar el libro",
                            "clase": "danger"
                        }
                    }
                )  // modificar
            } else { // crear nuevo
                librosService.crear(lib).then(
                    (data) => {
                        console.debug('Llamada Rest OK %o', data);
                        $scope.vm.mensaje = {
                          "texto": "OK, el libro ha sido creado con exito",
                          "clase": "success"
                        }
                        $scope.vm.libros.push(data);
                        $scope.vm.libroEditar = undefined;
                    },
                    (response)=>{
                        console.warn('Llamada Rest ERROR %o', response);
                        $scope.vm.mensaje = {
                            "texto": "ERROR, el libro insertado esta duplicado o su formato no es valido",
                            "clase": "warning"
                        }
                    }
                ) // end crear
            }
        }


        /**
         * Funcion para obtener los formatos de forma dinamica desde los datos almacenados en el json
         */
        $scope.vm.obtenerFormatos = () =>{
            $scope.vm.temp = $scope.vm.libros.filter((elem)=>elem.formatos != undefined);
            let temporal = $scope.vm.temp.map((elem)=>elem.formatos).flat();
            console.debug('temporales %o',  temporal);
          
            $scope.vm.formatos = temporal.filter((v,i,a)=>a.indexOf(v)===i);
            console.debug("formatos %o", $scope.vm.formatos)
        } 

    }

    
  }