import React from 'react'
import Button from './Button'

const Feedback = ({good, neutral, bad, setGood, setNeutral, setBad}) => {
  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text={'good'}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button handleClick={() => setBad(bad + 1)} className="btnBad" text={'bad'}/>
    </div>
  )
}

export default Feedback;