const { clipboard } = require('electron')


document.getElementById("dialog-box").addEventListener('click',()=>{
    clipboard.writeText('hello i am a bit of text!')

    const text = clipboard.readText()
    console.log(text)
});