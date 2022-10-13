
/*Function to display numbers on keypress*/ 

function numpress(val){
    document.getElementById("screen").value = document.getElementById("screen").value + val;
}

/*Function to calculate the result*/ 

function equals(){
    var x = document.getElementById("screen").value;
    var result = eval(x);
    document.getElementById("screen").value = result;
}

/*Function for backspace*/ 

function clearscreen(){
    var value = document.getElementById("screen").value;
    document.getElementById("screen").value = value.substr(0, value.length - 1);
}

/*Function to reset*/ 

function reset(){
    document.getElementById("screen").value =" ";
}
