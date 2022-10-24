document.querySelector("#inputs").onchange = function () {
    var bill = Number(document.getElementById("bill").value);
    if (bill === "" || bill <= 0) {
      alert("Enter a Correct input");
      return;
    }
    var tip = document.getElementById("tipValue").value;
    document.getElementById("tipOutput").innerHTML = `${tip}%`;

    var tipValue = bill * (tip / 100);
    var finalBill = bill + tipValue;
    console.log(finalBill);

    var tipAmount = document.querySelector("#tipAmount");
    var totalBillWithTip = document.querySelector("#totalBillWithTip");

    tipAmount.value = tipValue.toFixed(2);
    totalBillWithTip.value = finalBill.toFixed(2);
  };