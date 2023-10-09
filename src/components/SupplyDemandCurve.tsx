
import React, { useEffect, useMemo } from 'react';
import { SupplyDemandData } from '../modelTools/types';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useNormalisationValue } from '../providers/NormalisationProviders';
export type SupplyDemandCurveProps = {

    supply: SupplyDemandData;
    demand: SupplyDemandData;
};

function generateDataFromSupplyDemand(supply: SupplyDemandData, demand: SupplyDemandData, maxQuantity: number,
): {
    data: Array<{
        quantity: number;
        supplyPrice: number;
        demandPrice: number;
    }>

} {
    const data: Array<{
        quantity: number;
        supplyPrice: number;
        demandPrice: number;
    }> = [];

    // Price range (adjust as needed)
    const minQuantity = 0;
    const quantityStep = 10;
    let quantity = minQuantity;

    while (quantity <= maxQuantity) {
        // for (let quantity = minQuantity; quantity <= maxQuantity; quantity += quantityStep) 
        // Calculate quantity supplied and demanded for the given price
        const supplyPrice = supply.slope * quantity + supply.offset;
        const demandPrice = demand.slope * quantity + demand.offset;

        // Create data points and add to the array
        data.push({ quantity, demandPrice, supplyPrice });
        quantity += quantityStep;
    }
    return {
        data: data
    }
}
export const SupplyDemandCurve = (props: SupplyDemandCurveProps) => {
    const { supply, demand } = props;

    const [maxPrice, registerMaxPrice, maxQuantity, registerMaxQuantity] = useNormalisationValue();

    const data = useMemo(() => {
        const result = generateDataFromSupplyDemand(supply, demand, maxQuantity);
        return result;

    }, [supply, demand, maxQuantity]);


    console.log(data)


    return (<><div>
        {maxPrice},{maxQuantity}
        < LineChart width={100} height={100} data={data.data.filter((v) => v.demandPrice >= 0 && v.supplyPrice >= 0)} >
            <XAxis domain={[0, maxQuantity]} dataKey="quantity" label={{ value: 'Quantity', offset: 0, position: 'insideBottom' }} allowDataOverflow />
            <YAxis domain={[0, maxPrice]} label={{ value: 'Price', angle: -90, offset: 22, position: 'insideLeft' }} allowDataOverflow />
            <Line type="monotone" dot={false} dataKey="demandPrice" stroke="#8884d8" />
            <Line type="monotone" dot={false} dataKey="supplyPrice" stroke="#ff44d4" />
        </LineChart>
    </div >
    </>
    );
};
