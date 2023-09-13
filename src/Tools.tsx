import { IOption, PriceData } from "./Interfaces";
import { anno, jan22, feb22, mar22, may22, jun22, july22, aug22, sept22, oct22, nov22, apr22 } from './Months'

export function round(num: number):number {
    return Math.round(num * 100) / 100;
}

const randomInIntervalBig = (small: number, big: number): number => round(big - (Math.random() * Math.random()) * (big - small))
const randomInIntervalSmall = (small: number, big: number): number => round(Math.random() * Math.random() * (big - small) + small)

function newRandom(num: number, small: number, big: number): number {
    const x = Math.random() < 0.5 ? 1 : -1
    if (x === 1) {
        return randomInIntervalSmall(num, big)
    } else {
        return randomInIntervalBig(small, num)
    }
}

export function mutateArray(x: number[]): number[] {
    const result = []
    result.push(x[0])
    const firstBuyVar = Number(newRandom(x[1], -7,  -0.05));
    result.push(firstBuyVar)
    const firstInv = Number(newRandom(x[2], 0.01, 1))
    result.push(firstInv)
    const sellTrigger = Number(newRandom(x[3], 0.05, 7))
    result.push(sellTrigger)
    const secondBuyVar = Number(newRandom(x[4], -7, 0));
    result.push(secondBuyVar)
    const secondInv = Number(newRandom(x[5], 0, (1 - firstInv)))
    result.push(secondInv)
    const thirdBuyVar = Number(newRandom(x[6], -7, 0))
    result.push(thirdBuyVar)
    const thirdInv = Number(newRandom( x[7], 0, (1 - (firstInv + secondInv))))
    result.push(thirdInv)
 
    return result
} 

export function randomizeInputs(small: number, big: number):number {
    return Math.random() * (big - small) + small
  }

  export const options: IOption[] = [
    {value: 4, text: '04/22'},
    {value: 5, text: '05/22'},
    {value: 6, text: '06/22'},
    {value: 7, text: '07/22'},
    {value: 10, text: '10/22'},
    {value: 11, text: '11/11'},
    // {value: 14, text: 'Simula'},
    {value: 15, text: 'Anno'}
  ]
  
  export const monthOptions: {[index: number]:PriceData[]} = {
    10: oct22,
    6: jun22,
    5: may22,
    4: apr22,
    15: anno.flat(),
    11: nov22,
    7: july22,
    // 14: createMonth()
  };

  export function generateRandomValues(): number[] {
    const primo = randomizeInputs(0.15, 1);
    const second = randomizeInputs(0, 1 - primo);
    const aiuto = second + primo;
    const third = randomizeInputs(0, 1 - aiuto);
    return [
      randomizeInputs(900, 15000),
      randomizeInputs(-3, -0.6),
      primo,
      randomizeInputs(0.1, 5),
      randomizeInputs(-4, 0),
      second,
      randomizeInputs(-4, 0),
      third,
    ];
  }