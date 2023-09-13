import React, {useMemo, useState} from 'react'
import  GenericInput  from './GenericInput'
import { SpecificInput } from './SpecificInput'
import {AppContext} from './AppContext'
import { PriceData, IOption } from './Interfaces'
import { monthOptions, options, generateRandomValues } from './Tools'

export function Form() {
    const {state, updateValori, updateMese, updateBool} = React.useContext(AppContext)

    const [soldiIniziali, setsoldiIniziali] = useState(0)
    const [firstBuyVar, setfirstBuyVar] = useState(0)
    const [primoInvestimento, setprimoInvestimento] = useState(0)
    const [selTrigger, setselTrigger] = useState(0)
    const [secondBuyVar, setsecondBuyVar] = useState(0)
    const [secondoInvestimento, setsecondoInvestimento] = useState(0)
    const [thirdBuyVar, setthirdBuyVar] = useState(0)
    const [terzoInvestimento, setterzoInvestimento] = useState(0)

    const [selected, setSelected] = useState(options[0].value)

    const [bool, setBool] = useState(state.algoritmo)

    function exportMonth(number: number): PriceData[] {
        return monthOptions[number];
    }

    const pricesTable = useMemo(() => exportMonth((selected)), [selected])

        function passProps(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault()
            updateBool(false)
            updateValori([
                soldiIniziali,
                firstBuyVar,
                primoInvestimento,
                selTrigger,
                secondBuyVar,
                secondoInvestimento,
                thirdBuyVar,
                terzoInvestimento,
              ]);     
            updateMese(pricesTable)
        }    

        function passRandomProps(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault()
            updateBool(false)
            updateValori(generateRandomValues())
            updateMese(pricesTable)
        }

        function handleAlgoritmo(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault()
            updateMese(pricesTable)
            setBool((prev) => !prev)
            updateBool(bool)
            if (bool) {
                updateValori(generateRandomValues())
            } else {
                updateValori(new Array(8).fill(0))
            }
        }
    
    return (
        <>
    <form onSubmit={passProps}>
        <h2>Inserisci dati:</h2>
            <br/>
                <GenericInput label={"Capitale:"}
                    min={900} max={1000_000} value={soldiIniziali}
                    onChange={e => setsoldiIniziali(parseInt(e.target.value))}
                />
                <GenericInput label={"Compra se varia di:"}
                    min={-6} max={-0.1} value={firstBuyVar}
                    onChange={(e) => setfirstBuyVar(parseInt(e.target.value))}
                />
                <GenericInput label={"Vendi se sopra di:"}
                    min={0.01} max={9} value={selTrigger}
                    onChange={(e) => setselTrigger(parseInt(e.target.value))}
                />
                <GenericInput label={"Investi somma con fattore:"}
                    min={0.01} max={1} value={primoInvestimento}
                    onChange={(e) => setprimoInvestimento(parseInt(e.target.value))}
                />
            <br/>
            <h3>Seconda Volta:</h3>
                <SpecificInput firstvalue={secondBuyVar} 
                firstonChange={(e) => setsecondBuyVar(parseInt(e.target.value))}
                secondvalue={secondoInvestimento} 
                secondonChange={(e) => setsecondoInvestimento(parseInt(e.target.value))} 
                />
            <br/>
            <h3>Terza volta:</h3>
                <SpecificInput firstvalue={thirdBuyVar} 
                firstonChange={(e) => setthirdBuyVar(parseInt(e.target.value))}
                secondvalue={terzoInvestimento} 
                secondonChange={(e) => setterzoInvestimento(parseInt(e.target.value))} 
                />
            <br/>
        <label htmlFor="mese">Mese </label>
            <select value={selected} onChange={e => setSelected(parseInt(e.target.value))}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
                <br/>
                <br/>
            <button onClick={() => passRandomProps}>Strategia Random</button>
            {bool && <button onClick={() => handleAlgoritmo}>Avvia Algoritmo</button>} 
            {!bool && <button onClick={() => handleAlgoritmo}>Leva algoritmo</button>} 
                <button type="submit">AVVIA</button>
            </form>
        </>
    )
}