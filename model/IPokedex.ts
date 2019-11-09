interface IResults{
    "name": string;
    "url":string;
}
interface IPokedex{
    "count": number;
    "results": IResults;
}