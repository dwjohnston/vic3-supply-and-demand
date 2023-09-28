
import React from 'react';

export type TransportPriceIndicatorProps = {
    transportPrice: number;
};



const MAX_PRICE = 100;

export const TransportPriceIndicator = (props: TransportPriceIndicatorProps) => {
    const { transportPrice } = props;


    return (<>{transportPrice}        <div className="transport-price-indicator" style={{ opacity: transportPrice / MAX_PRICE }}>
        {transportPrice}
    </div>
    </>

    );
};
