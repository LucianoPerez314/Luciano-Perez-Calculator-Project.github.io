//TODO: See what happens if I remove this.
const enterB = document.getElementById('enter');

function clickTerminal() {
    document.getElementById('terminal').focus();
    document.getElementById('terminal').click();
}

function moveCaretLeft() {
    // Get the input field or textarea element
    const element = document.getElementById('terminal');

    // Move the caret one character to the left
    const currentPos = element.selectionStart;
    element.setSelectionRange(currentPos - 1, currentPos - 1);
}

function moveCaretRight() {
    // Get the input field or textarea element
    const element = document.getElementById('terminal');

    // Move the caret one character to the left
    const currentPos = element.selectionStart;
    element.setSelectionRange(currentPos + 1, currentPos + 1);
}

function moveCaretUp() {
    // Get the input field or textarea element
    const element = document.getElementById('terminal');
    
    // Move the caret to the new position
    const currentPos = element.selectionStart;
    if (currentPos - 37 < 0) {
        element.setSelectionRange(0, 0);
    } else {
        element.setSelectionRange(currentPos - 37, currentPos - 37);
    }
}

function moveCaretDown() {
    // Get the input field or textarea element
    const element = document.getElementById('terminal');
    
    // Move the caret to the new position
    const currentPos = element.selectionStart;
    element.setSelectionRange(currentPos + 37, currentPos + 37);
}

function insertText(input) {
    // Get the textarea element
    const textarea = document.getElementById('terminal');

    // Get the current caret position
    const currentPos = textarea.selectionStart;

    // Get the current text content of the textarea
    let text = textarea.value;


    // Insert the new text at the current caret position
    text = text.slice(0, currentPos) + input + text.slice(currentPos);

    // Update the textarea's value with the modified text
    textarea.value = text;

    // Move the caret to the end of the newly inserted text
    const newPos = currentPos + input.length;
    textarea.setSelectionRange(newPos, newPos);
}


function parseTerminal() {
    // Get the textarea element
    const textarea = document.getElementById('terminal');
    if (textarea.value === "01001100 01100101 01110100 00100111 01110011 00100000 01010000 01101100 01100001 01111001") {
        window.location.href = 'https://lucianoperez314.github.io/2D-Game-Project-Luciano-Perez.github.io/';
    } else if (textarea.value === "01134") {
        textarea.value = "HI :)";
    }else {
        // Get the current text content of the textarea
        textarea.value = parseExpression(textarea.value);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    clickTerminal();
    document.getElementById('add').addEventListener('click', function(){
        insertText("+");
        //document.getElementById('terminal').value += ("+");
        clickTerminal();
    });
    document.getElementById('subtract').addEventListener('click', function(){
        insertText("-");
        clickTerminal();
    });
    document.getElementById('multiply').addEventListener('click', function(){
        insertText("*");
        clickTerminal();
    });
    document.getElementById('divide').addEventListener('click', function(){
        insertText("/");
        clickTerminal();
    });
    document.getElementById('sin').addEventListener('click', function(){
        insertText("sin()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('cos').addEventListener('click', function(){
        insertText("cos()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('tan').addEventListener('click', function(){
        insertText("tan()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('logb').addEventListener('click', function(){
        insertText("log(,)");
        clickTerminal();
        moveCaretLeft();
        moveCaretLeft();
    });
    document.getElementById('arcsin').addEventListener('click', function(){
        insertText("arcsin()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('arccos').addEventListener('click', function(){
        insertText("arccos()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('arctan').addEventListener('click', function(){
        insertText("arctan()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('ln').addEventListener('click', function(){
        insertText("ln()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('sec').addEventListener('click', function(){
        insertText("sec()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('csc').addEventListener('click', function(){
        insertText("csc()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('cot').addEventListener('click', function(){
        insertText("cot()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('e^x').addEventListener('click', function(){
        insertText("e^()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('arcsec').addEventListener('click', function(){
        insertText("arcsec()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('arccsc').addEventListener('click', function(){
        insertText("arccsc()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('arccot').addEventListener('click', function(){
        insertText("arccot()");
        clickTerminal();
        moveCaretLeft();
    });
    document.getElementById('pi').addEventListener('click', function(){
        insertText("𝛑");
        clickTerminal();
    });
    document.getElementById('0').addEventListener('click', function(){
        insertText("0");
        clickTerminal();
    });
    document.getElementById('1').addEventListener('click', function(){
        insertText("1");
        clickTerminal();
    });
    document.getElementById('2').addEventListener('click', function(){
        insertText("2");
        clickTerminal();
    });
    document.getElementById('3').addEventListener('click', function(){
        insertText("3");
        clickTerminal();
    });
    document.getElementById('4').addEventListener('click', function(){
        insertText("4");
        clickTerminal();
    });
    document.getElementById('5').addEventListener('click', function(){
        insertText("5");
        clickTerminal();
    });
    document.getElementById('6').addEventListener('click', function(){
        insertText("6");
        clickTerminal();
    });
    document.getElementById('7').addEventListener('click', function(){
        insertText("7");
        clickTerminal();
    });
    document.getElementById('8').addEventListener('click', function(){
        insertText("8");
        clickTerminal();
    });
    document.getElementById('9').addEventListener('click', function(){
        insertText("9");
        clickTerminal();
    });
    document.getElementById('x^n').addEventListener('click', function(){
        insertText("^");
        clickTerminal();
    });
    document.getElementById('x!').addEventListener('click', function(){
        insertText("()!");
        clickTerminal();
        moveCaretLeft();
        moveCaretLeft();
    });
    document.getElementById('(').addEventListener('click', function(){
        insertText("(");
        clickTerminal();
    });
    document.getElementById(')').addEventListener('click', function(){
        insertText(")");
        clickTerminal();
    });
    document.getElementById('clear').addEventListener('click', function(){
        document.getElementById('terminal').value = ("");
        clickTerminal();
    });
    
    document.getElementById('left-arrow').addEventListener('click', function(){
        clickTerminal();
        moveCaretLeft();
    });

    document.getElementById('right-arrow').addEventListener('click', function(){
        clickTerminal();
        moveCaretRight();
    });

    document.getElementById('up-arrow').addEventListener('click', function(){
        clickTerminal();
        moveCaretUp();
    });

    document.getElementById('down-arrow').addEventListener('click', function(){
        clickTerminal();
        moveCaretDown();
    });

    document.getElementById('enter').addEventListener('click', function(){
        clickTerminal();
        parseTerminal();
    });
  });

