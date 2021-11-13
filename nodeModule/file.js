const fs = require('fs')

fs.readFile('./test.js', (err, data) => {
    if (err) throw err;
    console.log('synchronus', data.toString());
})

// const file = fs.readFileSync('./test.txt'); //Sync