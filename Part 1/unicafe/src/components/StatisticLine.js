import React from 'react'

const StatisticLine = ({text, val, persent}) => <tr><td>{text}</td><td>{val} {persent ? '%' : ''}</td></tr>

export default StatisticLine;