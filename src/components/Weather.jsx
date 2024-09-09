import React, { useState,useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBSearch,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Basic() {
    const [search,setSearch] = useState("")
    const [show ,setShow] = useState(false)
    const [weather,setWeather] = useState({})
    const fetchData = async()=>{
        const API = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=37b58b6cb265b0b19d672cbf7f80d2d7"
        const API_KEY = "37b58b6cb265b0b19d672cbf7f80d2d7"

        const fetchedDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`)
        console.log(fetchedDataResponse)
        const fetchedData = await fetchedDataResponse.json()
        console.log("fetched data",fetchedData)
        console.log("fetched data temp,humidity",fetchedData.main.temp,fetchedData.main.humidity)
        setWeather({
            name: fetchedData.name,
            weather: fetchedData.weather[0].main,
            temperature:(fetchedData.main.temp - 273.5).toFixed(2),
            humidity:fetchedData.main.humidity,
            wind: fetchedData.wind.speed
        })
        
    }
    useEffect(() => {
        console.log("Weather data:", weather);
    }, [weather]);
    
  return (
  
    <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
  
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="4">
          <div>
          <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="ml-4 h-200 mb-3 w-90 rounded-4"  />
          <input type="button" onClick={fetchData} value={"Search"} />
          </div>
            <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex">
                  <MDBTypography tag="h6" className="flex-grow-1">
                    {weather.name}
                  </MDBTypography>
                  <MDBTypography tag="h6">15:07</MDBTypography>
                </div>
 
                <div className="d-flex flex-column text-center mt-5 mb-4">
                  <MDBTypography
                    tag="h6"
                    className="display-4 mb-0 font-weight-bold"
                    style={{ color: "#1C2331" }}
                  >
                    {" "}
                    {weather?.temperature || 0}°C{" "}
                  </MDBTypography>
                  <span className="small" style={{ color: "#868B94" }}>
                    {weather.weather}
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{fontSize: '1rem'}}>
                    <div>
                      <MDBIcon
                        fas
                        icon="wind fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {weather.wind} km / hr </span>
                    </div>
                    <div>
                      <MDBIcon
                        fas
                        icon="tint fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> 84% </span>
                    </div>
                    <div>
                      <MDBIcon
                        fas
                        icon="sun fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> 0.2h </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                      width="100px"
                    />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}