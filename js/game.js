var money = 20000000;
var moneyStr = "20,000,000";
var actionsDoneToday = 0;
var days = 0;
var spendPerDay = $('input[name="spendingHabits"]:checked').val();

$("#choice2").attr("disabled", true);
$("#choice3").attr("disabled", true);

//Actions

$("#spend").click(function(){
  if(actionsDoneToday !== 6)
  {
    $('.spendChoice').show();
    randomSpendChoices();
  }
  else
  {
    alert("No more spending for today.");
  }
});
$('.choice').click(function(){
    $('.spendChoice').hide();
});
$("#manage").click(function(){
  $(".habitThing").show();
});
$("#backOut").click(function(){
  $(".habitThing").hide();
});

$("#advance").click(function(){
  if(actionsDoneToday === 6)
  {
    spendPerDay = $('input[name="spendingHabits"]:checked').val();
    modifySpend(days);
    let newValue = getRandomInt(500000, (750000+(days+16000)));
    money += newValue;
    money -= Number(spendPerDay);
    newValue -= Number(spendPerDay);
    let val = money.toLocaleString("en-US");
    moneyStr = val;
    $("#moneyValue").text(moneyStr);
    $("#moneyGranted").text("Money Granted Yesterday: $"+newValue.toLocaleString("en-US"));
    actionsDoneToday = 0;
    $("#actionsLeft").text("Actions Left Today: " + (6 - actionsDoneToday));
    days += 1;
    $("#daysCompleted").text("Days Completed: "+days);
    let chooser = getRandomInt(0, currentEvents.length-1);
    $("#event").text(currentEvents[chooser]);
  }
  else{
    alert("Can't advance day!");
  }
});

$("#change").click(function(){
  if(money >= 0)
  {
    alert("Lose all your money first.");
  }
  else
  {
    alert("Congrats! You're bankrupt now!");
    window.location = "final.html";
  }
});

//Spending

var spendChoiceTypes = ["buying expensive cars", "charity", "cats", "houses", "ice cream", "data", "parking tickets", "unpaid bills", "tables", "propaganda", "aid", "being nice", "more charities", "money", "spendings"];
var spendChoiceTypeAmounts = [1700000, 10000, 250, 350000, 10, 5000, 800, 4300, 500, 130000, 340000, 400, 83293, -20000000, 10000];

var spendChoiceAmounts = [100,100,100];

function randomSpendChoices()
{
  let chooserNum = getRandomInt(0,spendChoiceTypes.length-1);
  $("#spendC1").text("Spend on "+spendChoiceTypes[chooserNum]+"\n Amount Spent: $"+spendChoiceTypeAmounts[chooserNum].toLocaleString("en-US"));
  spendChoiceAmounts[0] = spendChoiceTypeAmounts[chooserNum];
  
  let chooserNum2 = getRandomInt(0,spendChoiceTypes.length-1);
  $("#spendC2").text("Spend on "+spendChoiceTypes[chooserNum2]+"\n Amount Spent: $"+spendChoiceTypeAmounts[chooserNum2].toLocaleString("en-US"));
  spendChoiceAmounts[1] = spendChoiceTypeAmounts[chooserNum2];
  
  let chooserNum3 = getRandomInt(0,spendChoiceTypes.length-1);
  $("#spendC3").text("Spend on "+spendChoiceTypes[chooserNum3]+"\n Amount Spent: $"+spendChoiceTypeAmounts[chooserNum3].toLocaleString("en-US"));
  spendChoiceAmounts[2] = spendChoiceTypeAmounts[chooserNum3];
}

function spendMoney(spendChoice)
{
  if(actionsDoneToday < 6)
  {
    money -= spendChoiceAmounts[spendChoice];
    let val = money.toLocaleString("en-US");
    moneyStr = val;
    actionsDoneToday += 1;
  }
  $("#moneyValue").text(moneyStr);
  $("#actionsLeft").text("Actions Left Today: " + (6 - actionsDoneToday));
}

$("#spendC1").click(function(){spendMoney(0)});
$("#spendC2").click(function(){spendMoney(1)});
$("#spendC3").click(function(){spendMoney(2)});

//Habits
function modifySpend(d)
{
  if(d >= 4)
  {
    $("#choice2").attr("disabled", false);
  }
  else
  {
    $("#choice2").attr("disabled", true);
  }
  
  if(d >= 9)
  {
    $("#choice3").attr("disabled", false);
  }
  else
  {
    $("#choice3").attr("disabled", true);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
