import { useEffect, useState } from "react"
import Sunny from '../Assets/Videos/Sunny.gif'
import Colud from '../Assets/Videos/Cloudy.gif'
import Rainy from '../Assets/Videos/Rainy.gif'
import Humidity from '../Assets/Images/Humidity.png'
import Wind from '../Assets/Videos/Wind.gif'
function CardDisplay({ search, setSearch }) {
    const [data, setData] = useState(null);

    useEffect(
        () => {
            if (!search) return;

            const controller = new AbortController();

            const fetchdata = async () => {
                try {
                    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=bfe6df9cdf084f888d1202551250507&q=${search}&aqi=no`, { signal: controller.signal })
                    if (!response.ok) throw new Error("Failed to Fetch");

                    const result = await response.json();
                    setData(result);
                    console.log(result)
                }
                catch (error) {
                    if (error.name !== 'AbortError') {
                        console.log(error.message)
                    }
                }

            }
            fetchdata();
            return () => controller.abort();

        }, [search, setSearch]
    )

    let temp_c = data?.current?.temp_c;
    // let temp_c =10;
    // let is_day = data?.current?.is_day;
    // let updated_time = data?.current?.last_updated;
    let humidity = data?.current?.humidity;
    let Wind_Speed = data?.current?.wind_kph;
    // let windchill_c = data?.current?.windchill_c;
    let condition = data?.current?.condition?.text;
    let condition_icon = data?.current?.condition?.icon;
    const [tempPic, setTempPic] = useState();
    useEffect(
        () => {
            if (temp_c >= 20) {
                setTempPic(Sunny);
            }
            else if (temp_c >= 11 && temp_c <= 20) {
                setTempPic(Colud)
            }
            else {
                setTempPic(Rainy)
            }
        }, [temp_c]
    )


    // 



    return (
        <div className="card-main-cnt">
            <div className="card-cnt">
                <p style={{ fontSize: "1.5rem", fontWeight: "450" }}>{search}</p>
                <img style={{ width: "100px", height: "100px" }} src={tempPic} alt="Error"></img>
                <p>Temperature: {temp_c}°C.</p>
            </div>
            <div className="card-cnt">
                <p style={{ fontSize: "1.5rem", fontWeight: "450" }}>Humidity</p>
                <img style={{ width: "100px", height: "100px" }} src={Humidity} alt="Error"></img>
                <p>{humidity}%</p>
            </div>
            <div className="card-cnt">
                <p style={{ fontSize: "1.5rem", fontWeight: "450" }}>Wind</p>
                <img style={{ width: "100px", height: "100px" }} src={Wind} alt="Error"></img>
                <p>{Wind_Speed} Km/h</p>
            </div>
            <div className="card-cnt">
                <p style={{ fontSize: "1.5rem", fontWeight: "450" }}>Condition</p>
                <img style={{ width: "100px", height: "100px"}} src={condition_icon} alt="Error"></img>
                <p>{condition}</p>
            </div>
        </div>
    )

}

export default CardDisplay