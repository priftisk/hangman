export function checkForGuess(letterGuesed, wordState) {
    let newWordState = wordState.map((item) => {
        if(item.letter === letterGuesed){
            item.found = true
        }
    })
        

}