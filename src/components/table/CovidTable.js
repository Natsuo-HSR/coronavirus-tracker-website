import React, { useState, useEffect, useMemo } from 'react'
import Table from './Table'

function CovidTable({ statistic }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        
        console.log('Statistic useEffect hook was called')

        statistic?.["Countries"]?.sort((a, b) => {
            return +b?.["TotalConfirmed"] - +a?.["TotalConfirmed"];
        })


        const stats = statistic?.["Countries"]?.map( s => ({
            counrty: s?.["Country"],
            totalConfirmed: s?.["TotalConfirmed"],
            newConfirmed: s?.["NewConfirmed"] > 0 ? '+' + s?.["NewConfirmed"] : '',
            totalDeaths: s?.["TotalDeaths"],
            newDeaths: s?.["NewDeaths"] > 0 ? '+' + s?.["NewDeaths"] : '',
            totalRecovered: s?.["TotalRecovered"],
            newRecovered: s?.["NewRecovered"] > 0 ? '+' + s?.["NewRecovered"] : '',
        }))

        
        
        if(!!stats) {
            setData(stats);
        }
    }, [ statistic.length ]);


    const columns = useMemo( () => [
        { Header: 'Страна', accessor: 'counrty' },
        { Header: 'Зараженных', accessor: 'totalConfirmed' },
        { Header: 'Новых зараженных', accessor: 'newConfirmed' },
        { Header: 'Смертей', accessor: 'totalDeaths' },
        { Header: 'Новых смертей', accessor: 'newDeaths' },
        { Header: 'Выздоровели', accessor: 'totalRecovered' },
        { Header: 'Новых выздоровевших', accessor: 'newRecovered' },
    ], [])


    return (
        <div className="covid_table">
            <div className="main_container table_container">
                <div className="table_title title">Статистика по странам</div>
                
                <Table columns={columns} data={data} />
                
            </div>
        </div>
    )
}


export default CovidTable
