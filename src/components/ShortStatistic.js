import React from 'react'

function ShortStatistic({ statistic }) {

    const curDate = new Date();
    const month = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');

    
    return (
        <div className="stat">
            <div className="main_container">
                <div className="stat_title">
                    Статистика в мире на сегодня, {curDate.getDate() + ' ' + month[curDate.getMonth()] + ' ' + curDate.getFullYear() + ' года:'}
                </div>
                <div className="stat_container">
                    <div className="stat_infected">
                        Зараженные:
                        <span className="infected_numbers">
                            {(statistic?.["Global"]?.["TotalConfirmed"])?.toLocaleString('ru')}
                            <span className="new_infected">
                                +{(statistic?.["Global"]?.["NewConfirmed"])?.toLocaleString('ru')}
                            </span>
                        </span>
                    </div>
                    <div className="stat_dead">
                        Смертей:
                        <span className="dead_numbers">
                            {(statistic?.["Global"]?.["TotalDeaths"])?.toLocaleString('ru')}
                            <span className="new_dead">
                                +{(statistic?.["Global"]?.["NewDeaths"])?.toLocaleString('ru')}
                            </span>
                        </span>
                    </div>
                    <div className="stat_cured">
                        Воздоровели:
                        <span className="cured_numbers">
                            {(statistic?.["Global"]?.["TotalRecovered"])?.toLocaleString('ru')}
                            <span className="new_cured">
                                +{(statistic?.["Global"]?.["NewRecovered"])?.toLocaleString('ru')}
                            </span>
                        </span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ShortStatistic
