function eval() {
  // Do not use eval!!!
  return;
}

function checkPriority(operand) {
  if (operand === '*') return 2;
  if (operand === '/') return 2;
  if (operand === '+') return 1;
  if (operand === '-') return 1;
}

function isOperand(operand) {
  return operand === '+' || operand === '-' || operand === '*' || operand === '/';
}

function infixToPostfix(expr) {

  const tokens = expr.match(/([\#?\.\w]+)|[\^()+\-*/]/gi);
  const stack = [];
  const RPN = [];
  let token;

  while (token = tokens.shift()) {

    if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length > 0 && stack[stack.length - 1] != '(') RPN.push(stack.pop());
      if (stack.length === 0) throw new Error("ExpressionError: Brackets must be paired");
      stack.pop();
    } else if (isOperand(token)) {
      while (stack.length > 0 && isOperand(stack[stack.length - 1]) 
        && (checkPriority(token) <= checkPriority(stack[stack.length - 1]))) {
        RPN.push(stack.pop());
      };
      stack.push(token);
    } else {
      RPN.push(token);
    };
  };

  while (stack.length > 0) {
    if (!isOperand(stack[stack.length - 1])) throw new Error("ExpressionError: Brackets must be paired");
    RPN.push(stack.pop());
  }

  return RPN;
};


function expressionCalculator(expr) {
  
  const RPN = infixToPostfix(expr);
  const stack = [];
  const operands = ['+', '-', '*', '/'];

  for (let i = 0; i < RPN.length; i++) {

    if(operands.includes(RPN[i])) {

      let b = stack.pop();
      let a = stack.pop();

      if (RPN[i] === '+') {
        stack.push(a + b);
      } else if (RPN[i] === '-') {
        stack.push(a - b); 
      } else if (RPN[i] === '*') {
        stack.push(a * b); 
      } else if (RPN[i] === '/') {
        if (b === 0) throw new Error("TypeError: Division by zero.");
        stack.push(a / b);
      } 
    } else stack.push(Number(RPN[i]));
  }
  const result = stack[0];

  return result;
}

module.exports = {
  expressionCalculator
}