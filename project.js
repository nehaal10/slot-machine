//collect deposit from user

const prompt = require("prompt-sync")()

const ROWS = 3
const COLS = 3

const SYMBOL_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUE = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = () => {
    while(true){
        const depositMoney = prompt("Enter the amount you want to deposit: ")
        const numberDepositAmount = parseFloat(depositMoney)
        if (isNaN(numberDepositAmount) || numberDepositAmount<=0) {
            console.log('try again')
        } else {
          return numberDepositAmount
        }
    }
}

const getNumberOfLines = () => {
    while(true) {
        const numberLines = prompt("enter the number of lines to bet on (1-3) ")
        const intNumberLines = parseInt(numberLines)
        if (isNaN(intNumberLines) || intNumberLines <=0  || intNumberLines > 3){
            console.log("try again")
        } else {
            return intNumberLines
        }
    }
}

const getBet = (balance,lines) => {
    while(true) {
        const betAmount = prompt("Enter bet per line: ")
        const numberBet = parseFloat(betAmount)
        if(isNaN(numberBet) || numberBet > balance/lines || numberBet <= 0) {
            console.log("try again")
        } else {
            return numberBet
        }
    }
}

const spin = () => {
    const symbols = []
    for (const [sym,count]  of Object.entries(SYMBOL_COUNT)) {
        for(let i = 0;i<count;i++) {
            symbols.push(sym)
        }
    }
    const reels = []
    for(let i = 0;i<COLS;i++) {
        reels.push([])
        const reelSymbols = [...symbols]
        for(let j = 0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectSymbol = reelSymbols[randomIndex]
            reels[i].push(selectSymbol)
            reelSymbols.splice(randomIndex,1)
        }
    }
    return reels
}

const transpose = (reels) => {
    const rows = []
    for(let i = 0;i<ROWS;i++){
        rows.push([])
        for(let j = 0;j<COLS;j++){
            rows[i].push(reels[i][j])
        }
    }
    return rows
}

const printRows = (rows) => {
    for(r of rows) {
        let rowString = ""
        for(const[i,sym] of r.entries()) {
            rowString += sym
            if(i != rows.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnigs = (rows,bet,lines) => {
    let winning  = 0 
    for(let row  = 0;row < lines;row++){
        const symbols = rows[row]
        let allSymbol = true
        for(const symbol of symbols) {
            if(symbol != symbols[0]){
                allSymbol = false
                break
            }
        }
        if(allSymbol) {
            winning = bet * SYMBOL_VALUE[symbols[0]]
        }
    }
    return winning
}

const game = () => {
    let balance = deposit()

    while(true) {
        console.log("You have balance $"+balance.toString())
        let numerOfLine = getNumberOfLines()
        const bet = getBet(balance,numerOfLine)
        balance -= bet * numerOfLine
        reels = spin()
        r = transpose(reels)
        printRows(r)
        const winner = getWinnigs(r,bet,numerOfLine)
        balance += winner
        console.log("You Won $"+winner.toString())

        if(balance <= 0){
            console.log("OUT OF TIME")
            break
        }

        const playAgain = prompt("Y/N (y,n): ")

        if (playAgain == "n") {
            break
        }
    }
}

game()


