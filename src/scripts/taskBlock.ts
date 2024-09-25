const map  = new Map<string,string>(JSON.parse(localStorage.getItem("list")||"[]"))




const inputElement = document.querySelector("#TaskBlockInput") as HTMLInputElement
const listTaskElement = document.querySelector("#TaskBlockList")
const inputErrorText = document.querySelector("#InputErrorText")

const checkedTasks = new Map<string, HTMLLabelElement>()
document.querySelector("#DeleteAllCheckedTasks")?.addEventListener("click",()=>{
    checkedTasks.forEach((value,key)=>{
        if(listTaskElement) listTaskElement.removeChild(value), map.delete(key),checkedTasks.delete(key);
        
    })
    localStorage.setItem("list", JSON.stringify([...map]))
})





const returnTaskElement = (textContent:string, elId?:string):HTMLLabelElement=>{
    const label = document.createElement("label")
    const p = document.createElement("p")
    const input = document.createElement("input")
    const button = document.createElement("button")
    const id = elId?elId:`InputCheckbox-${Math.round(Math.random()*1000000000)}`
    button.textContent = "X"
    button.addEventListener("click",()=>{
        if(listTaskElement) listTaskElement.removeChild(label), map.delete(id), localStorage.setItem("list", JSON.stringify([...map]));
        if(checkedTasks.has(id)) checkedTasks.delete(id);
    })

    input.setAttribute("type","checkbox")
    input.setAttribute("name", id)
    input.setAttribute("id",id)
    input.addEventListener("change",()=>{
        if(input.checked){
            label.className = "checked"
            checkedTasks.set(id, label)
        }else{
            label.className = ""
            checkedTasks.delete(id)
        }
    })

    p.textContent = textContent
    label.setAttribute("for", id)
    label.appendChild(input)
    label.appendChild(p)
    label.appendChild(button)
    saveToLocalStorage(id, textContent)
    return label
}



const checkEnterKey = (e:KeyboardEvent)=>{
    if(e.key === "Enter"){
        createListElement()
    }
}

inputElement?.addEventListener("focus",()=>{
    document.addEventListener("keyup", checkEnterKey)
})

inputElement?.addEventListener("change", ()=>{
    if(inputErrorText) inputErrorText.className=""
})

inputElement?.addEventListener("blur", ()=>{
    document.removeEventListener("keyup", checkEnterKey)
    if(inputErrorText) inputErrorText.className=""
})

window.addEventListener("load",()=>{
    map.forEach((value,key)=>{
        createListElement(value,key)
    })
})


function createListElement(elValue?:string,elId?:string){
    const value = elValue?elValue:inputElement?.value
    if(value && inputElement){
        const label = returnTaskElement(value, elId)
        listTaskElement?.appendChild(label)
        inputElement.value = ""
    }else{
        if(inputErrorText) inputErrorText.className=  "visible"
    }
}

function saveToLocalStorage (id:string, value:string){ map.set(id,value); localStorage.setItem("list", JSON.stringify([...map])) }
