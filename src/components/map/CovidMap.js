import React from 'react'
import ReactTooltip from 'react-tooltip'
import { useState } from 'react'
import Map from './Map'


function CovidMap({ statistic }) {
  const [content, setContent] = useState("");


    return (
        <div className="covid_map">
          <div className="main_container map_container">
            <div className="map_title title">Статистика на карте</div>
            <Map setTooltipContent={setContent} statistic={statistic} />
            <ReactTooltip>{content}</ReactTooltip>
          </div>
        </div>
    )
}

export default CovidMap
