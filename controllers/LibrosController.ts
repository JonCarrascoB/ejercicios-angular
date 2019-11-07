interface ILibrosControllerScope extends ng.IScope {
    vm: LibrosController;
  }
  class LibrosController implements ng.IController {
    
    public titulo: string;
    public libros: Array<ILibro>;
    public mensaje: any;
    public valido: any;
    
    public libroEditar:ILibro;
    public libroBorrar:ILibro;

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
        $scope.vm.formatos=["pdf", "epub", "opf","mobi"];

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
            //$scope.vm.obtenerFormatos(libro.id);

        } 
        $scope.vm.nuevo = () =>{
            //let id;
            console.trace('funcion nuevo');
            $scope.vm.mostrarForm = true;
            //$scope.vm.obtenerFormatos(id);
        }

        $scope.vm.borrar = ()=> {
            let id = $scope.vm.libroBorrar.id;
            console.trace('click para eliminar libro por id %s', id);
            librosService.delete(id).then(
                (response) => {
                  console.debug('Llamada Rest OK %o', response);
                  const indice = $scope.vm.libros.indexOf($scope.vm.libroBorrar)
                  $scope.vm.libros.splice(indice,1);
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
            let formatTemp = lib.formatos.filter((elem)=>elem.titulo );
            console.debug('formatos temp %o', formatTemp);


            //validaciones
            if(!lib.digital){
                lib.formatos = undefined;
            }

            //validar si es digital, con al menos un formato
            if(lib.digital && !lib.formatos){
                $scope.vm.mensaje = {
                    "texto": "*Es necesario elegir algún tipo de formato digital",
                    "clase": "warning"
                }
                return false; //break de Java
            }
            
            if(lib.id){ // modificar
                librosService.modificar(lib.id,lib).then(
                    (data) =>{
                        console.debug('Llamada Rest OK %o', data);
                        $scope.vm.mensaje = {
                            "texto": "OK, El libro ha sido modificado con exito",
                            "clase": "success"
                        }
                        const indice = $scope.vm.libros.indexOf($scope.vm.$scope.vm.libroEditar)
                        $scope.vm.libros.splice(indice,1);
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
         * Funcion para obtener los formatos registrados de forma dinamica desde los datos almacenados en el json
         */
        $scope.vm.obtenerFormatos = (id) => {
            $scope.vm.temp = $scope.vm.libros.filter((elem)=>elem.formatos != undefined);
            let temporal = $scope.vm.temp.map((elem)=>elem.formatos.map((elem)=>elem.titulo).flat());
            console.debug('temporales %o',  temporal);
            if(temporal.length > 0 && id){
                $scope.vm.formatos = temporal.flat().filter((v,i,a)=>a.indexOf(v)===i);
            }
            console.debug("formatos %o", $scope.vm.formatos)
        } 

    }

    
  }