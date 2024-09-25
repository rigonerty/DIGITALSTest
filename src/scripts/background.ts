import { time } from "./timeBlock";


const backgroundEl = document.querySelector("#AppBackground")

const changeBack= ()=>{
    if(backgroundEl){
        const hour = time[0]
        if(hour>"00:00" && hour<"06:00") backgroundEl.className = "night"
        if(hour>="06:00" && hour<="12:00") backgroundEl.className = "morning"
        if(hour>="12:00" && hour<="18:00") backgroundEl.className = "day"
        if(hour>="18:00" && hour<="00:00") backgroundEl.className = "evening"    
    }      
}
changeBack()
setInterval(changeBack,1000)