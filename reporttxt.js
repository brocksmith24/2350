/*

   Author:Brock Smith
   Date:11/14/16     

   Filename: reporttxt.js
*/

window.onload = initPage; //FAITH: This was not calling the initPage function correctly

function initPage() {
        var dataFields = document.getElementsByClassName('expenseEntry'); //FAITH: Create a list and fill its values with the values of whatever is in the field that have "expenseEnter" as their class name.
    //FAITH: The easiest way to loop through this is with a For Each loop as shown below.
    for (i in dataFields) {
        dataFields[i].onblur = update;//FAITH: Call the update method when the field is given and then removed focus.
    }
    document.getElementById('expform').onsubmit = validateForm; //FAITH: On form submission, call the validateForm method you created.
}


function testLength(field) {
    if (field.value.length == 0) {
        field.style.backgroundColor = "yellow";
        return false;
    }
    else {
        field.style.backgroundColor = "white";
        return true;
    }
}

function testPattern(field, regx) {
    var patternTest = regx.test(field.value);

    if (patternTest == false) {
        field.style.backgroundColor = "yellow";
        field.style.color = "red";
        return false;
    }
    else {
        field.style.backgroundColor = "white";
        field.style.color = "black";
        return true;
    }

}

function validateForm() {
    var isValid = true;
    var accountRegx = /^ACT\d{6}$/;
    var departmentRegx = /^DEPT\d{3}$/;
    var projectRegx = /^PROJ\d{5}$/;
    var socialRegx = /^(\d{3}-?\d{2}-?\d{4}|XXX-XX-XXXX)$/;

    if (testLength(document.forms[0].lname) == false) {
        isValid = false;
    }
    if (testLength(document.forms[0].fname) == false) {
        isValid = false;
    }
    if (testLength(document.forms[0].address) == false) {
        isValid = false;
    }
    if (testLength(document.forms[0].summary) == false) {
        isValid = false;
    }

    if (testPattern(document.forms[0].account, accountRegx) == false) {
        isValid = false;
    }
    if (testPattern(document.forms[0].department, departmentRegx) == false) {
        isValid = false;
    }
    if (testPattern(document.forms[0].project, projectRegx) == false) {
        isValid = false;
    }
    if (testPattern(document.forms[0].ssn, socialRegx) == false) {
        isValid = false;
    }
    
    if (isValid == false) {
        alert("Please fill out all required fields in the proper format.");
    }
    return isValid;
}


function calcRow(row) {
    var total = 0.00;
    var travel = parseFloat(document.forms[0].elements["travel" + row].value);
    var lodge = parseFloat(document.forms[0].elements["lodge" + row].value);
    var meal = parseFloat(document.forms[0].elements["meal" + row].value);
    total = (travel + lodge + meal);
    return total;
}

function calcTotal() {
    var totalExp = 0;
    for (var i = 1; i <= 4; i++) {
        totalExp += calcRow(i);
    }
    return totalExp;
}

function update() {
    var numRegExp = /^\d*(\.\d{0,2})?$/;

    //FAITH: Test to determine if the correct value is being passed.
    if (numRegExp.test(this.value) == true) {
        this.value = parseFloat(this.value).toFixed(2); //FAITH: The value is being passed in as 0, so it needs to be parsed to a float.
        for (var i = 1; i <= 4; i++)//FAITH: Good job looping through here, remember to use var instead of int.
        {
            calcRow(i);
            //parseFloat(calcRow(document.getElementById("sub" + i ).value)).toFixed(2);
            document.getElementById("sub" + i).value = calcRow(i).toFixed(2);
            /*FAITH: now you will want to get the id of sub plus the number.  You can do that with the
            document.getElementById method, using "sub" + i as the argument.
            Then you will need to set it's VALUE (remember .value here) to the calcRow method you created and
            set it's precision fixed to 2 decmimal places.*/
        }
        //FAITH: After that, get the element with the id of "total" and set its value to you calcTot() method.
        document.getElementById("total").value = calcTotal().toFixed(2);
    }
    else {
        alert("Invalid Currency Value!");
        this.value = 0.00;
        this.focus(); //FAITH: Just call the focus() method to return focus back to the method.
    }

}
//}