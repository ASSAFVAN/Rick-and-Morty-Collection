export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
    };
    image: string;
    location: {
        name: string;
    };
}

export interface Info {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
}

export interface CharacterResponse {
    info: Info; 
    results: Character[];
}