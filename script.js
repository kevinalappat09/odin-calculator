let buttons_nodel = document.querySelectorAll('.add');
let array_buttons = Array.from(buttons_nodel);

let screen_element = document.querySelector('.input');
let clear_button = document.querySelector('#clear');
clear_button.addEventListener('click',clear_screen);

let equal_button = document.querySelector('#equal');
equal_button.addEventListener('click',evaluate);

array_buttons.forEach(element => {
    element.addEventListener('click',addToScreen);
});

function addToScreen(e) {
    screen_element.value = screen_element.value + e.target.textContent;
}

function add(n1,n2) {
    return n1+n2;
}

function sub(n1,n2) {
    return n1-n2;
}

function mul(n1,n2) {
    return n1*n2;
}

function div(n1,n2) {
    if(n1 == 0) {
        screen_element.value = "ERROR : Divisble by 0";
        return;
    }
    return n1/n2;
}

function clear_screen() {
    screen_element.value = ""
}

function get_operators(string) {
    let operators = string.replace(/[0-9]+/g,'#').split("#");
    operators = operators.filter(element => {
        if(element === '') {
            return false;
        } else {
            return true;
        }
    })
    return operators;
}

function get_operands(string) {
    let operands = string.replace(/[^\w\s]/gi, '#');
    operands = operands.split("#");
    return operands;
}

function evaluate() {
    string = screen_element.value;
    
    let operators = get_operators(string);
    let operands = get_operands(string);
    
    if(operators.length == operands.length-1) {
        console.log(operators);
        console.log(operands);

        while(operators.length > 0) {
            num1 = Number(operands.pop());
            num2 = Number(operands.pop());
            let result;
            curr_operator = operators.pop();
            switch (curr_operator) {
                case '+' :
                    result = add(num2,num1);
                    break;
                case '-' :
                    result = sub(num2,num1);
                    break;
                case '*' :
                    result = mul(num2,num1);
                    break;
                case '/' :
                    result = div(num2,num1);
                    break;
                default :
                    screen_element.value = "ERROR :Invalid Operator";
            }
            operands.push(result);
        }
        screen_element.value = operands[0];
    } else {
        screen_element.value = "ERROR - Invalid Expression";
    }
}