class Calculator {
    constructor (previoustextElement, currentTextElement){
        this.previoustextElement = previoustextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }

    clear(){
        this.previous = ''
        this.current = ''
        this.operation = undefined
    }
    chooseOperation(operation){
        if (this.current === '') return
        if (this.previous != ''){
            this.operate()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }
    appendNumber(number){
        if (number === '.' && this.current.includes('.')) return
        const stringNumber = number.toString()
        this.current = this.current + stringNumber;
    }
    updateDisplay(){
        this.currentTextElement.innerText = this.current
        this.previoustextElement.innerText = this.previous
    }
    operate(){
        let prev = parseFloat(this.previous)
        let current = parseFloat(this.current)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                this.current = prev + current
                break 
            case '-':
                this.current = prev - current
                break
            case '*':
                this.current = prev * current
                break
            case '/':
                this.current = prev / current
                break 
        }
        this.previous = ''
        this.operation = undefined
             
         
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clear = document.querySelector('[data-clear]');
const equals = document.querySelector('[data-equals');
const previous = document.querySelector('[data-previous]');
const current = document.querySelector('[data-current]');

const calculator = new Calculator(previous, current);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

clear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equals.addEventListener('click', () => {
    calculator.operate()
    calculator.updateDisplay()
})