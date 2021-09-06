import React, { memo } from 'react'
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography
} from "react-simple-maps";


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";






const Map = ({ setTooltipContent, statistic }) => {
    

    const getInfected = name => {

        if (name === "Russia") {
            name = "Russian Federation"
        }

        if (name === "South Korea") {
            name = "Korea (South)"
        }

        if (name === "Czechia") {
            name = "Czech Republic"
        }

        

        for (let i = 0 ; i < statistic?.length ; i++) {
            if (name === statistic?.[i]?.["Country"] || name.toLowerCase() === statistic?.[i]?.["Slug"]) {
                return statistic?.[i]?.["TotalConfirmed"]?.toLocaleString('ru');
            }
        }

        return "нет данных"
    }


    return (
        <ComposableMap data-tip="" projectionConfig={{ scale: 180 }}
            className="map" width={900} height={470}>
            <ZoomableGroup zoom={1} translateExtent={[
                [0, 0],
                [900, 470]
                ]}
            >
            <Geographies geography={geoUrl} >
                {({ geographies }) =>
                    geographies.map(geo => (
                        <Geography 
                            key={geo.rsmKey}
                            geography={geo} 
                            onMouseEnter={() => {
                                const { NAME } = geo.properties;
                                const infected = getInfected(NAME);
                                setTooltipContent(`${NAME} - ${infected}`);
                            }}
                            onMouseLeave={() => {
                                setTooltipContent("");
                            }}
                            style={{
                                default: {
                                    fill: "#ffe2e0",
                                    stroke: "#ff6b61",
                                    strokeWidth: 0.5,
                                    outline: "none",
                                    color: "#202020",
                                },
                                pressed: {
                                    fill: 'none',
                                    stroke: "#000",
                                    strokeWidth: 0.75,
                                    outline: "none"
                                },
                                hover: {
                                    fill: "#850900",
                                    stroke: "#7f8fa6",
                                    strokeWidth: 0.75,
                                    outline: "none"
                                }
                            }}
                        />
                    ))
                }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}

export default memo(Map)
