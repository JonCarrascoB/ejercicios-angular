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
    public todasAcciones:any;
    
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

      $scope.vm.contratosSinAccion = $scope.vm.contratosMapeados.filter((e)=> e.numeroAcciones==0);
      console.debug('contratos sin acciones %o',$scope.vm.contratosSinAccion);

      $scope.vm.contratosUnoTres = $scope.vm.contratosMapeados.filter((e)=> e.numeroAcciones>=1 &&e.numeroAcciones<=3);
      console.debug('contratos entre 1 y 3 acciones %o', $scope.vm.contratosUnoTres);

      $scope.vm.contratosMasTres = $scope.vm.contratosMapeados.filter((e)=> e.numeroAcciones>3);
      console.debug('contratos con mas de 3 acciones %o',$scope.vm.contratosMasTres);

      $scope.vm.temporal = $scope.vm.contratos.filter((elem)=> elem.ACCIONES != "" && elem.ACCIONES != undefined);
      $scope.vm.todasAcciones = $scope.vm.temporal.map((elem)=> elem.ACCIONES).filter((v,i,a)=>{
        if(!$scope.vm.temporal.titulo && !$scope.vm.temporal.clave){
          return a.indexOf(v)===i;
        }
      });
      console.debug('acciones %o',$scope.vm.todasAcciones);
      
    } // constructor
  }