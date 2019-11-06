var LibrosController = (function () {
    function LibrosController($scope, librosService) {
        this.$scope = $scope;
        this.librosService = librosService;
        console.trace('LibrosController constructor');
        this.$scope.vm = this;
        $scope.vm.titulo = "Listado de Libros";
        $scope.vm.mensaje = undefined;
        $scope.vm.libros = [];
        librosService.getLibros().then(function (datos) {
            $scope.vm.libros = datos;
            console.debug('datos %o', $scope.vm.libros);
        }, function (errorResponse) {
            console.warn('Respuesta en servicio de controlador %o', errorResponse);
            $scope.vm.mensaje = {
                "texto": "Servicio Rest parado o incorrecto" + errorResponse.status,
                "clase": "danger"
            };
        });
        $scope.vm.editar = function (libro) {
            console.trace('funcion editar');
            $scope.vm.mostrarForm = true;
            $scope.vm.libroEditar = angular.copy(libro);
            $scope.vm.obtenerFormatos();
        };
        $scope.vm.nuevo = function () {
            console.trace('funcion nuevo');
            $scope.vm.mostrarForm = true;
            $scope.vm.obtenerFormatos();
        };
        $scope.vm.borrar = function (id) {
            console.trace('click para eliminar libro por id %s', id);
            librosService.delete(id).then(function (response) {
                console.debug('Llamada Rest OK %o', response);
                $scope.vm.mensaje = {
                    "texto": "OK, el libro ha sido eliminado con exito",
                    "clase": "success"
                };
            }, function (response) {
                console.warn('Llamada Rest ERROR %o', response);
                $scope.vm.mensaje = {
                    "texto": "ERROR, no se ha podido eliminar el libro",
                    "clase": "danger"
                };
            });
        };
        $scope.vm.guardar = function () {
            var lib = $scope.vm.libroEditar;
            console.debug('submitado formulario %o', lib);
            if (lib.id) {
                librosService.modificar(lib.id, lib).then(function (data) {
                    console.debug('Llamada Rest OK %o', data);
                    $scope.vm.mensaje = {
                        "texto": "OK, El libro ha sido modificado con exito",
                        "clase": "success"
                    };
                    $scope.vm.libros.splice(data);
                    $scope.vm.libroEditar = undefined;
                }, function (response) {
                    console.warn('Llamada Rest ERROR %o', response);
                    $scope.vm.mensaje = {
                        "texto": "ERROR, no se ha podido modificar el libro",
                        "clase": "danger"
                    };
                });
            }
            else {
                librosService.crear(lib).then(function (data) {
                    console.debug('Llamada Rest OK %o', data);
                    $scope.vm.mensaje = {
                        "texto": "OK, el libro ha sido creado con exito",
                        "clase": "success"
                    };
                    $scope.vm.libros.push(data);
                    $scope.vm.libroEditar = undefined;
                }, function (response) {
                    console.warn('Llamada Rest ERROR %o', response);
                    $scope.vm.mensaje = {
                        "texto": "ERROR, el libro insertado esta duplicado o su formato no es valido",
                        "clase": "warning"
                    };
                });
            }
        };
        $scope.vm.obtenerFormatos = function () {
            $scope.vm.temp = $scope.vm.libros.filter(function (elem) { return elem.formatos != undefined; });
            var temporal = $scope.vm.temp.map(function (elem) { return elem.formatos; }).flat();
            console.debug('temporales %o', temporal);
            $scope.vm.formatos = temporal.filter(function (v, i, a) { return a.indexOf(v) === i; });
            console.debug("formatos %o", $scope.vm.formatos);
        };
    }
    LibrosController.$inject = ["$scope", "librosService"];
    return LibrosController;
}());
//# sourceMappingURL=LibrosController.js.map