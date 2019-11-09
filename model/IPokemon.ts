interface IAbility{
    "name": string;
    "url": string;
}

interface IAbilities{
    "ability": IAbility;
    "is_hidden": boolean;
    "slot": number;
}

interface IForms{
    "name": string;
    "url": string;
}

interface IVersion{
    "name": string;
    "url": string;
}

interface IGameIndices{
    "game_index": number;
    "version": IVersion;
}

interface IItem{
    "name": string;
    "url": string;
}

interface IVersionDetails{
    "rarity": number;
    "version": IVersion;
}

interface IHeldItems{
    "item": IItem;
    "version_details": IVersionDetails;
}

interface IMove {
    "name": string;
    "url": string;
}
interface IMoveLearnMethod{
    "name": string;
    "url": string;
}
interface IVersionGroup {
    "name": string;
    "url": string;
}
interface IVersionGroupDetails{
    "level_learned_at": number;
    "move_learn_method": IMoveLearnMethod;
    "version_group": IVersionGroup
}

interface IMoves{
    "move": IMove;
    "version_group_details":IVersionGroupDetails;
}

interface ISpecies{
    "name": string;
    "url": string;
}

interface ISprites{
    "back_default": string;
    "back_female": string;
    "back_shiny": string;
    "back_shiny_female": string;
    "front_default": string;
    "front_female": string;
    "front_shiny": string;
    "front_shiny_female": string;
}
interface IStat{
    "name": string;
    "url": string;
}
interface IStats {
    "base_stat": number;
    "effort": number;
    "stat": IStat;
}

interface IType{
    "name": string;
    "url": string;
}
interface ITypes{
    "slot": number;
    "type": IType;
}

interface IPokemon{

    "abilities": IAbilities;
    "base_experience": number;
    "forms": IForms;
    "game_indices": IGameIndices;
    "height": number;
    "held_items": IHeldItems;
    "id": number;
    "is_default": boolean;
    "location_area_encounters": string;
    "moves": IMoves;
    "name": string;
    "order": number;
    "species": ISpecies;
    "sprites": ISprites;
    "stats": IStats;
    "types": ITypes;
    "weight": number;
}
