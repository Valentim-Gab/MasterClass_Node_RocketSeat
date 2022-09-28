const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

load = async () => {
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    res.urls.map(url => addElement(url)) //pegando cada item do array e chamando a função addElement
}

load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, a)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el, a) {
    if (confirm('Tem certeza que deseja deletar?')) {
        el.parentNode.remove()
        
        let urlApagar = (a.href.substr(-1) == '/') ? a.href.substring(0, a.href.length - 1) : a.href
        fetch(`http://localhost:3000?name=${a.text}&url=${urlApagar}&del=1`)
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })

    fetch(`http://localhost:3000?name=${name}&url=${url}`)

    input.value = ""
})