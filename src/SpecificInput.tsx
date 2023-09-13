import GenericInput from "./GenericInput";
import { ChangeEvent } from "react";

interface SpecificInputProps {
    firstvalue: number;
    secondvalue: number;
    firstonChange: (event: ChangeEvent<HTMLInputElement>) => void;
    secondonChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function SpecificInput({firstvalue, secondvalue, firstonChange, secondonChange}: SpecificInputProps) {
    return (
        <>
        <GenericInput label={"Variazione Successiva"} 
        min={-6} max={0} value={firstvalue} onChange={firstonChange} />
        <GenericInput label={"Investi somma con fattore"} 
        min={0} max={1} value={secondvalue} onChange={secondonChange} />
        </>
    )
}
