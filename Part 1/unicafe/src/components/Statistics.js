import React from 'react'
import Statistic from './StatisticLine'

const Statistics = ({good, neutral, bad, all, average, persentageOfPositiveFeedbacks}) => {
  return (
    
      <div>
        <h2>Statistics</h2>
        {
        all ? (
          <table>
            <tbody>
              <Statistic text={'Good  '} val={good} />
              <Statistic text={'Neutral  '} val={neutral} />
              <Statistic text={'Bad  '} val={bad} />
              <Statistic text={'All  '} val={all} />
              <Statistic text={'Average  '} val={average} />
              <Statistic text={'Positive  '} val={persentageOfPositiveFeedbacks} persent={true}/>
            </tbody>
          </table>
          ) : 
          (
            <div>No feedback given</div>
          )
        }
      </div>
  )
}

export default Statistics;