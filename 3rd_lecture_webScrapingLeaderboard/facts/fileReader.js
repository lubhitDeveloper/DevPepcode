//fs module => file system

let fs= require("fs");
let cheerio= require("cheerio");

let f1KaData= fs.readFileSync("./f1.txt","utf-8");
//console.log(f1KaData);

let htmlKaData= fs.readFileSync("./index.html");
//console.log(htmlKaData + "");
    
let ch= cheerio.load(htmlKaData);

//let h1KaData= ch("h1").text();
//console.log(h1KaData);

//let pKaData= ch("p").text();
//console.log(pKaData);

//let pKaData= ch(".lm").text();
//console.log(pKaData);

// let pKaData= ch("ul p").text();
// console.log(pKaData);

let pKaData= ch("#kj").text();
console.log(pKaData);


