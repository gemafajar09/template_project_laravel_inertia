export const KonversiSatuan = (value, fromUnit, toUnit, type) => {
    const volumeUnits = {
        length : {
            mm : 0.001,
            cm : 0.01,
            m  : 1,
            km : 1000,
            ft : 0.3048,
            in : 0.0254
        },
        weight : {
            mg : 0.000001,
            g  : 0.001,
            kg : 1,
            lb : 0.453592,
            oz : 0.0283495
        },
        volume : {
            ml : 0.001,
            cl : 0.01,
            l  : 1,
            gal : 3.78541
        }
    };

    if (!volumeUnits[type][fromUnit] || !volumeUnits[type][toUnit]) {
        throw new Error('Unit not supported');
    }

    const valueInBaseUnit = value * volumeUnits[type][fromUnit];
    const convertedValue = valueInBaseUnit / volumeUnits[type][toUnit];

    return convertedValue;
}