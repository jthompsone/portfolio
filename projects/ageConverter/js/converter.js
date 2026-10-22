const defaultURL = "../data/ancestries.txt";
const defaultData = `aarakocra:30
dragonborn:220
dwarf:250
eladrin:300
elf:350
gnoll:30
gnome:200
half-elf:125
half-orc:60
halfling:100
high-elf:350
human:85
lupin:22
orc:80
tiefling:100`;
let myAncestries = []; // array of all ancestries objects
let fileFound = false; // used to indicate if a file was loaded or not

//console.log(defaultData);

// Constructor for ancestries objects
class Ancestries {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

document.getElementById("fileInButton").addEventListener("change", (event) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        myAncestries = []; //Clear previous data (if any)
        const lines = reader.result.split("\n"); //used to create an array of every line read from the input file, where a return was found, create new node
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trim(); //Some pre-validator safeguards, remove whitespaces
            if (lines[i].includes(":")) {
                //make sure ':' is present in every node
                if (lines[i] != "") {
                    //make sure is not blank
                    let raw = lines[i].split(":"); //used to create a small array (2 parts) split from the ':' character
                    if (raw[0] != "" && raw[1] != "") {
                        //double check to make sure both strings are not blank
                        myAncestries.push(
                            new Ancestries(raw[0].trim(), raw[1].trim()),
                        ); //create a new Species object and store it into the array of species
                    }
                }
            }
        }
        fileFound = true; //a file was found
        dataValidator(); //run the validator
        writeList(); //run
    });
    reader.readAsText(file); //read in a file
});

// On change of file, run fucntion

// Custom compare method, as the default compare() method would not work with comparing Ancestries objects
const compare = (a, b) => {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
};

// Simple alphabetizing/sort function, uses a call to compare method.
const sortAncestries = () => {
    myAncestries = myAncestries.sort(compare);
};

// Data validator function, checks to make sure valid data entered before outputted to the list
// Removes any invalid data from the myAncestries array if found
const dataValidator = () => {
    for (let j = 0; j < myAncestries.length; j++) {
        let names = myAncestries[j].name; // store the Ancestries' name into n
        let ages = myAncestries[j].age; // store the Ancestries' age into a

        // If a is NOT numeric or n is blank, then remove from the array
        if (!isNum(ages) || names == "") {
            myAncestries.splice(j, 1);
        }
    }
};

const writeList = () => {
    sortAncestries(); // sort myAncestries into alphabetical order
    let elOne = document.getElementById("sListOne");
    let elTwo = document.getElementById("sListTwo");

    // create a selection list for sListOne, including a call to function onchange()
    elOne.innerHTML = `<select size="9" id="selectorList1" onchange="displayAncestries1()">`;
    // Once selectorList1 created, fill it with values
    let laOne = document.getElementById("selectorList1");
    for (let i = 0; i < myAncestries.length; i++) {
        laOne.innerHTML += `<option value="${i}">${myAncestries[i].name}</option>`;
    }

    // Create a selection list for sListTwo, including a call to function onchange()
    elTwo.innerHTML = `<select size="9" id="selectorList2" onchange="displayAncestries2()">`;
    let laTwo = document.getElementById("selectorList2");
    for (let j = 0; j < myAncestries.length; j++) {
        laTwo.innerHTML += `<option value="${j}">${myAncestries[j].name}</option>`;
    }
};

// Display data from the selected list item from the first list
const displayAncestries1 = () => {
    let x = document.getElementById("selectorList1").value;
    document.getElementById("descript1").value = myAncestries[x].name;
    document.getElementById("descript1").innerHTML =
        `Average lifespan of a(n)<br/>
        <span id="name1">${myAncestries[x].name.toUpperCase()}</span> is <span id="age1">${myAncestries[x].age}</span> years`;
};

// Display data from the selected list item from the second list
const displayAncestries2 = () => {
    let x = document.getElementById("selectorList2").value;
    document.getElementById("descript2").value = myAncestries[x].name;
    document.getElementById("descript2").innerHTML =
        `Average lifespan of a(n)"<br/>
        <span id="name2">${myAncestries[x].name.toUpperCase()}</span>
         is <span id="age2">${myAncestries[x].age}</span> years`;
};

// Used to get the user inputted age for the base Ancestries.
const getInputAge = () => document.getElementById("inputAgetxt").value;

// Is a Number
const isNum = (input) => input - 0 == input && ("" + input).trim().length > 0;

// Used to validate all input from the user, if all pass, then calculate relative age.
const validateInput = () => {
    if (!fileFound) {
        alert("Please load a data file!");
    } else {
        let a = document.getElementById("selectorList1").value;
        let b = document.getElementById("selectorList2").value;

        if (a == "") {
            alert("Please select input age!");
        } else if (b == "") {
            alert("Please select output age!");
        } else {
            let c = getInputAge();

            if (c == "") {
                alert("Please enter a base age!");
            } else if (isNum(c) == false) {
                alert('"' + c + '" is not a number!');
            } else if (c == 0) {
                alert("Inputed age cannot be 0!");
            } else if (c < 0) {
                alert("Inputed age cannot be negative!");
            } else {
                calculate(c);
            }
        }
    }
};

// Calculate
const calculate = (s1) => {
    let x = document.getElementById("selectorList1").value;
    let y = document.getElementById("selectorList2").value;
    let aMax = myAncestries[x].age;
    let bMax = myAncestries[y].age;
    let result = (bMax * s1) / aMax;
    if (Number.isInteger(result) == false) {
        result = result.toFixed(2);
    }
    document.getElementById("outputAgetxt").value = result;
};

/*
const init = () => {
    loadData();
};

window.onload = init;
*/
