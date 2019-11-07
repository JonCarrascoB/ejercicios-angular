var ENDPOINT = "http://localhost:3000/libros/";
var LibrosService = (function () {
    function LibrosService($http) {
        var _this = this;
        this.getLibros = function () {
            return _this.http.get(ENDPOINT).then(function (result) {
                console.debug('Peticion correcta %o', result);
                return result.data;
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
        return this.http.delete(url).then(function (res) {
            console.debug('Peticion correcta %o', res);
            return res.data;
        });
    };
    LibrosService.prototype.crear = function (libro) {
        console.log('servicio POST' + ENDPOINT);
        return this.http.post(ENDPOINT, libro).then(function (result) {
            console.debug('Peticion correcta %o', result);
            return result.data;
        });
    };
    LibrosService.prototype.modificar = function (id, libro) {
        var url = ENDPOINT + id;
        console.log('servicio PUT' + url);
        return this.http.put(url, libro).then(function (result) {
            console.debug('Peticion correcta %o', result);
            return result.data;
        });
    };
    return LibrosService;
}());
//# sourceMappingURL=librosService.js.map