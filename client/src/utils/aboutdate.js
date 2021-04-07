export const datetostring = (startDate) =>{
    const stdd = String(startDate.getDate()).length===1?'0'+String(startDate.getDate()):String(startDate.getDate());
    const stdm = String(startDate.getMonth()+1).length===1?'0'+String(startDate.getMonth()+1):String(startDate.getMonth()+1);
    const stdy = String(startDate.getFullYear());
    const std = stdy+'/'+stdm+'/'+stdd;
    return std;
}
export const middatechecker = (startDate,endDate) =>{
    const nowdate = datetostring(new Date);
    console.log(startDate+' '+endDate+ ' '+nowdate)
    for(var i = 0;i<nowdate.length;i++){
        if(nowdate[i]==='/') continue;
        if(Number(nowdate[i])<Number(startDate[i])){

            return false;
        }
        else if(Number(nowdate[i])>Number(startDate[i])) break;
    }
    for(var i = 0;i<nowdate.length;i++){
        if(nowdate[i]==='/') continue;
        if(Number(nowdate[i])>Number(endDate[i])){

            return false;
        }
        else if(Number(nowdate[i])<Number(endDate[i])) break;
    }
        
    return true;
}
