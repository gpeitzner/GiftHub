export interface Card {
    id: string;
    name: string;
    image: string;
    chargeRate: number;
    active: boolean;
    availability: number[];
}

export interface Card2 {
    id: string;
    name: string;
    image: string;
    chargeRate: number;
    Precio: number;
    Cantidad: number;
    availability: number[];
}

export interface Card3 {
    nombre: string;
    cantidad: number;
    precio: number;
    total: number;
    imagen: string;
    chargeRate: number;
    cantidadActual: number;
    cantidadAnterior: number;
    customIdName: string;
}
