
import React, { useEffect, useMemo } from 'react';
import { SupplyDemandData } from '../modelTools/types';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useNormalisationValue } from '../providers/NormalisationProviders';
export type SupplyDemandCurveProps = {

    supply: SupplyDemandData;
    demand: SupplyDemandData;
};


const MAX_PRICE = 300
function generateDataFromSupplyDemand(supply: SupplyDemandData, demand: SupplyDemandData,

): {
    arr: Array<{
        price: number;
        supply: number;
        demand: number;
    }>,
    maxQuantity: number;
} {
    const data: Array<{
        price: number;
        supply: number;
        demand: number;
    }> = [];

    // Extract coefficients from supply and demand objects
    const { slope: a, offset: c } = supply;
    const { slope: d, offset: f } = demand;

    // Price range (adjust as needed)
    const minPrice = 0;
    const maxPrice = MAX_PRICE;
    const priceStep = 10;

    for (let price = minPrice; price <= maxPrice; price += priceStep) {
        // Calculate quantity supplied and demanded for the given price
        const supplyQuantity = a * price + c;
        const demandQuantity = d * price + f;

        // Create data points and add to the array
        data.push({ price, demand: supplyQuantity, supply: demandQuantity });
    }

    console.log(data[0])
    console.log(data[data.length - 1])
    const maxQuantity = Math.max(data[0].demand, data[data.length - 1].supply)

    console.log(maxQuantity)
    return { arr: data, maxQuantity }
}
export const SupplyDemandCurve = (props: SupplyDemandCurveProps) => {
    const { supply, demand } = props;

    const [maxQuantity, registerMaxQuantity] = useNormalisationValue();

    const data = useMemo(() => {
        const result = generateDataFromSupplyDemand(supply, demand);
        return result;

    }, [supply, demand]);

    useEffect(() => {
        registerMaxQuantity(data.maxQuantity)

    }, [data.maxQuantity, registerMaxQuantity]);


    return (<>{maxQuantity}
        <LineChart width={100} height={100} data={data.arr}>
            <XAxis domain={[0, MAX_PRICE]} dataKey={"price"} />
            <YAxis domain={[0, maxQuantity]} />
            <Line type="monotone" dot={false} dataKey="demand" stroke="#8884d8" />
            <Line type="monotone" dot={false} dataKey="supply" stroke="#ff44d4" />
        </LineChart>
    </>
    );
};
