var num = [];
var operatorSign;
var dotKey = true;
var ctrlADetect = false;

window.onerror = function() {
    $(".error").css("opacity", "100");
    setTimeout(function(){
      $(".error").css({"transition": "none", "opacity": ""});
    }, 2000);
}

for (i = 0; i < 18; i++) {
  if (i > 9) {
    $(".container").prepend('<button class="keys btn' + i + '"></button>');
    $(".btn10").text("Del")
    $(".btn11").text("+")
    $(".btn12").text("-")
    $(".btn13").text(".")
    $(".btn14").text("/")
    $(".btn15").text("×")
    $(".btn16").text("Reset")
    $(".btn17").text("=")

    $(".btn13").addClass("number-key");
    $(".btn11, .btn12, .btn14, .btn15").addClass("operator-key");

  } else {
    $(".container").prepend('<button class="keys number-key btn' + i + '">' + i + '</button>');
  }
}

//entering numbers
$(".number-key").click(function() {
  num.push($(this).text());
  if (dotKey === false) {
    if ($(this).text() === ".") {
      num.pop();
    }
  }
  $(".result-value").val(num.join(""));
  if ($(this).text() === ".") {
    dotKey = false;
  }
  rtl();
});

//operators
$(".operator-key").click(function() {
  if (num.at(num.length - 1) !== ".") {
    operatorSign = $(this).text();
    operatorPressed();
    dotKey = true;
  }

});

// Delete Button
$(".btn10").click(function() {
  if (num.at(num.length - 1) === ".") {
    dotKey = true;
  }
  num.pop();
  $(".result-value").val(num.join(""));
  if (num.length === 0){
    dotKey = true;
  }
});

//Reset
$(".btn16").click(function() {
  $(".result-value").val("");
  num = [];
  operatorSign = undefined;
  dotKey = true;
});

//Result
$(".btn17").click(function() {
  finalResult();
});

//Keyboard function
$(document).keydown(function(e) {
  //for Reseting ctrl + A detect
  if (e.keyCode == 65 && e.ctrlKey) {
    ctrlADetect = true;
  }

  //Numbers Keys
  if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode === 110 || e.keyCode === 190)) {
    num.push(e.key);
    if (dotKey === false) {
      if (e.keyCode === 110) {
        num.pop();
      }
    }
    $(".result-value").val(num.join(""));
    if (e.keyCode === 110) {
      dotKey = false;
    }
    rtl();
  }

  // Backspace Key
  if (ctrlADetect === false) {
    if (e.keyCode === 8) {
      if (num.at(num.length - 1) === ".") {
        dotKey = true;
      }
      num.pop();
      $(".result-value").val(num.join(""));
      if (num.length === 0){
        dotKey = true;
      }
    }
  } else {
    if (e.keyCode === 8) {
      $(".result-value").val("");
      num = [];
      operatorSign = undefined;
      dotKey = true;
      ctrlADetect = false;
    }
  }

  //Operator Keys
  if ((e.keyCode >= 106 && e.keyCode <= 109) || (e.keyCode === 111)) {
    //Multiply Key
    if (num.at(num.length - 1) !== ".") {
      if (e.keyCode === 106) {
        operatorSign = e.key.replace("*", "×");
        operatorPressed();
        dotKey = true;
      } else {
        operatorSign = e.key;
        operatorPressed();
        dotKey = true;
      }
    }
  }

  //Result with enter
  if (e.keyCode === 13) {
    finalResult();
  }

});

$(".result-value").blur(() => {
  $(".result-value").focus();
});

$(".result-value").blur(() => {
  rtl();
});

//changing width of input
setInterval(() => {
  var containerWidth = $(".container").css("width");
  $("input").css("width", containerWidth);
}, 1);

//detecting Ctrl+V
$(document).bind('paste', function() {
    $(".result-value").attr("readonly", false);
    setTimeout(()=>{
      num = $(".result-value").val().split("");
      $(".result-value").attr("readonly", true);
    }, 0);
});

//When input goes overflow
$(document).ready(function(){
  $(".result-value").scroll(function(){
    var scrollValue = $(".result-value").scrollLeft();
    if (scrollValue > 0){
    $(".for-hidden").css("display", "block");
  } else {
    $(".for-hidden").css("display", "");
  }
  });
});

//Operator Keys function
function operatorPressed() {

  if (num.length === 0) {
    num.push(operatorSign);
    if (num.at(0) === "-") {
      $(".result-value").val(num.join(""));
    } else {
      num.pop();
    }
  }

  var arrrayLastValue = num.at(num.length - 1);
  if (num.length > 1) {
    if (arrrayLastValue === "-") {
      num.pop(arrrayLastValue);
    }
  }
  if ((arrrayLastValue === "+") || (arrrayLastValue === "×" || arrrayLastValue === "/")) {
    num.push(operatorSign);
    arrrayLastValue = num.at(num.length - 1)
    if ((arrrayLastValue === "+") || (arrrayLastValue === "×" || arrrayLastValue === "/")) {
      num.pop(arrrayLastValue);
      num.pop(num.at(num.length - 2));
    }
  }

  num.push(operatorSign);

  if (num.at(num.length - 1) === "-" && num.at(num.length - 2) === "-") {
    num.pop(arrrayLastValue);
  }

  if (num.length > 2) {
    if ((num.at(num.length - 2) === "+") || (num.at(num.length - 2) === "×") || (num.at(num.length - 2) === "/")) {
      if (num.at(num.length - 1) !== "-") {
        num.pop(num.at(num.length - 2));
        operatorSign = "-";
        num.push(operatorSign);
      }
    }
  }
  if (num.at(0) === "-") {
    if ((num.at(1) === "+" || num.at(1) === "/") || (num.at(1) === "×")) {
      num.pop();
    }
  }
  rtl();
  if ((num.at(0) === "+" || num.at(0) === "/") || (num.at(0) === "×")) {
    if (num.at(0) === "-") {
      $(".result-value").val(num.join(""));
    } else {
      num.pop(num.at(0));
    }
  } else {
    $(".result-value").val(num.join(""));
  }
}

//result function
function finalResult() {
  var resultValue = $(".result-value").val().replace("×", "*");
  var result = parseFloat(eval(resultValue).toFixed(15));
  $(".result-value").val(result);
  num = [];
  num.push(result);
  if(num.at(0) % 1 !== 0){
    dotKey = false;
  }
  rtl();
}

///function for making input rhs
function rtl() {
  setTimeout(() => {
    $(".result-value").scrollLeft($(".result-value").width());
  }, 0);
}


//************* THEME ***********//

$(".switch").click(() => {
  if ($('.switch-btn').css("left") === "0px") {
    $('.switch-btn').css("left", "17px");
    $(":root").css({
      "--body-background": "hsl(0, 0%, 90%)",
      "--key-background": "hsl(0, 5%, 81%)",
      "--result-background": "hsl(0, 0%, 93%)",

      "--special-key": "hsl(185, 42%, 37%)",
      "--special-key-shadow": "hsl(185, 58%, 25%)",

      "--result-key": "hsl(25, 98%, 40%)",
      "--result-key-shadow": "hsl(25, 99%, 27%)",

      "--normal-key": "hsl(45, 7%, 89%)",
      "--normal-key-shadow": "hsl(35, 11%, 61%)",

      "--normal-key-text": "hsl(60, 10%, 19%)",
      "--special-key-text": "#ffffff",
      "--special-text": "hsl(60, 10%, 19%)",
      "--result-key-text": "#ffffff",

      "--placeholder-color": "hsl(60deg 10% 19% / 50%)"
    });
  }

  if ($('.switch-btn').css("left") === "17px") {
    $('.switch-btn').css("left", "35px");
    $(":root").css({
      "--body-background": "hsl(268, 75%, 9%)",
      "--key-background": "hsl(268, 71%, 12%)",
      "--result-background": "hsl(268, 71%, 12%)",

      "--special-key": "hsl(281, 89%, 26%)",
      "--special-key-shadow": "hsl(285, 91%, 52%)",

      "--result-key": "hsl(176, 100%, 44%)",
      "--result-key-shadow": "hsl(177, 92%, 70%)",

      "--normal-key": "hsl(268, 47%, 21%)",
      "--normal-key-shadow": "hsl(290, 70%, 36%)",

      "--normal-key-text": "hsl(52, 100%, 62%)",
      "--special-key-text": "#ffffff",
      "--special-text": "hsl(52, 100%, 62%)",
      "--result-key-text": "hsl(198, 20%, 13%)",

      "--placeholder-color": "hsl(52deg 100% 62% / 50%)"

    });
  }

  if ($('.switch-btn').css("left") === "35px") {
    $('.switch-btn').css("left", "0px");
    $(":root").css({
      "--body-background": "",
      "--key-background": "",
      "--result-background": "",

      "--special-key": "",
      "--special-key-shadow": "",

      "--result-key": "",
      "--result-key-shadow": "",

      "--normal-key": "",
      "--normal-key-shadow": "",

      "--normal-key-text": "",
      "--special-key-text": "",
      "--special-text": "",
      "--result-key-text": "",
      "--placeholder-color": ""
    });
  }
});
