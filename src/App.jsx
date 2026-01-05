import { useState } from 'react'
import './App.css'
import Die from './Die'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
   
  const [diceGroup, setDiceGroup] = useState(() => generateAllNewDice());

  
  const gameWon = 
       diceGroup.every(die => die.isHeld) &&
       diceGroup.every(die => die.value === diceGroup[0].value)
 

  function hold(id){
    setDiceGroup( oldDice => {
          return oldDice.map(die => {
               return die.id === id ?
                   {...die, isHeld: !die.isHeld } :
                   die
          })
    })

  }
  function generateAllNewDice() {
    return new Array(10)
                .fill(0)
                .map(() => ({
                  value: (Math.ceil(Math.random() * 6)),
                  isHeld: false,
                  id: nanoid()
                }))
  }
  
  function rollDice() {

    if(!gameWon){
        setDiceGroup(oldDice => {

          return oldDice.map((die) => {
                return (die.isHeld ?
                      die:
                      {...die, value: (Math.ceil(Math.random()*6))}
                )
          })
        
        })
    } else{
          setDiceGroup(generateAllNewDice());
    }
  }

  console.log(generateAllNewDice());

  const diceElements = diceGroup.map((item) => (
           <Die 
              key={item.id} 
              value={item.value} 
              held={item.isHeld} 
              hold={() => hold(item.id)} 
          />
  ));

  return (
    <main>
      {gameWon && <Confetti /> }
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it 
      at its current value between rolls.</p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>{gameWon ? 'New Game' : 'Roll'}</button>
    </main>
  );
}

export default App
