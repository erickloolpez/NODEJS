process.on('exit',()=>{
    console.log('Ale, the process finish.')
})

process.on('beforeExit',()=>{
    console.log('The process are going to stop.')
})