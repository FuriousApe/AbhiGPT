const API_KEY = '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'
const submitButton = document.getElementById("submit")
const output = document.getElementById("output")
const inputElement = document.querySelector('input')
const history = document.querySelector('.history')
const buttonElement = document.querySelector('button')

function changeInput(value){
    inputElement.value = value
}

function clearInput(){
    inputElement.value = ''
}


async function getMessage(){
    console.log("Clicked");
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            temperature: 0.7,
            max_tokens: 100
          })
            
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data = await response.json()
        console.log(data)
        output.textContent = data.choices[0].message.content
        const pElement = document.createElement('p')
        pElement.textContent = inputElement.value
        pElement.addEventListener('click',()=>changeInput(pElement.textContent))
        history.append(pElement)

    }catch(error){
        console.error(error);
    }
}


submitButton.addEventListener('click',getMessage);
buttonElement.addEventListener('click', clearInput);
