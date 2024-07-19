const pi = 3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067; 

function add(a, b) {
    return (a + b);
}

function sub(a, b) {
    return (a - b);
}

function mult(a, b) {
    return (a * b);
}

function divide(a, b) {
    return (a / b);
}

function sqrt(n) {
    return (n ** .5);
}

function pow(a, b) {
    return (a ** b);
}

function sq(x) {
    return (x ** 2);
}

function factorial(x) {
    if (x % 1 !== 0 || x < 0) {
        return (NaN);
    } else if (x === 0){
        return (1);
    }else {
        let ret = x;
        let temp = ret - 1;
        while (temp > 0) {
            ret *= temp;
            temp--;
        }
        return (ret);
    } 
}

function reciprocal(x) {
    return (x ** -1);
}

function sin(x) {
    let ret = 0;
    let iters = x < 0 ? (((-1) * parseInt(-(-x / 1))) + 30) : (parseInt(-(-x / 1)) + 30);

    for(let n = 0; n < iters ; n++) {
       ret += (((-1) ** n) / factorial(2 * n + 1)) * (x ** (2 * n + 1));
    }

    return (ret);
}

function cos(x) {
    return (sin(x + pi/2));
}

function tan(x) {
    return (sin(x) / cos(x));
}

function sec(x) {
    return (reciprocal(cos(x)));
}

function csc(x) {
    return (reciprocal(sin(x)));
}

function cot(x) {
    return (reciprocal(tan(x)));
}

function euler_x(x) {
    let ret = 0;
    let iters = x < 0 ? (((-1) * parseInt(-(-x / 1))) + 30) : (parseInt(-(-x / 1)) + 30);

    for(let n = 0 ; n < iters ; n++) {
        ret += (x ** n) / factorial(n);
    }

    return (ret);
}

function ln(x) {
    if (x <= 0) {
        return NaN; 
    }
    
    let thresh = 1e-10; 
    let ret = 0; 
    let term = 1;
    let n = 1;
    
    while (((term < 0) ? (term * (-1)) : term) > thresh) {
        term = (((x - 1) / (x + 1)) ** (2 * n - 1)) / (2 * n - 1);
        ret += term;
        n++;
    }
    
    return (2 * ret); 
}

function logb(a, b) {
    if (a <= 0) {
        return NaN;
    }

    return (ln(a) / ln(b));
}

function ten_x(x) {
    return (10 ** x);
}

function arcsin(x) {
    if(!(-1 <= x && x <= 1)) {
        return (NaN);
    }

    let ret = 0;
    let iters = x < 0 ? (((-1) * parseInt(-(-x / 1))) + 30) : (parseInt(-(-x / 1)) + 30);

    for(let n = 0; n < iters ; n++) {
        ret += (factorial(2 * n) * (x ** (2 * n + 1))) / ((4 ** n) * (factorial(n) ** 2) * (2 * n + 1));
    }

    return (ret);
}

function arccos(x) {
    if(!(-1 <= x && x <= 1)) {
        return (NaN);
    }

    return ((pi / 2) - arcsin(x));
}

function arctan(x) {
    if(!(-1 <= x && x <= 1)) {
        return (NaN);
    }

    let ret = 0;
    let iters = x < 0 ? (((-1) * parseInt(-(-x / 1))) + 30) : (parseInt(-(-x / 1)) + 30);

    for(let n = 0; n < iters ; n++) {
        ret += (((-1) ** n) * (x ** (2 * n + 1))) / (2 * n + 1);
    }

    return (ret);
}

function arcsec(x) {
    return (arcos(1 / x));
}

function arccsc(x) {
    return (arcsin(1 / x));
}

function arccot(x) {
    return (arctan(1 / x));
}

function parseExpression(expr) {
    //get rid of whitespace
    expr = expr.trim();
    console.log("EXPRESSION: " + expr);
    let pidx = isInParentheses(expr, '+');
    let sidx = isInParentheses(expr, '-');
    let subExpr = null;
    let term = null;

    if(pidx != null) {
        if (sidx != null && (sidx > pidx)) {
            subExpr = expr.substring(0, sidx) === '' ? "0" : expr.substring(0, sidx);
            term = expr.substring(sidx + 1);
            return (sub(parseExpression(subExpr), parseTerm(term)));
        } else {
            subExpr = expr.substring(0, pidx);
            term = expr.substring(pidx + 1);
            return (add(parseExpression(subExpr), parseTerm(term)));
        }   
    } else if (sidx != null) {
        subExpr = expr.substring(0, sidx) === '' ? "0" : expr.substring(0, sidx);
        term = expr.substring(sidx + 1);
        return (sub(parseExpression(subExpr), parseTerm(term)));
    }

    return (parseTerm(expr));
}

function parseTerm(term) {
    //get rid of whitespace
    term = term.trim();
    console.log("TERM: " + term);
    let midx = isInParentheses(term, '*');
    let didx = isInParentheses(term, '/');
    let subTerm = null;
    let group = null;

    if(midx != null) {
        if (didx != null && (didx > midx)) {
            subTerm = term.substring(0, didx);
            group = term.substring(didx + 1);
            return (divide(parseTerm(subTerm), parseGroup(group)));
        } else {
            subTerm = term.substring(0, midx);
            group = term.substring(midx + 1);
            return (mult(parseTerm(subTerm), parseGroup(group)));
        }   
    } else if (didx != null) {
        subTerm = term.substring(0, didx);
        group = term.substring(didx + 1);
        return (divide(parseTerm(subTerm), parseGroup(group)));
    }

    return (parseGroup(term));
}

function parseGroup(group) {
    //get rid of whitespace
    group = group.trim();
    console.log("Group: " + group);
    let cidx = isInParentheses(group, '^');
    let subGroup = null;
    let factor = null;
    if(cidx != null) {
        subGroup = group.substring(0, cidx);
        factor = group.substring(cidx + 1);
        return (pow(parseGroup(subGroup), parseFactor(factor)));
    }

    return (parseFactor(group));
}

function parseFactor(factor) {
    //get rid of whitespace
    factor = factor.trim();
    console.log("FACTOR: " + factor);

    if(/^[-+]?[0-9]*\.?[0-9]+$/.test(factor)) {
        return (parseFloat(factor));
    }

    if(factor === "𝛑") {
        return (pi);
    }

    if (/^\(.+\)/.test(factor)) {
        let test = factor.substring(1, factor.length - 1);
        if(!isNaN(parseExpression(test))) {
            return (parseExpression(test))
        }
        return (NaN);
    } 

    if (/^sin\(.+\)/.test(factor)) {
        return (sin(parseExpression(factor.substring(4, factor.length - 1))));
    } 

    if (/^cos\(.+\)/.test(factor)) {
        return (cos(parseExpression(factor.substring(4, factor.length - 1))));
    } 

    if (/^tan\(.+\)/.test(factor)) {
        return (tan(parseExpression(factor.substring(4, factor.length - 1))));
    } 

    if (/^sec\(.+\)/.test(factor)) {
        return (sec(parseExpression(factor.substring(4, factor.length - 1))));
    } 

    if (/^csc\(.+\)/.test(factor)) {
        return (csc(parseExpression(factor.substring(4, factor.length - 1))));
    } 

    if (/^cot\(.+\)/.test(factor)) {
        return (cot(parseExpression(factor.substring(4, factor.length - 1))));
    } 

    if (/^arcsin\(.+\)/.test(factor)) {
        return (arcsin(parseExpression(factor.substring(7, factor.length - 1))));
    } 

    if (/^arccos\(.+\)/.test(factor)) {
        return (arccos(parseExpression(factor.substring(7, factor.length - 1))));
    } 

    if (/^arctan\(.+\)/.test(factor)) {
        return (arctan(parseExpression(factor.substring(7, factor.length - 1))));
    } 

    if (/^arcsec\(.+\)/.test(factor)) {
        return (arcsec(parseExpression(factor.substring(7, factor.length - 1))));
    } 

    if (/^arccsc\(.+\)/.test(factor)) {
        return (arccsc(parseExpression(factor.substring(7, factor.length - 1))));
    } 

    if (/^arccot\(.+\)/.test(factor)) {
        return (arccot(parseExpression(factor.substring(7, factor.length - 1))));
    } 

    if (/^ln\(.+\)/.test(factor)) {
        return (ln(parseExpression(factor.substring(3, factor.length - 1))));
    } 

    if (/^e\^\(.+\)/.test(factor)) {
        return (euler_x(parseExpression(factor.substring(3, factor.length - 1))));
    } 

    if (/^\(.+\)!/.test(factor)) {
        return (factorial(parseExpression(factor.substring(1, factor.length - 2))));
    } 

    if (/^log\(.+\)/.test(factor)) {
        let inputStr = factor.substring(4, factor.length - 1);
        let cidx = isInParentheses(inputStr, ',');
        let base = inputStr.substring(0, cidx);
        let product = inputStr.substring(cidx + 1);
        return (logb(parseExpression(product), parseExpression(base)));
    } 

    return (NaN);
}

function isInParentheses(str, symbol) {
    let openParentheses = 0;
    let size = symbol.length;

    for (let i = str.length - 1; i >= 0; i--) {
        if (str.substring(i, i + size) === symbol && !(openParentheses > 0)) {
            return i; 
        }
        if (str[i] === ')') {
            openParentheses++;
        } else if (str[i] === '(') {
            openParentheses--;
        }

        
    }

    return null; 
}




