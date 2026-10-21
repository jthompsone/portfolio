var defaultData =
    "aarakocra:30\n dragonborn:220\n dwarf:250\n eladrin:300\n elf:350\n gnoll:30\n gnome:200\n half-elf:125\n half-orc:60\n halfling:100\n high-elf:350\n human:85\n lupin:22\n orc:80\n tiefling:100\n";
var myAncestries = []; // array of all ancestries objects
var fileFound = false; // used to indicate if a file was loaded or not
var objCount = 0; // used to count the total number of objects created for the array
var errCount = 0; // used to count the number of errors that occured while trying to create objects for the array

// Constructor for ancestries objects
function Ancestries(name, age) {
    this.name = name;
    this.age = age;
}

// On change of file, run fucntion
document.getElementById("fileInButton").onchange = loadData;

function loadData() {
    var file = this.files[0]; // file to be loaded and read
    var reader = new FileReader();
    // If a file chosen, read line by line.
    reader.onload = function () {
        myAncestries = []; // Clear previous data (if any)
        var lines = this.result.split("\n"); // used to create an array of every line read from the input file, where a return was found, create new node
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trim(); // Some pre-validator safeguards, remove whitespaces
            if (lines[i].includes(":")) {
                // make sure ':' is present in every node
                if (lines[i] != "") {
                    // make sure is not blank
                    var raw = lines[i].split(":"); // used to create a small array (2 parts) split from the ':' character
                    if (raw[0] != "" && raw[1] != "") {
                        // double check to make sure both strings are not blank
                        myAncestries.push(
                            new Ancestries(raw[0].trim(), raw[1].trim()),
                        ); // create a new Ancestries object and store it into the array of Ancestries
                    }
                }
            }
        }
        fileFound = true; //a file was found
        dataValidator(); //run the validator
        writeList(); //run
    };
    reader.readAsText(file); //read in a file
}

// Custom compare method, as the default compare() method would not work with comparing Ancestries
function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
}

// Simple alphabetizing/sort function, uses a call to compare method.
function sortAncestries() {
    myAncestries = myAncestries.sort(compare);
}

// Data validator function, checks to make sure valid data entered before outputted to the list
// Removes any invalid data from the myAncestries array if found
function dataValidator() {
    var n; //used to validate names
    var a; //used to validate age
    var j = 0; //a count variable
    while (j < myAncestries.length) {
        n = myAncestries[j].name; // store the Ancestries' name into n
        a = myAncestries[j].age; // store the Ancestries' age into a

        // If a is NOT numeric or n is blank, then remove from the array
        if (!isNum(a) || n == "") {
            myAncestries.splice(j, 1);
        } else {
            j++;
        }
    }
}

function writeList() {
    sortAncestries(); // sort myAncestries into alphabetical order
    var elOne = document.getElementById("sListOne");
    var elTwo = document.getElementById("sListTwo");

    // create a selection list for sListOne, including a call to function onchange()
    elOne.innerHTML =
        '<select size="9" id="selectorList1" onchange="displayAncestries1()">';
    // Once selectorList1 created, fill it with values
    var laOne = document.getElementById("selectorList1");
    for (var i = 0; i < myAncestries.length; i++) {
        laOne.innerHTML +=
            '<option value="' + i + '">' + myAncestries[i].name + "</option>";
    }

    // Create a selection list for sListTwo, including a call to function onchange()
    elTwo.innerHTML =
        '<select size="9" id="selectorList2" onchange="displayAncestries2()">';
    var laTwo = document.getElementById("selectorList2");
    for (var j = 0; j < myAncestries.length; j++) {
        laTwo.innerHTML +=
            '<option value="' + j + '">' + myAncestries[j].name + "</option>";
    }
}

// Display data from the selected list item from the first list
function displayAncestries1() {
    var x = document.getElementById("selectorList1").value;
    document.getElementById("descript1").value = myAncestries[x].name;
    document.getElementById("descript1").innerHTML =
        "Average lifespan of a(n)" +
        '<br/><span id="name1">' +
        myAncestries[x].name.toUpperCase() +
        '</span> is <span id="age1">' +
        myAncestries[x].age +
        "</span> years";
}

// Display data from the selected list item from the second list
function displayAncestries2() {
    var x = document.getElementById("selectorList2").value;
    document.getElementById("descript2").value = myAncestries[x].name;
    document.getElementById("descript2").innerHTML =
        "Average lifespan of a(n)" +
        '<br/><span id="name2">' +
        myAncestries[x].name.toUpperCase() +
        '</span> is <span id="age2">' +
        myAncestries[x].age +
        "</span> years";
}

// Used to get the user inputted age for the base Ancestries.
function getInputAge() {
    return document.getElementById("inputAgetxt").value;
}

// Is a Number
function isNum(input) {
    return input - 0 == input && ("" + input).trim().length > 0;
}

// Used to validate all input from the user, if all pass, then calculate relative age.
function validateInput() {
    if (!fileFound) {
        alert("Please load a data file!");
    } else {
        var a = document.getElementById("selectorList1").value;
        var b = document.getElementById("selectorList2").value;

        if (a == "") {
            alert("Please select input age!");
        } else if (b == "") {
            alert("Please select output age!");
        } else {
            var c = getInputAge();

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
}

// Calculate
function calculate(s1) {
    var x = document.getElementById("selectorList1").value;
    var y = document.getElementById("selectorList2").value;
    var aMax = myAncestries[x].age;
    var bMax = myAncestries[y].age;
    var result = (bMax * s1) / aMax;
    if (Number.isInteger(result) == false) {
        result = result.toFixed(3);
    }
    document.getElementById("outputAgetxt").value = result;
}

//const init = () => {};
