class Calculator{
    constructor(currentOperandTextElement, previousOperandTextElement){
    this.currentOperandTextElement = currentOperandTextElement
    this.previousOperandTextElement = previousOperandTextElement
    this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = ''
    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0,-1)
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
    updateOutput(){
        this.currentOperandTextElement.textContent = this.getDisplayNumber(this.currentOperand)

        this.previousOperandTextElement.textContent = this.getDisplayNumber(this.previousOperand) + ' ' + this.operation
    }

    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand += number;
    }

    chooseOperation(operation){
        if(this.currentOperand == '') return
        if(this.previousOperand != ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    
    compute(){
        if(this.currentOperand == '' || this.previousOperand == '') return
        if(this.operation == '+'){
            this.currentOperand = parseFloat(this.previousOperand) + parseFloat(this.currentOperand)
        }else if(this.operation == '-'){
            this.currentOperand = parseFloat(this.previousOperand) - parseFloat(this.currentOperand)
        }else if(this.operation == '*'){
            this.currentOperand = parseFloat(this.previousOperand) * parseFloat(this.currentOperand)
        }else{
            this.currentOperand = parseFloat(this.previousOperand) / parseFloat(this.currentOperand)
        }
        this.previousOperand = ''
        this.operation = ''
    }
}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const currentOperandTextElement = document.querySelector('.current-operand')
const previousOperandTextElement = document.querySelector('.previous-operand')

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.textContent)
        calculator.updateOutput()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.textContent)
        calculator.updateOutput()
    })
})

equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateOutput()
})

allClearButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateOutput()
})

deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateOutput()
})