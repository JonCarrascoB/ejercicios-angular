interface IFormato{
    id: number;
    titulo: string;
}

interface ILibro{
    titulo: string;
    isbn: string;
    id: number;
    numeroPaginas: number;
    autor: string;
    digital: boolean;
    formatos?: IFormato[]; //indica si es opcional el parametro
}