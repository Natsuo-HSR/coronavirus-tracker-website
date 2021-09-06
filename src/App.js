import './App.css';
import Header from './components/Header';
import ShortStatistic from './components/ShortStatistic';
import CovidMap from './components/map/CovidMap';
import CovidTable from './components/table/CovidTable';
import {useState, useEffect} from 'react';
import CovidChart from './components/chart/CovidChart';
import Footer from './components/Footer';

function App() {

  const [coronaData, setCoronaData] = useState([]);
    
  useEffect(() => {
      (async () => {
          const fetchedPosts = await getCoronaData();
          setCoronaData(fetchedPosts);
      })();
  }, []);

  async function getCoronaData() {
      const URL = "https://api.covid19api.com/summary";
      const requestOptions = {
          method: 'GET',
          redirect: 'follow'
      };
      
      const response = await fetch(URL, requestOptions);
      const data = await response.json();
      return data;
  }




  return (
    <div className="app">

    
      <Header />
          
      <ShortStatistic
        statistic={coronaData}
      />

      

      <CovidMap 
        statistic={coronaData?.["Countries"]}
      />

      <div id="chart_anchor"></div>

      <CovidChart 
        statistic={coronaData} 
      />

      <div id="table_anchor"></div>

      <CovidTable
        statistic={coronaData} 
      />

      <Footer />

    </div>
  );
}

export default App;
