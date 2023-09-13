import { Istate } from "./AppContext";
import { Iinvestment, SimulationResult } from "./Interfaces";
import { round, mutateArray } from "./Tools";

export function simulateInv(state: Istate, boolean: boolean): any {
    const [soldi, privar, priinv, seltrig, secvar, secinv, trevar, treinv] = state.valori;
    const pricesTable = state.mese;
    
    const investment: Iinvestment = {
        pmc: [],
        numQ: [],
        soldiFermi: soldi,
        qtot: () => investment.numQ.reduce((acc, cur) => acc + cur, 0),
        average: () => investment.numQ.reduce((acc, cur, i) => acc + investment.pmc[i] * cur, 0) / investment.qtot() || 0,
        valore: () => investment.average() * investment.qtot()
    }

    let giorni_comprasi: string[] = []
    let giorni_vendesi: string[] = []
    let control = 0;

    function trade(i: number, x: number, isBuy: boolean): void {
        const price = pricesTable[i].price
        const date = pricesTable[i].date 
        const quote = Math.floor(((isBuy ? investment.soldiFermi : investment.valore()) * x) / price)
        if (quote) {
            const amount = quote * price
            investment.soldiFermi += (isBuy ? -1 : 1) * amount
            investment.pmc.push(price)
            investment.numQ.push((isBuy ? 1 : -1) * quote)
            control += (isBuy ? 1 : -1);
            (isBuy ? giorni_comprasi : giorni_vendesi).push(date)
        } 
    }

    for (let i=0; i < pricesTable.length; i++) {

        const moneyInvested = investment.valore() === 0 ? false : true
        const moneyAvailable = investment.soldiFermi === 0 ? false : true
        const isAbove = pricesTable[i].price / investment.average() > ((seltrig + 100) / 100)
        const reBuy = moneyAvailable && moneyInvested

        if (!control && !moneyInvested && pricesTable[i].variation < privar) {
            trade(i, priinv, true)
        } else if (moneyInvested && isAbove) {
            trade(i, 1, false)
        } else if (control === 1 && reBuy && (pricesTable[i].price < investment.average() * ( 100 + secvar) / 100)) {
            trade(i, secinv, true)
        } else if (control === 2 && reBuy && (pricesTable[i].price < investment.average() * ( 100 + trevar) / 100)) {
            trade(i, treinv, true)
        } else {}
        
    }

    const fermi = investment.soldiFermi
    const valtot = investment.valore()
    const attesi = fermi + valtot
    const quote = investment.numQ
    const prezzi = investment.pmc.slice(0, quote.length)
    const media = investment.average()
    const qtot = investment.qtot()
    
    const dataIniziale = pricesTable[0].date
    const dataFinale = pricesTable[pricesTable.length-1].date
    const prezzoIniziale = pricesTable[0].price
    const prezzoFinale = pricesTable[pricesTable.length-1].price
    const varAbsolute = (pricesTable[pricesTable.length-1].price)-pricesTable[0].price
    const varRelative = ((prezzoFinale/prezzoIniziale) - 1) * 100
    
    const guadagno = (attesi / soldi - 1)*100

    if (boolean) {
        return {
            fitness: round(guadagno - varRelative),
            variables: state.valori
        }
    } else {
        const result = {
            guadagno,
            varRelative,
            fermi,
            media,
            qtot,
            valtot,
            prezzi,
            quote,
            giorni_comprasi,
            giorni_vendesi,
            dataIniziale,
            dataFinale,
            varAbsolute,
            attesi,
            soldi,
            seltrig,
            privar,
            priinv,
            secvar,
            secinv,
            trevar,
            treinv
        }
        return result
    }
}

export function algoritmoGenetico(gen: number, state: Istate, boolean: boolean): SimulationResult {

    const results = [];
    
    const parentResult = simulateInv(state, boolean)
    results.push(parentResult)
    
    let i = 0
    while (i < 90) {
        const newParams = mutateArray(state.valori) 
        const newState = {
            ...state,
            valori: newParams
        }
        const childResult = simulateInv(newState, boolean)
        results.push(childResult)
        i++
    }
    
    results.sort((a,b) => (a.fitness > b.fitness) ? 1 : ((b.fitness > a.fitness) ? -1 : 0));
    const topResults = results.slice(-1);
    const newestParams = topResults[0].variables;

    const newestState = {
        ...state,
        valori: newestParams
    }
    
    if (gen > 0) {
        return algoritmoGenetico((gen - 1), newestState, boolean)
    } else {
        return simulateInv(newestState, false)
    }
}