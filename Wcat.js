#!/usr/bin/env node

let fs = require("fs");
const chalk = require('chalk');
const { keyword } = require("chalk");

let inputArray = process.argv.slice(2);
// console.log(inputArray);

let option = [];
let fileName = [];

// saparate options and file in diffrent array 
for (let i = 0; i < inputArray.length; i++) {

    if (inputArray[i].charAt(0) == '-') {
        option.push(inputArray[i]);
    } else {
        fileName.push(inputArray[i]);

    }

}
// console.log("OPTION  :", option);
// console.log("\n" + "FILE NAME  :" + fileName);


let isBothHere = option.includes("-n") && option.includes("-b");
if (isBothHere == true) {
    console.log(chalk.bold.bgMagenta("please enter either -n or -b "));
    return;

}


for (let i = 0; i < fileName.length; i++) {
    let isPresent = fs.existsSync(fileName[i]);
    if (isPresent == false) {
        console.log(chalk.bold.bgRedBright(`file ${fileName[i]} is not present`));
        return;
    }
}

//read the multiple file content at a time 
let content = "";
for (let i = 0; i < fileName.length; i++) {
    let buffer = fs.readFileSync(fileName[i]);
    content += buffer + "\r\n";
}
console.log(content);
let contentArr = content.split("\r\n");





// -s command implementation

let isPresentOption = option.includes("-s");
if (isPresentOption == true) {
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        } else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }

    }
    let temArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            temArr.push(contentArr[i]);
        }

    }
    contentArr = temArr;

}
console.log("------------------------Saprater---------------------------");



// -n command implementation 

let isNhere = option.includes("-n");
if (isNhere == true) {
    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = `${i+1} ${contentArr[i]}`;

    }

}



// -b command implementation

let isBhere = option.includes("-b");
if (isBhere == true) {
    let counter = 1
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {

            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }

}

console.log(contentArr.join("\n"));