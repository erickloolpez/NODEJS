let bufferOne = Buffer.alloc(4)
let bufferTwo = Buffer.from([1,2,3,4])
let bufferThree = Buffer.from('Hello World!')
let abc = Buffer.alloc(26)

console.log(bufferOne)
console.log(bufferTwo)
console.log(bufferThree)

for (let i = 0; i < 26; i++){
    abc[i] = i + 97
}

console.log(abc.toString())