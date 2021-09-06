import React, { useState, useEffect } from 'react'
import Chart from './Chart'

function CovidCharts({ statistic }) {
    const [country, setCountry ] = useState('Russia')
    const [period, setPeriod] = useState('365 дней');
    const [data, setData] = useState([]);
    const [countriesList, setcountriesList] = useState([])

    // recieve statistic from parent node
    useEffect(() => {
        const countries = statistic?.["Countries"]?.map( s => {
            if (s?.["Country"] === 'Russian Federation') {
                return 'Russia';
            }
            return s?.["Country"];
        });
        countries?.sort();
        if(!!countries) {
            setcountriesList(countries);
        }
    }, [statistic]);

    // onchange chart inputs
    useEffect(() => {

        async function getDataPerPeriod() {
            const dates = getDatesISO();
            const URL = 
            `https://api.covid19api.com/country/${country.toLowerCase()}?from=${dates.from}&to=${dates.to}`
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            let data = [];
            await fetch(URL, requestOptions)
                .then(function(response) {
                    if (response.ok) {
                        data = response.json();
                    }
                })
    
            return data;
        }

        // get spicific dates from period string
        function getDatesISO() {
            let to = new Date();
            to.setHours(0,0,0,0);
            let from;
            switch(period) {
                case '7 дней':
                    from = new Date(to.getFullYear(), to.getMonth(), to.getDate() - 8);
                    break;
                case '30 дней':
                    from = new Date(to.getFullYear(), to.getMonth(), to.getDate() - 31);
                    break;
                case '90 дней':
                    from = new Date(to.getFullYear(), to.getMonth(), to.getDate() - 91);
                    break;
                case '180 дней':
                    from = new Date(to.getFullYear(), to.getMonth(), to.getDate() - 181);
                    break;
                case '365 дней':
                    from = new Date(to.getFullYear(), to.getMonth(), to.getDate() - 366);
                    break;
                default:
            }
            from.setHours(0,0,0,0);
    
            return {
                from: from.toISOString(),
                to: to.toISOString()
            };
        }

        // fetch
        (async () => {
            const fetchedPosts = await getDataPerPeriod();
            setData(fetchedPosts);
        })();
    }, [country, period]);
    
    
    const countryChange = e => {
        setCountry(e.target.value);
    }

    const periodChange = e => {
        setPeriod(e.target.value);
    }


    return (
        <div className="charts" id="charts">
            <div className="main_container">

                <div className="title">Статистика на графиках</div>

                <div className="chart_params">
                    <label className="params_text">
                        Страна:
                        <select value={country} onChange={countryChange}>
                            {
                                countriesList.map( (c, i) => {
                                    return <option key={i} value={c}>{c}</option>;
                                })
                            }
                        </select>
                    </label>

                    <label className="params_text">
                        Период:
                        <select value={period} onChange={periodChange}>
                            <option value='7 дней'>7 дней</option>
                            <option value='30 дней'>30 дней</option>
                            <option value='90 дней'>90 дней</option>
                            <option value='180 дней'>180 дней</option>
                            <option value='365 дней'>365 дней</option>
                        </select>
                    </label>
                
                </div>

                <Chart periodStat={data} />
                
            </div>
            
        </div>
    )
}

export default CovidCharts
