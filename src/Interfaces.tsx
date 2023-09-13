export interface PriceData {
    price: number;
    variation: number;
    date: string;
}

export interface IMonthPrompt {
    onValuesSelect: (values: number[]) => void;
}

export interface IOption {
    value: number, 
    text: string
}

export interface Iinvestment {
    pmc: number[],
    numQ: number[],
    soldiFermi: number,
    qtot: () => number,
    average: () => number,
    valore: () => number
}

export interface FakeState {
    valori: number[],
    mese: PriceData[]
}

export interface Ifitness {
    fitness: number,
    variables: number[]
}

export interface Iresult {
        guadagno: number,
        varRelative: number,
        fermi: number,
        media: number,
        qtot: number,
        valtot: number,
        prezzi: number[],
        quote: number[],
        comprasi: string[],
        vendesi: string[],
        dataIniziale: string,
        dataFinale: string,
        varAbsolute: number,
        attesi: number,
        soldi: number,
        params: number[],
}

export interface SimulationResult {
    guadagno: number;
    varRelative: number;
    fermi: number;
    media: number;
    qtot: number;
    valtot: number;
    prezzi: number[];
    quote: number[];
    giorni_comprasi: string[];
    giorni_vendesi: string[];
    dataIniziale: string;
    dataFinale: string;
    varAbsolute: number;
    attesi: number;
    soldi: number;
    seltrig: number;
    privar: number;
    priinv: number;
    secvar: number;
    secinv: number;
    trevar: number;
    treinv: number;
  }