console.log('Something')
console.error('Something')
console.warn('Something')

let table = [
    {
        a: 1,
        b:2,
    },
    {
        a:3,
        b:4
    }
]

console.table(table)

console.group('Conversation')
console.log('hi')
console.log('bla bla bla')
console.log('bye')
console.groupEnd('Conversacion')

console.count('times')
console.count('times')
console.countReset('times')
console.count('times')