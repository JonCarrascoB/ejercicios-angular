var ContratosController = (function () {
    function ContratosController($scope, contratosJson) {
        this.$scope = $scope;
        this.contratosJson = contratosJson;
        console.debug('ContratosController constructor');
        $scope.vm = this;
        $scope.vm.titulo = "Contratos titulo";
        $scope.vm.contratos = this.contratosJson;
        $scope.vm.contratosMapeados = $scope.vm.contratos.map(function (elem) {
            return {
                "id": elem.idColumn,
                "nombre": (elem.nombre) ? elem.nombre : "Sin Nombre",
                "numeroAcciones": (elem.ACCIONES) ? elem.ACCIONES.length : 0
            };
        });
        console.debug('contratos mapeados %o', $scope.vm.contratosMapeados);
        $scope.vm.contratosSinAccion = $scope.vm.contratosMapeados.filter(function (e) { return e.numeroAcciones == 0; });
        console.debug('contratos sin acciones %o', $scope.vm.contratosSinAccion);
        $scope.vm.contratosUnoTres = $scope.vm.contratosMapeados.filter(function (e) { return e.numeroAcciones >= 1 && e.numeroAcciones <= 3; });
        console.debug('contratos entre 1 y 3 acciones %o', $scope.vm.contratosUnoTres);
        $scope.vm.contratosMasTres = $scope.vm.contratosMapeados.filter(function (e) { return e.numeroAcciones > 3; });
        console.debug('contratos con mas de 3 acciones %o', $scope.vm.contratosMasTres);
        $scope.vm.temporal = $scope.vm.contratos.filter(function (elem) { return elem.ACCIONES != "" && elem.ACCIONES != undefined; });
        console.debug('temporales %o', $scope.vm.temporal);
        $scope.vm.temp = $scope.vm.temporal.map(function (elem) { return elem.ACCIONES.map(function (e) { return e.titulo; }).flat(); });
        $scope.vm.todasAcciones = $scope.vm.temp.flat().filter(function (v, i, a) { return a.indexOf(v) === i; });
        console.debug('temporales unidos %o', $scope.vm.temp);
        console.debug('acciones %o', $scope.vm.todasAcciones);
        $scope.vm.primerContrato = $scope.vm.temporal.find(function (elem) { return elem.ACCIONES.filter(function (elem) { return elem.clave === 'SITUACION'; }); });
        console.debug('primer contrato %o', $scope.vm.primerContrato);
        $scope.vm.ultimoContrato = $scope.vm.temporal.reverse().find(function (e) { return e.ACCIONES.find(function (e) { return e.clave === 'SITUACION'; }); });
        console.debug('ultimo contrato %o', $scope.vm.ultimoContrato);
    }
    ContratosController.$inject = ["$scope", "contratosJson"];
    return ContratosController;
}());
//# sourceMappingURL=ContratosController.js.map