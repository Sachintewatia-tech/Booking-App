import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({setOpen,hotelId}) => {
    const [selectedRoom,setSelectedRoom] = useState([]);
    const {dates} = useContext(SearchContext);
    const navigate = useNavigate();
    const {data,loading,error} = useFetch(`http://localhost:4500/hotel/room/${hotelId}`);
    const handleChange = (e)=>{
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRoom(checked ? [...selectedRoom,value]: selectedRoom.filter((item)=>item!==value));
    }

    const getDatesInRange = (startDate,endDate)=>{
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];
        while(date<=end){
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }
        return dates;
    }

    const allDates = getDatesInRange(dates[0].startDate,dates[0].startDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailabelRoom.some((date) => {
            return allDates.includes(new Date(date).getTime());
        });
        console.log('found',isFound,roomNumber);
        
        return !isFound;
    }
    

    const handleClick = async ()=>{
        try {
            await Promise.all(
                selectedRoom.map((roomId)=>{
                    const res = axios.put(`http://localhost:4500/room/availability/${roomId}`,{
                        dates: allDates
                    });
                    // setOpen(false);
                    // navigate("/");
                    return res.data;
                })
            )
        } catch (error) {
            console.log(error);
            
        }
    }    
  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)} />
            <span>Reserve your room:</span>
            {
                data&&data.map((item,i)=>(
                    <div key={i} >
                        <div className="rInfo">
                            <div>{item.title}</div>
                            <div>{item.desc}</div>
                            <div> Max. People: <b>{item.maxPeople}</b></div>
                            <div>Price: {item.price}</div>
                                {
                                    item.roomNumber.map((room)=>(
                                        <div>
                                            <label>{room.number}</label>
                                            <input type="checkbox" disabled={!isAvailable(room)} value={room._id} onChange={handleChange}  />
                                        </div>

                                    ))
                                }
                        </div>
                    </div>
                ))
            }
            <button className="rbtn" onClick={handleClick}>Reserve Your Room...</button>
        </div>
      
    </div>
  )
}

export default Reserve
