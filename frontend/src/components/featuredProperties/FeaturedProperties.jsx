import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const {data,loading,error} = useFetch("https://booking-app-backend-tdb8.onrender.com/hotel?limit=4")
  return (
    <div className="fp">
      { 
        data.map((ele)=>{
          return(

        <div key={ele._id} className="fpItem">
        <img
          src={ele.photos[0]}
          alt=""
          className="fpImg"
          />
        <span className="fpName">{ele.name}</span>
        <span className="fpCity">{ele.city}</span>
        <span className="fpPrice">Starting from ${ele.cheapestPrice}</span>
        { ele.rating && <div className="fpRating">
          <button>{ele.rating}</button>
          <span>Excellent</span>
        </div>}
      </div>
          )
        })
      }
      
    </div>
  );
};

export default FeaturedProperties;
