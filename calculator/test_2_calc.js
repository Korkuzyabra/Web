function show(){
    let choose =0;
    if(document.getElementById('alg').checked) choose = document.getElementById('alg');
    else if(document.getElementById('exp').checked) choose = document.getElementById('exp');
    else choose = 0;

    let view1 = document.getElementById('algebraic');
    let view2 = document.getElementById('exponential');
    let viewAnsAlg = document.getElementById('ansAlg');
    let viewAnsExp = document.getElementById('ansExp');
    if(choose.id === 'alg'){
        view1.style.display = 'flex';
        view2.style.display = 'none';
        viewAnsAlg.style.display = 'flex';
        viewAnsExp.style.display = 'none';
        clearFields();
    } else {
        view2.style.display = 'flex';
        view1.style.display = 'none';
        viewAnsExp.style.display = 'flex';
        viewAnsAlg.style.display = 'none';
        clearFields();
    }
    let form = document.getElementById('calc');
    form.style.display = 'flex';
}

function clearFields() {
    document.getElementById("realPart").value = "";
    document.getElementById("realPart").style.borderColor = "black";
    document.getElementById("imaginaryPart").value = "";
    document.getElementById("imaginaryPart").style.borderColor = "black";
    document.getElementById("module").value = "";
    document.getElementById("module").style.borderColor = "black";
    document.getElementById("arg").value = "";
    document.getElementById("arg").style.borderColor = "black";
    document.getElementById('argAlg').value ="";
    document.getElementById('imgAlg').value ="";
    document.getElementById('modAlg').value ="";
    document.getElementById('argExp').value ="";
    document.getElementById('imgExp').value ="";
    document.getElementById('modExp').value ="";
    document.getElementById('expForm').value ="";
    document.getElementById('algForm').value ="";
    document.getElementById("argumentOp").checked = false;
    document.getElementById("imaginaryOp").checked = false;
    document.getElementById("modulusOp").checked = false;
    document.getElementById("argumentOpLabel").style.color = "black";
    document.getElementById("imaginaryOpLabel").style.color = "black";
    document.getElementById("modulusOpLabel").style.color = "black";
}

function validation(isAlgebraic, isExponential, argument, imaginary, modulus){
    const inputRealPart = document.getElementById("realPart");
    const inputImagePart = document.getElementById("imaginaryPart");
    const inputModule = document.getElementById("module");
    const inputArg = document.getElementById("arg");
    const argumentLabel = document.getElementById("argumentOpLabel");
    const imaginaryLabel = document.getElementById("imaginaryOpLabel");
    const modulusLabel = document.getElementById("modulusOpLabel");
    let flag = false;

    if(!argument && !imaginary && !modulus) {
        argumentLabel.style.color = "red";
        imaginaryLabel.style.color = "red";
        modulusLabel.style.color = "red";
        flag = true;
    }

    if(isAlgebraic){
        if ((isNaN(parseFloat(inputRealPart.value)) || !isFinite(inputRealPart.value)) || (isNaN(parseFloat(inputImagePart.value)) || !isFinite(inputImagePart.value))) {
            if (isNaN(parseFloat(inputRealPart.value)) || !isFinite(inputRealPart.value)){
                inputRealPart.style.borderColor = "red";
            }
            if (isNaN(parseFloat(inputImagePart.value)) || !isFinite(inputImagePart.value)){
                inputImagePart.style.borderColor = "red";
            }
            return false;
        }
        else if(!flag){
            argumentLabel.style.color = "black";
            imaginaryLabel.style.color = "black";
            modulusLabel.style.color = "black";
            inputRealPart.style.borderColor = "black";
            inputImagePart.style.borderColor = "black";
            return true;
        }
        else return false;

    } else if(isExponential){
        if ((isNaN(parseFloat(inputModule.value)) || !isFinite(inputModule.value)) || (isNaN(parseFloat(inputArg.value)) || !isFinite(inputArg.value)))
            if (isNaN(parseFloat(inputModule.value)) || !isFinite(inputModule.value)){
                inputModule.style.borderColor = "red";
            }
        if (isNaN(parseFloat(inputArg.value)) || !isFinite(inputArg.value)){
            inputArg.style.borderColor = "red";
        }
        return false;
    }
    else if(!flag) {
        argumentLabel.style.color = "black";
        imaginaryLabel.style.color = "black";
        modulusLabel.style.color = "black";
        inputArg.style.borderColor = "black";
        inputModule.style.borderColor = "black";
        return true;
    }
    else return false;
}

function calculate() {
    const isAlgebraic = document.getElementById("alg").checked;
    const isExponential = document.getElementById("exp").checked;
    const argument = document.getElementById("argumentOp").checked;
    const imaginary = document.getElementById("imaginaryOp").checked;
    const modulus = document.getElementById("modulusOp").checked;

    let flag = validation(isAlgebraic, isExponential, argument, imaginary, modulus)
    if (flag)
    {
        if (isAlgebraic) {
            const realPart = document.getElementById("realPart").value;
            const imaginaryPart = document.getElementById("imaginaryPart").value;
            const num = new ComplexNumber(realPart, imaginaryPart)
            if (argument){
                const ans = document.getElementById("argAlg");
                ans.value = `Аргумент: ${num.getArgument(realPart, imaginaryPart)}`;
            }
            if (imaginary){
                const ans = document.getElementById("imgAlg");
                ans.value = `Мнимая часть: ${num.getImaginaryPart(realPart, imaginaryPart)}`;
            }
            if(modulus){
                const ans = document.getElementById("modAlg");
                ans.value = `Модуль: ${num.getMagnitude(realPart, imaginaryPart)}`;
            }
            const ans = document.getElementById("expForm");
            ans.value = `Экспонентальная форма: ${num.toExponentialForm(realPart, imaginaryPart)}`;
        } else if (isExponential) {
            const realPart = document.getElementById("module").value;
            const imaginaryPart = document.getElementById("arg").value;
            const num = new ComplexNumber(realPart, imaginaryPart)
            if (argument){
                const ans = document.getElementById("argExp");
                ans.value = `Аргумент: ${num.getArgumentExp(realPart, imaginaryPart)}`;
            }
            if (imaginary){
                const ans = document.getElementById("imgExp");
                ans.value = `Мнимая часть: ${num.getImaginaryExp(realPart, imaginaryPart)}`;
            }
            if(modulus){
                const ans = document.getElementById("modExp");
                ans.value = `Модуль: ${num.getMagnitudeExp(realPart, imaginaryPart)}`;
            }
            const ans = document.getElementById("algForm");
            ans.value = `Алгебраическая форма: ${num.toAlgebraicForm(realPart, imaginaryPart)}`;
        }
    }
}


class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    getArgument() {
        return Math.atan2(this.imaginary, this.real);
    }

    getImaginaryPart() {
        return this.imaginary;
    }

    getMagnitude() {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }

    toExponentialForm() {
        const magnitude = this.getMagnitude();
        const argument = this.getArgument();
        return `${magnitude} * e^(${argument})`;
    }

    toAlgebraicForm() {
        const rel = this.real * Math.cos(this.imaginary);
        const img = this.real * Math.sin(this.imaginary);
        return `${rel} + ${img}*i`
    }

    getArgumentExp(){
        return this.imaginary
    }

    getMagnitudeExp(){
        return this.real;
    }
    getImaginaryExp(){
        return this.real * Math.sin(this.imaginary);
    }
}

