import { Card, CardContent } from '@material-ui/core';
import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Casedetails from './Components/Casedetails';
import Header from './Components/Header';
import Map from './Components/Map';
import Table from './Components/Table';
import {printCases} from './Components/util.js'
//import { Sortdata } from './Components/util';
import "leaflet/dist/leaflet.css";
import LineGraph from './Components/LineGraph';

function App() {
  const [countryList,setCountryList]=useState([]);
  const [defaultCountry, setdefaultCountry] = useState("Worldwide");
  const [countryInfo, setcountryInfo] = useState([])
  const [tableData,setTableData]=useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState('cases');
  const [mapCountries, setMapCountries] = useState([])

  useEffect(()=>{
    axios.get("https://disease.sh/v3/covid-19/all")
    .then((response)=>{
      setcountryInfo(response.data)
    })
    .catch((error)=>console.log(error))
  },[])

  useEffect(() => {
      axios.get("https://disease.sh/v3/covid-19/countries")
      .then((response)=>{
          setCountryList(response.data)
          setMapCountries(response.data)
          // const sortedData=Sortdata(response.data);
          // setTableData(sortedData)
          setTableData(response.data)
          console.log(response.data)
      })
      .catch((error)=>console.log(error))
  }, [])
  const handleChangecountry=(e)=>{
      const countryCode=e.target.value;
      setdefaultCountry(countryCode)
      console.log("-----------",countryCode)
      const url = countryCode==="worldwide" ? "https://disease.sh/v3/covid-19/all" :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`
      axios.get(url)
      .then((response)=>
      {
        // defaultCountry(countryCode)
        setcountryInfo(response.data)
        setMapCenter([response.data.countryInfo.lat,response.data.countryInfo.long])
        setMapZoom(4);
        console.log(response.data)
      })
      .catch((error)=>console.log(error));
  }
  return (
    
    <div className="app">
      <div className='app__firstcontainer'>
        <Header handleChangecountry={handleChangecountry}
        countryList={countryList}
        defaultCountry={defaultCountry}
          />
        <div className='app__casedetails'>
          <Casedetails 
          title="Coronavirus Cases"
          onClick={(e)=>setCasesType('cases')} 
          cases={printCases(countryInfo.todayCases)}
          total={printCases(countryInfo.cases)} />
          <Casedetails
          onClick={(e)=>setCasesType("recovered")} 
           title="Recovered Cases" cases={printCases(countryInfo.todayRecovered)} total={printCases(countryInfo.recovered)} />
          <Casedetails
          onClick={(e)=>setCasesType('deaths')} 
          title="Death Cases" cases={printCases(countryInfo.todayDeaths)} total={printCases(countryInfo.deaths)} />
        </div>
        <Map center={mapCenter} zoom={mapZoom} mapCountries={mapCountries} casesType={casesType} />
      </div>
      <Card className='app__secondcontainer'>
        <CardContent>
          <h2>Live Cases by country</h2>
          <Table countriesName={tableData}/>
          <h2>WW new {casesType}</h2>
          <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
