export function getDeliveryOption(optionId){
    let matchingOption;
    deliveryOption.forEach(element => {
        if(element.id===optionId)matchingOption=element;
    });
    return matchingOption ||deliveryOption[0];
}

export const deliveryOption=[
    {
        id:'1',
        deliveryDays:7,
        priceCents:0
    },
    {
        id:'2',
        deliveryDays:3,
        priceCents:499
    },
    {
        id:'3',
        deliveryDays:1,
        priceCents:999
    }
]