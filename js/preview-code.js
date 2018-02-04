console.log("Preview code loaded");
 
const lineHeight = 17;
const letterWidth = 8.5;
const padding = 42;
var cursorLine = 1;
var cursorLetter = 0;
var textLength = 0;
var numberOfLines = 0;

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

  var active = false;
  var selected = "";

  $(document).keydown(function(e) {
    // var key = e.which;
    // if(key == 13 && !e.shiftKey) {
    //   if ($(document.activeElement).hasClass("_5rpu")) {
    //     console.log("butt");
    //     var inputLines = $(document.getElementsByClassName("_5rpu")).children(":first").children();
    //     console.log(inputLines.length);
    //     var startingLine = inputLines.eq(0).children(":first");
    //     console.log(startingLine.html());
    //     startingLine.prepend("[js]");
    //     // console.log(inputLines.length);
    //     // console.log();
    //     // console.log(inputLines.eq(inputLines.length-1).children(":first").children(":first").children(":first").html());
    //     var closingLine = inputLines.eq(inputLines.length-1).children(":first");
    //     console.log(closingLine.html());
    //     closingLine.append("[/js]");
    //   }
    // }

    if (selected == "latex") {
      loadLatexImage();
    }
  });

    function insertWidget() {
        //get location to insert
        var iconImg = chrome.extension.getURL('images/icon.png');
        var buttonRow = $("._39bj");
        var ourButton = $("<li></li>").html(
            "<a class=\"snippetParseButton\" role=\"button\" href=\"#\" style=\"background-image:url(\'" +iconImg+ "\')\"></a>"
        );
        
        buttonRow.prepend(ourButton);
        console.log("button added");

        $(".snippetParseButton").on("click",function(){
            console.log("pressed button");
            beginWidget();
        });
    }

    $("._5irm").before(
                `<div id="widgetMenu" style="display:none">
                    <form class="widgetMenuForm">
                        <label class="radio-inline"><input type="radio" name="optradio" id="latex" checked>Latex</label>
                        <label class="radio-inline"><input type="radio" name="optradio" id="js">Javascript</label>
                        <label class="radio-inline"><input type="radio" name="optradio" id="py">Python</label>
                        <label class="radio-inline"><input type="radio" name="optradio" id="cpp">C++</label>
                        <label class="radio-inline"><input type="radio" name="optradio" id="raw">Raw Text</label>
                    </form>
                    <a class=\"widgetMenuPreview\" role=\"button\" href=\"#\">Preview ON/OFF</a>
                </div>`
            );
    $("#widgetMenu").hide();
    $("#widgetMenu").before(
                  // `<div id="MathDiv" style="display:none">
                  //   </div>`

                  `<div id="mathDiv" style="display:none"><img id="preview" src="#"/></div>`
                );
    $("#mathDiv").hide();

    function loadLatexImage() {
      var str = document.getElementsByClassName("_1mj")[0].firstChild.firstChild.innerHTML;
      if (str != "") {
        $("#preview").show();
        document.getElementById("preview").src = "https://chart.googleapis.com/chart?cht=tx&chl="+str;
      } else {
        $("#preview").hide();
      }
      
    }

  function loadLatexCopyLinks() {
    $('annotation[encoding="application/x-tex"]').each(function() {
    var closestParentDiv = this.closest('div');
  
    if (closestParentDiv.getElementsByClassName("latexCopy") != 0) {
      var originalStr = this.innerHTML;
      var latexStr = originalStr.replace("\\color{#fff}{", "$$$");
      latexStr = latexStr.replace(/.$/,"$$$");
      var a = document.createElement("a");
      a.innerHTML = "Copy latex";
      a.className = "latexCopy";
      a.id = latexStr;
      closestParentDiv.prepend(a);
    }

  });
  }

  loadLatexCopyLinks();

  $(".latexCopy").click(function(event) {
      var textArea = document.createElement("textarea");
      textArea.value = event.target.id;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }

      document.body.removeChild(textArea);
  });

  $(".widgetMenuPreview").on("click",function(){
    if($('#mathDiv').is(':visible')) {
      $("#mathDiv").hide();
      $("#preview").hide();
    } else {
      $("#mathDiv").show();
      $("#preview").show();
    }
    loadLatexImage();
  });

    function beginWidget() {
        if(active){
            active = false;
            console.log("deactivate");
            $("#widgetMenu").hide();
            $("#mathDiv").hide();
            removeCodeEditor();
        } else {
            active = true;
            console.log("activate");
            var textBox = $("._1mf._1mj");
            
            selected = 'latex';
            
            $('.widgetMenuForm').change(function(){
                selected = $("input[name='optradio']:checked").attr('id');
                $("#mathDiv").hide();
                $("#preview").hide();
                // if(selected=='latex'){
                //     $(".widgetMenuPreview").show();
                // }else{
                    
                // }
                console.log(selected);
                //changeInput(selected);
            });
            console.log("prepended");
            //call preview-code
            $("#widgetMenu").show();
            initialize();
        }
    }

    insertWidget();
    
    $(window).resize(function() {
        if(!$(".snippetParseButton")[0]){
            insertWidget()
        }
    });

  console.log("Messenger ready");
  // initialize();
  // To be called when language is selected
  function formatInputBox() {
    // const  inputText();
  }

  function removeCodeEditor() {
    $('._5rpu').first().css({opacity: 1,paddingLeft: "0px"});
    $('#code-preview').css({display: "none"});
    $(".blinking-cursor").first().css({display: "none"});
    $("._4_j4").first().css({marginBottom: "-10"});
    var enterField = document.getElementsByClassName('_5irm')[0];
    enterField.style.marginLeft = "12px";
    enterField.firstChild.style.backgroundColor = "#ffff";
    enterField.firstChild.style.marginRight = "1%";
  }

  // Must always run on document load for it to work
  function initialize() {
    $('._5rpu').css({opacity: 0,paddingLeft: "42px"});
    var enterField = document.getElementsByClassName('_5irm')[0];
    enterField.style.marginLeft = "0px";
    enterField.firstChild.style.backgroundColor = "#303640";
    enterField.firstChild.style.marginRight = "1%";
    var pre = document.createElement('pre');
    pre.setAttribute("id", "code-preview");
    pre.className = "prettyprint prettyprinted";
    var cursor = document.createElement('span');
    cursor.className = "blinking-cursor";
    cursor.innerHTML = '|'
    $('._5rpb').prepend(pre);
    $('._5rpb').prepend(cursor);
    format(inputText(), selected);
    initializeCursor();

    // removeCodeEditor();
  }

  function initializeCursor() {
    var inputLines = $("div._1mf._1mj");
    var line = inputLines.length;
    var letter = inputLines[line-1].firstChild.firstChild.innerHTML.length;
    textLength = inputLines.text().length;
    setCursorPos(line, letter);
  }

  function format(inputText, lang) {
    var code = '';
    for (var i = 0; i < inputText.length; i++) {
      code += inputText[i] + "\n";
    }
    var pre = $("#code-preview");
    var formattedCode = PR.prettyPrintOne(code, lang, true);
    pre.html(formattedCode);
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
    format(inputText(), selected);
    // Checks if letter was added or remove
    var inputLines = $('._1mf._1mj');
    var newCursorLine = cursorLine;
    var newCursorLetter = cursorLetter;
    if (inputLines.text().length + 1 == textLength) {
      // letter removed
      newCursorLetter = cursorLetter - 1;
      textLength = inputLines.text().length;
    } else if (inputLines.text().length - 1 == textLength) {
      // letter added
      newCursorLetter = cursorLetter + 1;
      textLength = inputLines.text().length;
    }

    if (inputLines.text().length == textLength) {
      // Checks if line removed
      if (numberOfLines > inputLines.length) {
        console.log("removed line");
        newCursorLine = cursorLine - 1;
        newCursorLetter = inputLines[newCursorLine - 1].firstChild.firstChild.innerHTML.length;
        numberOfLines = inputLines.length;
      }
      // Checks if line added
      else if (numberOfLines < inputLines.length) {
        console.log("added line");
        newCursorLine = cursorLine + 1;
        newCursorLetter = 0;
        numberOfLines = inputLines.length;
      }
    }

    // Update vars
    cursorLine = newCursorLine;
    cursorLetter = newCursorLetter;

    // console.log('newTextLength', textLength);
    console.log('newNumLines', numberOfLines);

    setCursorPos(cursorLine, cursorLetter);

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
    var lineText = inputLines[line - 1].firstChild.firstChild.innerHTML;
    if (letter > lineText.length) {
      letter = lineText.length;
    }
    if (letter < 0) {
      letter = 0;
    }

    // Update vars
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
    // e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  $(document).on('click', function(e) {
    if($('.blinking-cursor').first().is(':visible')) {
      var elem = document.getElementsByClassName('_4_j4')[0];
      if (e.target == elem || elem.contains(e.target)) {
        $('.blinking-cursor').show();
      } else {
        $('.blinking-cursor').hide();
      }
    }    
  });

});
