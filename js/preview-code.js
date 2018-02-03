console.log("Preview code loaded");

const lineHeight = 17;
const letterWidth = 8.5;
const padding = 55;
var cursorLine = 1;
var cursorLetter = 0;

// active should be true iff code inputting formatting selected
// const active = false;
// const language;

// function toggleActive() {
//   active = !active;
// }

// function setLanguage(lang) {
//   language = lang;
// }

$(document).ready(function() {
  console.log("Messenger ready");
  initialize();

  // To be called when language is selected
  function formatInputBox() {
    // const  inputText();
  }

  // Must always run on document load for it to work
  function initialize() {
    var pre = document.createElement('pre');
    pre.setAttribute("id", "code-preview");
    pre.className = "prettyprint prettyprinted";
    var cursor = document.createElement('span');
    cursor.className = "blinking-cursor";
    cursor.innerHTML = '|'
    $('._5rpb').prepend(pre);
    $('._5rpb').prepend(cursor);
    format(inputText(), 'js');
    setCursorPos(1, 0);
  }

  function format(inputText, lang) {
    var code = '';
    for (var i = 0; i < inputText.length; i++) {
      code += inputText[i] + "\n";
    }

    var pre = $("#code-preview");
    var formattedCode = PR.prettyPrintOne(code, lang, true);
    pre.html(formattedCode);
    // setCursorPos(1, 0);
  }

  // Returns an array on input text one line for each input
  function inputText() {
    var inputs = []
    var inputLines = $("div._1mf._1mj");
    inputLines.each(function() {
      inputs.push($(this).text());
    });
    return inputs;
  }

  $("._5rpu").on("DOMSubtreeModified",function(){
    // console.log("Change in input detected");
    format(inputText(), 'js');
  });

  $('._5rpu').click(function (e) { //Offset mouse Position
    var posX = $(this).offset().left,
        posY = $(this).offset().top;
    var lineClicked = Math.floor(((e.pageY - posY) / lineHeight) + 1);
    var letterClicked;
    if (Math.floor((e.pageX - posX)) < 55) {
      letterClicked = 0;
    } else {
      letterClicked = Math.floor(((e.pageX - posX) - padding + (letterWidth/2) ) / letterWidth);
    }

    setCursorPos(lineClicked, letterClicked);
  });

  function setCursorPos(line, letter) {
    var inputLines = $('._1mf._1mj');
    if (line > inputLines.length) {
      line = inputLines.length;
    }
    if (line < 1) {
      line = 1;
    }
    var lineText = inputLines[line - 1].firstChild.firstChild.innerHTML
    if (letter > lineText.length) {
      letter = lineText.length;
    }
    if (letter < 0) {
      letter = 0;
    }

    cursorLine = line;
    cursorLetter = letter;

    y = (line - 1) * lineHeight + 3;
    x = padding + letter * letterWidth;
    $('.blinking-cursor').css({top: y, left: x});
  }

  $("._5rpu").on('keydown', function(e) {
    switch(e.which) {
      case 37: // left
      setCursorPos(cursorLine, cursorLetter - 1);
      break;
      case 38: // up
      setCursorPos(cursorLine - 1, cursorLetter);
      break;
      case 39: // right
      setCursorPos(cursorLine, cursorLetter + 1);
      break;
      case 40: // down
      setCursorPos(cursorLine + 1, cursorLetter);
      break;
      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

});