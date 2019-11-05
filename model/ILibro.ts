interface ILibro{
    titulo: string;
    isbn: string;
    id: number;
    numeroPaginas: number;
    autor: string;
    digital: boolean;
    formatos?: Array<string>; //? = indica si es opcional el parametro
}