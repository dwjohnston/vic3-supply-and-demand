import { PropsWithChildren, createContext, useContext, useState } from "react";


export type NormalisationContextType = {
    maxQuantity: number;
    registerMaxQuantity: (newMaxQuant: number) => void;

    maxPrice: number;
    registerMaxPrice: (newMaxPrice: number) => void;
}

export const NormalisationContext = createContext<NormalisationContextType>({
    maxQuantity: 100,
    registerMaxQuantity: () => {
        throw new Error("not instantianted")
    },
    maxPrice: 100,
    registerMaxPrice: () => {
        throw new Error("not instantianted")

    }
})

export function NormalisationProvider(props: PropsWithChildren<{}>) {


    const [maxQuantity, setMaxQuantity] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    return <NormalisationContext.Provider value={{
        maxQuantity: maxQuantity,
        registerMaxQuantity: (newMax) => {
            if (newMax > maxQuantity) {
                setMaxQuantity(newMax)
            }
        },
        maxPrice,
        registerMaxPrice: (newMax) => {
            if (newMax > maxPrice) {
                setMaxPrice(newMax)
            }
        }
    }}>
        {props.children}
    </NormalisationContext.Provider>
}

export function useNormalisationValue(): [maxPrice: number, registerMaxPrice: (newNumber: number) => void,
    maxQuantity: number, registerMaxQuantity: (newNumber: number) => void] {
    const result = useContext(NormalisationContext);
    return [result.maxPrice, result.registerMaxPrice, result.maxQuantity, result.registerMaxQuantity]

}