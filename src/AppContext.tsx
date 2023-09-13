import React, { createContext } from 'react'
import { PriceData } from "./Interfaces";
import { jan22 } from './Months';

export interface Istate {
    mese: PriceData[];
    valori: number[],
    algoritmo: boolean,
}

export interface IContext {
    state: Istate,
    updateMese: (newData: PriceData[]) => void,
    updateValori: (newNums: number[]) => void,
    updateBool: (newBool: boolean) => void
}

export const AppContext = createContext<IContext>({
    state: {
        mese: jan22,
        valori: [0, 0, 0, 0, 0, 0, 0, 0],
        algoritmo: false,
    },
    updateMese: () => {},
    updateValori: () => {},
    updateBool: () => {},
})

interface IProvider {
    children: React.ReactNode
}

export function Provider({children}: IProvider) {
    const [info, setInfo] = React.useState({
        mese: jan22,
        valori: [0, 0, 0, 0, 0, 0, 0, 0],
        algoritmo: false
    })
    
    function updateMese(newData: PriceData[]) {
        setInfo((previous) => ({
            ...previous,
            mese: newData
        }))
    }

    function updateValori(newNums: number[]) {
        setInfo((previous) => ({
            ...previous,
            valori: newNums
        }))
    }

    function updateBool(newBool: boolean) {
        setInfo((prev) => ({
            ...prev,
            algoritmo: newBool
        }))
    }

    const contextValue: IContext = {
        state: info,
        updateMese, 
        updateValori,
        updateBool
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )

}