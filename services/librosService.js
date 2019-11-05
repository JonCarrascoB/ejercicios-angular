var ENDPOINT = "http://localhost:3000/libros/";
var LibrosService = (function () {
    function LibrosService($http) {
        var _this = this;
        this.getLibros = function () {
            return _this.http.get(ENDPOINT).then(function (result) {
                console.debug('Peticion correcta %o', result);
                return result.data;
            }, function (result) {
                console.debug('Peticcion INcorrecta %o', result);
                return result;
            });
        };
        this.http = $http;
    }
    LibrosService.prototype.getLibroDetalle = function (id) {
        var url = ENDPOINT + id;
        console.log('servicio detalle' + url);
        return this.http.get(url).then(function (result) {
            console.debug('Peticion correcta %o', result);
            return result.data;
        }, function (result) {
            console.debug('Peticcion INcorrecta %o', result);
            return result;
        });
    };
    LibrosService.prototype.delete = function (id) {
        var url = ENDPOINT + id;
        console.log('servicio eliminar' + url);
        return this.http.delete(url).then(function (res) { return true; });
    };
    LibrosService.prototype.crear = function (libro) {
        console.log('servicio crear' + ENDPOINT);
        return this.http.post(ENDPOINT, libro).then(function (result) { return true; });
    };
    LibrosService.prototype.modificar = function (id, libro) {
        var url = ENDPOINT + id;
        console.log('servicio modificar' + url);
        return this.http.put(url, libro).then(function (result) { return true; });
    };
    return LibrosService;
}());
//# sourceMappingURL=librosService.js.map