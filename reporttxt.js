/*

   Author:Brock Smith
   Date:11/14/16     

   Filename: reporttxt.js
*/

window.onload = initPage; //FAITH: This was not calling the initPage function correctly

  function initPage() {
	  alert("hello");
	  var dataFields = document.getElementsByClassName('expenseEntry'); //FAITH: Create a list and fill its values with the values of whatever is in the field that have "expenseEnter" as their class name.
	//FAITH: The easiest way to loop through this is with a For Each loop as shown below.
	for (i in dataFields) {
		alert(dataFields[i].value);
		dataFields[i].onblur = update(dataFields[i].value);//FAITH: Call the update method when the field is given and then removed focus.
	}
	document.getElementById('expform').onsubmit = validateForm(); //FAITH: On form submission, call the validateForm method you created.
  }


   function testLength(field){
	   if(field.value.length == 0){
		   field.backgroundColor = "yellow";
		   return false;
	   }
	   else {
		   field.backgroundColor = "white";
		   return true;
	   }
   }

   function testPattern(field, regx){
	   var patternTest = field.test(regx);
	   
	   if (patternTest = false){
		   field.backgroundColor = "yellow";
		   field.style.color = "red";
		   return false;
	   }
	   else {
		   field.backgroundColor = "white";
		   field.style.color = "black";
		   return true;
	   }
	   
   }

   function validateForm(){
	   var isValid = true;
	   var accountRegx = /^ACT\d{6}$/;
	   var departmentRegx = /^DEPT\d{3}$/;
	   var projectRegx = /^PROJ\d{5}$/;
	   
	   if(testLength(document.forms[0].lname).value == false)
	   {	   
		   isValid = false;
	   }
	   if(testLength(document.forms[0].fname).value == false)
	   {
		   isValid = false;
	   }
	   if(testLength(document.forms[0].address).value == false)
	   {
		   isValid = false;
	   }
	   if(testLength(document.forms[0].summary).value == false)
	   {
		   isValid = false;
	   }
	   
	   if(testPattern(document.forms[0].account.value, accountRegx) == false)
	   {
		   isValid = false;
	   }
	   if(testPattern(document.forms[0].department, departmentRegx) == false)
	   {
		   isValid = false;
	   }
	   if(testPattern(document.forms[0].project, projectRegx) == false)
	   {
		   isValid = false;
	   }
	   //if() //7.f.
	   if(isValid == false)
	   {
		   alert("Please fill out all required fields in the proper format.");
	   }
	   return isValid;
   }


   function calcRow(row){
	   var total = 0.00;
	   var travel = parseFloat(document.forms[0].elements["travel"+row].value);
	   var lodge = parseFloat(document.forms[0].elements["lodge"+row].value);
	   var meal = parseFloat(document.forms[0].elements["meal"+row].value);
	   total = (travel + lodge + meal);
	   return total;
   }

   function calcTotal(){
	   var totalExp = 0;
	   alert("hello");
	   for (var i = 1; i<=4; i++)
	   {
		   totalExp += calcRow(i);
	   }
	   return totalExp;
   }

   function update(expense){
	  alert("world");
	  var numRegExp = /^\d*(\.\d{0,2})?$/;
		
		 //FAITH: Test to determine if the correct value is being passed.
	   if(numRegExp.test(expense) == true){
		   alert("Value is: " + expense);
		    expense = parseFloat(expense).toFixed(2); //FAITH: The value is being passed in as 0, so it needs to be parsed to a float.
			alert("New value is: " + expense);
		   for(var i = 1; i <= 4; i++)//FAITH: Good job looping through here, remember to use var instead of int.
		   {
			   calcRow(i);
			   //parseFloat(calcRow(document.getElementById("sub" + i ).value)).toFixed(2);
				/*FAITH: now you will want to get the id of sub plus the number.  You can do that with the
				document.getElementById method, using "sub" + i as the argument.
				Then you will need to set it's VALUE (remember .value here) to the calcRow method you created and
				set it's precision fixed to 2 decmimal places.*/
		   }
		   //FAITH: After that, get the element with the id of "total" and set its value to you calcTot() method.
		   document.getElementById("total").value = calcTotal();
		}
		else {
			alert("Invalid Currency Value!");
			expense = 0.00;
			this.focus(); //FAITH: Just call the focus() method to return focus back to the method.
		}
		   
	   }
   //}