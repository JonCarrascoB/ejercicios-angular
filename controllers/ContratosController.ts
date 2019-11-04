interface IContratoResumen{
  id: string;
  nombre: string;
  numeroAcciones: number;
}
interface IContratosControllerScope extends ng.IScope {
    vm: ContratosController;
  }
  class ContratosController implements ng.IController {
    
    public titulo: string;
    public contratos: any;
    public contratosMapeados: Array<IContratoResumen>;
    public contratosSinAccion:Array<IContratoResumen>;
    public contratosUnoTres:Array<IContratoResumen>;
    public contratosMasTres:Array<IContratoResumen>;
    public temporal:any;
    public temp:any;
    public vuelta:any;
    public todasAcciones:any;
    public primerContrato: any;
    public ultimoContrato: any;
    
    public static $inject = ["$scope", "contratosJson"];
  
    constructor(private $scope: IContratosControllerScope, private contratosJson:any ) {
  
      console.debug('ContratosController constructor');
      $scope.vm = this;
      $scope.vm.titulo = "Contratos titulo";
      $scope.vm.contratos = this.contratosJson;

      $scope.vm.contratosMapeados=$scope.vm.contratos.map((elem)=>{
        return {
          "id": elem.idColumn,
          "nombre":(elem.nombre)?elem.nombre:"Sin Nombre",
          "numeroAcciones":(elem.ACCIONES)?elem.ACCIONES.length:0
        }
      });
      console.debug('contratos mapeados %o',$scope.vm.contratosMapeados);

      // filtro para obtener todos los contratos sin acciones
      $scope.vm.contratosSinAccion = $scope.vm.contratosMapeados.filter((e)=> e.numeroAcciones==0);
      console.debug('contratos sin acciones %o',$scope.vm.contratosSinAccion);

      // filtro para obtener los contratos entre 1 y 3 acciones
      $scope.vm.contratosUnoTres = $scope.vm.contratosMapeados.filter((e)=> e.numeroAcciones>=1 &&e.numeroAcciones<=3);
      console.debug('contratos entre 1 y 3 acciones %o', $scope.vm.contratosUnoTres);

      // filtro para obtener los contratos más de 3 acciones
      $scope.vm.contratosMasTres = $scope.vm.contratosMapeados.filter((e)=> e.numeroAcciones>3);
      console.debug('contratos con mas de 3 acciones %o',$scope.vm.contratosMasTres);

      // filtro para obtener todos los contratos con acciones
      $scope.vm.temporal = $scope.vm.contratos.filter((elem)=> elem.ACCIONES != "" && elem.ACCIONES != undefined);
      console.debug('temporales %o', $scope.vm.temporal);

      //filtro para obtener todos los tipos de contratos
      $scope.vm.temp = $scope.vm.temporal.map((elem)=>elem.ACCIONES.map(e => e.titulo).flat());
      $scope.vm.todasAcciones = $scope.vm.temp.flat().filter((v,i,a)=> a.indexOf(v)===i);
      console.debug('temporales unidos %o',$scope.vm.temp);
      console.debug('acciones %o',$scope.vm.todasAcciones);

      // filtro para encontrar el primer contrato con clave SITUACION
      $scope.vm.primerContrato = $scope.vm.temporal.find((elem)=>elem.ACCIONES.filter((elem)=>elem.clave === 'SITUACION' ));
      console.debug('primer contrato %o',$scope.vm.primerContrato);

      // filtro para encontrar el ultimo contrato con clave SITUACION
      //$scope.vm.vuelta = $scope.vm.temporal.reverse();
      //console.debug('cambio orden %o', $scope.vm.vuelta);
      $scope.vm.ultimoContrato = $scope.vm.temporal.reverse().find((e)=>e.ACCIONES.filter((e)=>e.clave === 'SITUACION' ));
      console.debug('ultimo contrato %o', $scope.vm.ultimoContrato);

    } // constructor
  }