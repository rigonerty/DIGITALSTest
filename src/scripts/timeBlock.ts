const date = new Date()
export let time = [date.toLocaleTimeString(), ""]
const timeBlockHoursEl = document.querySelector("#TimeBlockHours")
const timeBlockDayEl = document.querySelector("#TimeBlockDay")

const listMonths = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"]
const ListDaysOfWeek = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]

let dayOfWeek = date.getDay()
let day = date.getDate()
let month = date.getMonth()

time[1] = `${day} ${listMonths[month]}, ${ListDaysOfWeek[dayOfWeek]}`
if(timeBlockDayEl) timeBlockDayEl.textContent = time[1]
if(timeBlockHoursEl) timeBlockHoursEl.textContent = time[0]

setInterval(()=>{changeTime()},999)

function changeTime (){
    const date = new Date()
    time[0] = date.toLocaleTimeString()
    const isNewDay =  day !== date.getDate() || month !== date.getMonth()
    if(timeBlockDayEl && isNewDay) {
        dayOfWeek = date.getDay()
        day = date.getDate()
        month = date.getMonth()
        time[1] = `${day} ${listMonths[month]}, ${ListDaysOfWeek[dayOfWeek]}`
        if(timeBlockDayEl) timeBlockDayEl.textContent = time[1] 
    }
    if(timeBlockHoursEl) timeBlockHoursEl.textContent = time[0]
}


