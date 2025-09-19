import { useEffect, useState } from "react"
import Sunny from '../Assets/Videos/Sunny.gif'
import Colud from '../Assets/Videos/Cloudy.gif'
import Rainy from '../Assets/Videos/Rainy.gif'
function CardDisplay({ search }) {
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

        }, [search]
    )

    let temp_c = data?.current?.temp_c;
    // let temp_c =10;
    let is_day = data?.current?.is_day;
    let updated_time = data?.current?.last_updated;

    const [tempPic, setTempPic] = useState();
    useEffect(
        () => {
            if (temp_c >= 20) {
                setTempPic(Sunny);
            }
            else if (temp_c >= 15 && temp_c <= 20) {
                setTempPic(Colud)
            }
            else if (temp_c <= 10) {
                setTempPic(Rainy)
            }
        }, [temp_c]
    )

    return (
        <div className="card-main-cnt">
            <div className="card-cnt">
                <p style={{ fontSize: "1.5rem", fontWeight: "450" }}>{search}</p>
                <img style={{ width: "100px", height: "100px" }} src={tempPic} alt="Error"></img>
                <p>Temperature: {temp_c}°C.</p>
            </div>
            <div className="card-cnt-mini">
                <div style={{ width: '280px', height: 'auto', backgroundColor: 'white', borderRadius: '20px', padding: '20px 5px' }}>
                    <p style={{ fontSize: "1rem", fontWeight: "450" }}>Last Update</p>
                    <p>{updated_time}</p>
                </div>

            </div>
        </div>
    )

}

export default CardDisplay