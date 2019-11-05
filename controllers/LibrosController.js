var LibrosController = (function () {
    function LibrosController($scope, librosService) {
        this.$scope = $scope;
        this.librosService = librosService;
        console.trace('LibrosController constructor');
        this.$scope.vm = this;
        $scope.vm.titulo = "Listado de Libros";
        $scope.vm.libros = [];
        librosService.getLibros().then(function (datos) {
            $scope.vm.libros = datos;
            console.debug('datos %o', $scope.vm.libros);
        });
        $scope.vm.nuevo = function () {
            console.trace('funcion nuevo');
            $scope.vm.mostrarForm = true;
        };
        $scope.vm.editar = function (libro) {
            console.trace('funcion editar');
            $scope.vm.mostrarForm = true;
            $scope.vm.libroEditar = libro;
            $scope.vm.obtenerFormatos();
        };
        $scope.vm.crear = function (valido) {
            if (!valido) {
                return;
            }
            else {
                console.debug('pulsado el boton de guardar');
                librosService.crear($scope.vm.libroEditar).then(function (response) {
                    console.debug('Llamada Rest OK %o', response);
                    $scope.vm.creado = true;
                    $scope.vm.mensaje = {
                        "texto": "<strong>OK</strong>, el libro ha sido creado con exito",
                        "clase": "success"
                    };
                }, function (response) {
                    console.warn('Llamada Rest ERROR %o', response);
                    $scope.vm.mensaje = {
                        "texto": "<strong>Error</strong>, el libro insertado esta duplicado o su formato no es valido",
                        "clase": "warning"
                    };
                });
            }
        };
        $scope.vm.modificar = function (valido) {
            if (!valido) {
                return;
            }
            else {
                console.debug('pulsado el boton de guardar');
                librosService.modificar($scope.vm.libroEditar.id, $scope.vm.libroEditar).then(function (response) {
                    console.debug('Llamada Rest OK %o', response);
                    $scope.vm.modificado = true;
                    $scope.vm.mensaje = {
                        "texto": "<strong>OK</strong>, El libro ha sido modificado con exito",
                        "clase": "success"
                    };
                }, function (response) {
                    console.warn('Llamada Rest ERROR %o', response);
                    $scope.vm.mensaje = {
                        "texto": "<strong>Error</strong>, no se ha podido modificar el libro",
                        "clase": "danger"
                    };
                });
            }
        };
        $scope.vm.borrar = function (id) {
            console.trace('click para eliminar libro por id %o', id);
            if (confirm('¿Estas seguro?')) {
                var p2 = librosService.delete(id);
                p2.then(function (response) {
                    console.debug('Llamada Rest OK %o', response);
                    $scope.vm.mensaje = {
                        "texto": "<strong>OK</strong>, el libro ha sido eliminada con exito",
                        "clase": "success"
                    };
                }, function (response) {
                    console.warn('Llamada Rest ERROR %o', response);
                    $scope.vm.mensaje = {
                        "texto": "<strong>Error</strong>, no se ha podido eliminar el libro",
                        "clase": "danger"
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