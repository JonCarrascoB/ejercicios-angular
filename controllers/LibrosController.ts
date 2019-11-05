interface ILibrosControllerScope extends ng.IScope {
    vm: LibrosController;
  }
  class LibrosController implements ng.IController {
    
    public titulo: string;
    public libros: Array<ILibro>;
    public mensaje: any;
    
    public libroEditar:ILibro;

    public mostrarForm:boolean;
    public modificado:boolean;
    public creado:boolean;
    
    //funciones
    public obtenerFormatos:any;
    public editar:any;
    public nuevo:any;
    public modificar:any;
    public borrar:any;
    public crear:any;
    public formatos:any;
    public temp:any;
   
   
    public static $inject = ["$scope", "librosService"];
  
    constructor(private $scope: ILibrosControllerScope, private librosService:ILibrosService ) {
        console.trace('LibrosController constructor');
        this.$scope.vm = this;
        $scope.vm.titulo = "Listado de Libros";
        $scope.vm.libros=[];
        
        librosService.getLibros().then((datos)=>{
            $scope.vm.libros = datos;
            console.debug('datos %o', $scope.vm.libros);
        });

        // funciones
        $scope.vm.nuevo = ()=>{
            console.trace('funcion nuevo');
            $scope.vm.mostrarForm = true;
        }

        $scope.vm.editar = (libro)=>{
            console.trace('funcion editar');
            $scope.vm.mostrarForm = true;
            $scope.vm.libroEditar = libro;
            $scope.vm.obtenerFormatos();
        }

        $scope.vm.crear = (valido) =>{
            if(!valido){ // NO ha pasado la validacion del formulario
                return;
            } else { // SI ha pasado la validacion
                console.debug('pulsado el boton de guardar');
                librosService.crear($scope.vm.libroEditar).then(
                    (response) => {
                        console.debug('Llamada Rest OK %o', response);
                        $scope.vm.creado = true;
                        $scope.vm.mensaje = {
                          "texto": "<strong>OK</strong>, el libro ha sido creado con exito",
                          "clase": "success"
                        }  
                    },
                    (response)=>{
                        console.warn('Llamada Rest ERROR %o', response);
                        $scope.vm.mensaje = {
                            "texto": "<strong>Error</strong>, el libro insertado esta duplicado o su formato no es valido",
                            "clase": "warning"
                        }
                    }
                )
            }
        } // end crear

        $scope.vm.modificar = (valido) =>{
            if(!valido){ // NO ha pasado la validacion del formulario
                return;
            } else { // SI ha pasado la validacion
                console.debug('pulsado el boton de guardar');
                librosService.modificar($scope.vm.libroEditar.id,$scope.vm.libroEditar).then(
                    (response) =>{
                        console.debug('Llamada Rest OK %o', response);
                        $scope.vm.modificado = true;
                        $scope.vm.mensaje = {
                            "texto": "<strong>OK</strong>, El libro ha sido modificado con exito",
                            "clase": "success"
                        }
                    },
                    (response)=>{
                        console.warn('Llamada Rest ERROR %o', response);
                        $scope.vm.mensaje = {
                            "texto": "<strong>Error</strong>, no se ha podido modificar el libro",
                            "clase": "danger"
                        }
                    }
                )
            }
        } // modificar

        $scope.vm.borrar =(id)=> {
            console.trace('click para eliminar libro por id %o', id);
            if(confirm('¿Estas seguro?')){
              let p2 = librosService.delete(id);
              p2.then(
                response=>{
                  console.debug('Llamada Rest OK %o', response);
                  $scope.vm.mensaje = {
                    "texto": "<strong>OK</strong>, el libro ha sido eliminada con exito",
                    "clase": "success"
                  }
                },
                response=>{
                  console.warn('Llamada Rest ERROR %o', response);
                  $scope.vm.mensaje = {
                    "texto": "<strong>Error</strong>, no se ha podido eliminar el libro",
                    "clase": "danger"
                  }
                }
              );
            } // confirm
            
          }; // eliminar


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