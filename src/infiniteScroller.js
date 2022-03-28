import axios from "axios";
import React, { useEffect, useState } from "react";

/* MUI imports */
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import './App.css';

export default function InfiniteScroller() {
  const [F1Driver, setF1Driver] = useState([]);
  const [nationFilter, setNationFilter] = useState("all");

  let currentOffset = 0;

  /* Funktionen tar F1 förar information från ergast.com och tar 10 förare åt gången */
  const loadF1Driver = () => {
    const newF1Driver = [];

    axios
      .get(`http://ergast.com/api/f1/drivers.json?limit=10&offset=${currentOffset}`)
      .then(({ data }) => {
          data.MRData.DriverTable.Drivers.forEach((p) => newF1Driver.push(p));
          setF1Driver((F1Driver) => [...F1Driver, ...newF1Driver]);
      });

    currentOffset += 10;
  };

  /* Funktionen kallar loadF1Driver när användaren är längst ner på hemsidan */
  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );

    if (currentHeight + 1 >= scrollHeight) {
      loadF1Driver();
    }
  };

  useEffect(() => {
    loadF1Driver();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Title design tagen ifrån https://codepen.io/getflourish/pen/zYqRzmv */}
      <svg xmlns="http://www.w3.org/2000/svg">
           <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
             <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
           </filter>
          </svg>
          <div>
            <span filter-content="S">Formula 1 drivers</span>
          </div>
      <div>
        <Button variant="contained" color={nationFilter === "all" ? "primary" : "secondary"} onClick={()=> setNationFilter("all")} >All</Button>
        {[...new Set(F1Driver.map(driver => driver.nationality))].map((nation, i) => {

          return(
            <Button variant="contained" color={nationFilter === nation ? "primary" : "secondary"} id={nation} onClick={(e)=> setNationFilter(e.target.id)} sx={{margin: "5px"}} >{nation}</Button>
          )
        })}

        <div className="flex-container">
        {F1Driver.map((p, i) => { 

          return (
            <div
              key={i}
              id={p.nationality}
              style={{display: p.nationality === nationFilter || nationFilter === "all" ? "flex" : "none"}}
            >
              <Card sx={{ width: 445, margin: "10px", padding: "10px",  }} className="flex-item">
              <CardContent>
                <Typography variant="h5" >
                  {p.givenName} {p.familyName}
                </Typography>
              </CardContent>
              <Typography variant="h6" >{p.nationality}</Typography>
              <br />
              <Typography variant="h6" >{p.dateOfBirth}</Typography>
            </Card>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}