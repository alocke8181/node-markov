/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function makeFileText(path){
    fs.readFile(path,'utf8',function(err,data){
        if(err){
            console.log(err);
            process.exit(1);
        }else{
            let mm = new markov.MarkovMachine(data);
            console.log(mm.makeText());
        }
    })
};

async function makeURLText(path){
    let res;
    try{
        res = await axios.get(url);
    }catch(err){
        console.log(err);
        process.exit(1);
    };
    let mm = new markov.MarkovMachine(res.data);
    console.log(mm.makeText());
};

let [method, path] = process.argv.slice(2);
if(method == 'file'){
    makeFileText(path);
}else if(method == 'url'){
    makeURLText(path);
}else{
    console.log('Unknown method.');
    process.exit(1);
}