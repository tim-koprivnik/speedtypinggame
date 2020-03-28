import {useState, useEffect, useRef} from "react"

function useWordGame() {
    const STARTING_TIME = 5

    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textareaRef = useRef(null)

    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }

    // console.log(text)

    function calculateWordCount(str) {
        const wordsArr = str.trim().split(" ") // trims the whitespaces and split on every whitespace
        return wordsArr.filter(word => word !== "").length // filters whitespaces at the beginning
    }

    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(STARTING_TIME)
        setText("")
    }

    function endGame() {
        setIsTimeRunning(false)

        const numberOfWords = calculateWordCount(text)
        setWordCount(numberOfWords)
    }

    useEffect(() => {
        if (isTimeRunning === true && timeRemaining > 0) { // stops if the isTimeRunning is false && time is < than 0
            setTimeout(() => {
                setTimeRemaining(prevTime => prevTime - 1)
            }, 1000) // first waits 1000ms and then runs this function
        } else if (timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning]) // why second parameter? because we only want to run this effect when timeRemaining and isTimeRunning changes

    useEffect(() => {
        textareaRef.current.focus()
    }, [isTimeRunning])


    return {handleChange, text, isTimeRunning, textareaRef, timeRemaining, startGame, wordCount}
}


export default useWordGame