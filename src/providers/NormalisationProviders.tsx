import { PropsWithChildren, createContext, useContext, useState } from "react";


export type NormalisationContextType = {
    maxQuantity: number;
    registerMaxQuantity: (newMaxPrice: number) => void;
}
export const NormalisationContext = createContext<NormalisationContextType>({
    maxQuantity: 100,
    registerMaxQuantity: () => {
        throw new Error("not instantianted")
    }
})

export function NormalisationProvider(props: PropsWithChildren<{}>) {


    const [maxQuantity, registerMaxQuantity] = useState(100);
    return <NormalisationContext.Provider value={{
        maxQuantity: maxQuantity,
        registerMaxQuantity: (newMax) => {

            console.log(newMax)
            if (newMax > maxQuantity) {
                registerMaxQuantity(newMax)
            }
        }
    }}>
        {props.children}
    </NormalisationContext.Provider>
}

export function useNormalisationValue(): [value: number, registerValue: (newNumber: number) => void] {
    const result = useContext(NormalisationContext);
    return [result.maxQuantity, result.registerMaxQuantity]

}