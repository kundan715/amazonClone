

export function getDeliveryDate(today,workingDaySkip){

    while(workingDaySkip>0){
        today=today.add(1,'days');
        if(today.day()!==0 && today.day()!==6){
            workingDaySkip-=1;
        }
        
    }
    return today;
}