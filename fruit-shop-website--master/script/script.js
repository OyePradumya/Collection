
let userEnteredAmount;
let total;

// Checks User Input Amount
function submitAmount() { 
    userEnteredAmount = document.getElementById('userAmount').value;
    if(userEnteredAmount === ''){
        alert("Plz Submit Your Amount 1st !!");
        return false;
    }
    else{
        document.getElementById('amountEntered').innerText = userEnteredAmount; 
        document.getElementById('balance').innerHTML = userEnteredAmount;
        return true;
    }
}

// Increasing Function
function increaseItem(param , itemPrice){

    let noOfItem = document.getElementById(param);
    let itemsPrice = document.getElementById(itemPrice).innerHTML.replace('Rs: ' , '');

    if(submitAmount() === false){
        noOfItem.value = 0;
    }
    else{
        noOfItem.value = parseInt(noOfItem.value) + 1;
        total = document.getElementById('userTotalAmount').innerHTML = (noOfItem.value) * parseInt(itemsPrice);
        console.log(total);
        document.getElementById('balance').innerHTML = userEnteredAmount - total;
        document.getElementById('numOfItem').innerHTML = noOfItem.value;
        if(total >= userEnteredAmount){
            alert('Your Rupees Ended');
            total = total - parseInt(itemsPrice);
        }
    }
    
}

// Decreasing Function
function decreaseItem(param , itemPrice){

    let noOfItem = document.getElementById(param);
    let itemsPrice = document.getElementById(itemPrice).innerHTML.replace('Rs: ' , '');

    if(submitAmount() === false){
        noOfItem.value = 0;
    }

    else{

        if (noOfItem.value <= 0) {
            noOfItem.value = 0;
            alert('Oder Can"t Be Negative');
        }
        else{
            noOfItem.value = parseInt(noOfItem.value) - 1;
            total = document.getElementById('userTotalAmount').innerHTML = (noOfItem.value) * itemsPrice;
            document.getElementById('balance').innerHTML = userEnteredAmount - total;
            document.getElementById('numOfItem').innerHTML = noOfItem.value;
        }
    }
}