import React, { useState, useEffect } from 'react'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';





function Chart({ periodStat }) {

    const [data, setData] = useState([]);

    // recieve statistic from parent node
    useEffect(() => {
        const stat = periodStat?.map( s => {
            return {
                name: s?.["Country"],
                confirmed: s?.["Confirmed"],
                deaths: s?.["Deaths"],
                recovered: s?.["Recovered"],
                date: formatDate(s?.["Date"]),
            }

            //"2020-01-22T00:00:00Z"
        });

        if(!!stat) {
            setData(stat);
        }
    }, [periodStat]);


    const formatDate = (date) => {
      let d = new Date(date)
      return [d.getDate(), (d.getMonth() + 1 < 10 ? '0' + (d.getMonth()+1) : d.getMonth() + 1), d.getFullYear()].join('.')
    }


    return (
          <ResponsiveContainer width="90%" height={350} >
            <AreaChart data={data}
            margin={{ top: 20, right: 0, left: 15, bottom: 30 }}
            >
              <defs>
                  <linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#850900" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#850900" stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <XAxis dataKey="date" angle="-30" interval="preserveStart" tickMargin="20" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Text scaleToFit={true} />
              <Legend verticalAlign="bottom" 
                wrapperStyle={{
                  top: -10,
                  left: 0,
                }} 
              />
              <Area type="monotone" name="Зараженные" dataKey="confirmed" stroke="#1967d2" strokeWidth={2} fillOpacity={.5} fill="#aecbfa" />
              <Area type="monotone" name="Выздоровевшие" dataKey="recovered" stroke="#44bd32" strokeWidth={2} fillOpacity={.5} fill="#44bd32" />
              <Area type="monotone" name="Погибшие" dataKey="deaths" stroke="#850900" strokeWidth={2} fillOpacity={.5} fill="red" />
            </AreaChart>
          </ResponsiveContainer>
        
    );
}

export default Chart
