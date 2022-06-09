const fs = require("fs"); 
const f = fs.readFileSync('./utils/nameGenerator/firstName.txt', 'utf-8');
const s = fs.readFileSync('./utils/nameGenerator/secondName.txt', 'utf-8');
firstName = f.toString().replace(/\r\n/g,'\n').split('\n');
secondName = s.toString().replace(/\r\n/g,'\n').split('\n');
const format  = [firstName, secondName];

const createName = () => {  
    const output_nmbr = 1;
    let output = []
    for (let i=0 ;i < output_nmbr; i++){ 
        format.forEach((list) => {
            let word = list[Math.floor(Math.random() * list.length)]; 
            output.push(word); 
        })
    }   
   return output.join(' ');
}  
module.exports = {createName};