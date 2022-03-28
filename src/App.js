
import React, { useState } from 'react';

/* MUI imports */
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

/* MUI icons imports */
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';

/* MUI style imports */
import {ThemeProvider, createTheme} from "@mui/material/styles";
import { makeStyles } from '@mui/styles';

/* Images imports */
import f12022_ferrari from './images/f12022_ferrari.jpg';
import f12022_mclaren from './images/f12022_mclaren.jpg';
import f12022_am_ha_mc from './images/f12022_am_ha_mc.jpg';
import f12022_template_car from './images/f12022_template_car.jpg';
import f1_dirtyair from './images/f1_dirtyair.jpg';
import f12022_merc_18 from './images/f12022_merc_18.jpg';
import f12022_template_car_frontview from './images/f12022_template_car_frontview.jpg';
import f1_1970_f1_car from './images/f1_1970_f1_car.jpg';
import f12022_template_car_sideview from './images/f12022_template_car_sideview.jpg';
import nosy_Be_Taxi_Madagascar from './images/Nosy_Be_Taxi_Madagascar.mov';

import InfoModal from './InfoModal';
import InfiniteScroller from './infiniteScroller';

import CookieConsent from "react-cookie-consent";

import { useCookies } from 'react-cookie';


import './App.css';

/* Färg tema för sidan */
const theme = createTheme({
  palette: {
    primary: {
      main: "#03a9f4",
      light: "#67daff",
      dark: "#007ac1",
     
    },
    secondary: {
      main: "#404040",
      light: "#404040",
      dark: "#404040"
    },
    white: {
      main: "#ffffff"
    },
    darkGrey: {
      main: "#474747"
    }
  }
});

/* Klass för att få vit text */
const useStyles = makeStyles((theme) => ({
  whiteTextColor: {
    // color: "white",
    fontWeight: "bold",
  },
}));


function App() {
  const [currentImg, setCurrentImg] = useState(f12022_ferrari);
  const [cookies, setCookie, removeCookie] = useCookies(['clicks']);
  const [enbaleCookies, setEnableCookies] = useState(false);

  const classes = useStyles();

  const imgArr = [f12022_ferrari, f12022_mclaren, f12022_am_ha_mc, f12022_template_car];

  const handleLeft = () => {
    handleClicks(parseInt(cookies.clicks) + 1)

    /* Sätter aktiv bild som den sista i arrayen(imgArr) för anvädaren */
    if(imgArr.indexOf(currentImg) === 0) { 
      handleClicks(parseInt(cookies.clicks) + 1)
      
      return setCurrentImg(imgArr[imgArr.length-1]) 
    };

    setCurrentImg(imgArr[imgArr.indexOf(currentImg)-1])

  }

  const handleRight = () => {
    handleClicks(parseInt(cookies.clicks) + 1)

    /* Sätter aktiv bild som den första i arrayen(imgArr) för anvädaren */
    if(imgArr.indexOf(currentImg) === imgArr.length-1) { 
      handleClicks(parseInt(cookies.clicks) + 1)
      
      return setCurrentImg(imgArr[0]) 
    };
    
    setCurrentImg(imgArr[imgArr.indexOf(currentImg)+1])
  }

  function handleClicks(newClicks) {
    if(enbaleCookies) {
      setCookie('clicks', (isNaN(newClicks) ? 1 : newClicks), { path: '/' });
      console.log("Cookies", cookies.clicks)
    }
  }

  function removeCookies(){
    removeCookie("clicks", { path: "/" })
  }

  return (
    <div className="App"> 
      <ThemeProvider theme={theme}>
        <Paper elevation={12} className="paper-bg" >
          {/* Title design tagen ifrån https://codepen.io/getflourish/pen/zYqRzmv */}
          <svg xmlns="http://www.w3.org/2000/svg">
           <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
             <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
           </filter>
          </svg>
          <div className="navbar">
            <span filter-content="S">Formula 1 2022 car</span>
          </div>

          <Divider variant="middle" color="#404040" />

        {/* Videon i sidan */}
        <video className="video" autoPlay muted loop >
            <source src={nosy_Be_Taxi_Madagascar} type="video/mp4" />
        </video>

          <Divider variant="middle" color="#404040" />

          <Card sx={{ maxWidth: 745 }} className="img-card">
            <CardMedia
              component="img"
              height="340"
              image={currentImg}
              alt="f1 2022 imgs"
            />
            <CardActions sx={{justifyContent: "center"}}>
              <IconButton size="small" color="primary" onClick={handleLeft} ><ChevronLeftIcon fontSize="large" /></IconButton>
              <IconButton size="small" color="primary" onClick={handleRight} ><ChevronRightIcon fontSize="large" /></IconButton>
            </CardActions>
          </Card> 

          <Divider variant="middle" color="#404040" />

          {/* Här är F1 informationen */}
          <div className="flex-container">
            <Card sx={{ maxWidth: 545 }} className="flex-item">
              <CardMedia
                component="img"
                height="240"
                image={f1_dirtyair}
                alt="f1_dirtyair"
              />
              <CardContent>
                <Typography variant="body1" className={classes.whiteTextColor}>
                  It’s been designed specifically to promote better racing
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent: "center"}}> 
                <InfoModal title="Promote better racing" 
                  textParagraph1="The 2022 regulations, originally slated to arrive in 2021 but delayed by Covid-19, had one guiding principle: to allow closer racing – with the potential for more overtakes a happy, but secondary, benefit." 
                  textParagraph2="What’s preventing closer racing currently? The effect of the catastrophic downforce loss – to quote an engineer centrally involved with the project – resulting from the ‘dirty air’ being churned chaotically off a leading car currently."
                  textParagraph3="To put some numbers on it, research shows that current F1 machines lose 35% of their downforce when running three car lengths behind a leading car (approximately 20 metres, measured from the lead car’s nose to the following car’s nose), while closing up to one car length (around 10 metres) results in a 47% loss."
                  textParagraph4="The 2022 car, developed by Formula 1's in-house Motorsports team in collaboration with the FIA, and putting a heavy onus on the aerodynamic phenomenon known as ‘ground effect’ (more on which later…), reduces those figures to 4% at 20 metres, rising to just 18% at 10 metres."
                />
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 545 }} className="flex-item">
              <CardMedia
                component="img"
                height="240"
                image={f12022_template_car}
                alt="f12022_template_car"
              />
              <CardContent>
                <Typography variant="body1" className={classes.whiteTextColor}>
                  The car will feature over-wheel winglets for the first time – and wheel covers are back!
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent: "center"}}> 
                <InfoModal title="Over-wheel winglets and wheel covers" 
                  textParagraph1="Two of the striking features on the 2022 car are its over-wheel winglets and a return to a feature last seen in F1 in 2009 – wheel covers." 
                  textParagraph2="The inclusion of the latter is simple: sending airflow through the wheels might be an enormously potent way for teams to increase their downforce, but it also adds to that chaotic aerodynamic wake coming off the cars."
                  textParagraph3="Although there have been changes to the 2022 regulations to limit what teams can do around the tyres aerodynamically, F1’s Motorsports team wanted to take a belt-and-braces approach by adding a physical seal to prevent engineers intentionally directing disruptive airflow out through the wheels."
                  textParagraph4="As for the over-wheel winglets, their job is to help control the wake coming off the front tyres and direct it away from the rear wing. That’s been a role traditionally performed by vortices from the front wing – but in a way that makes them hugely sensitive when running in following car conditions. The winglets will achieve the same thing, but in a way that is more aerodynamically resilient in close racing."
                />
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 545 }} className="flex-item">
              <CardMedia
                component="img"
                height="240"
                image={f12022_merc_18}
                alt="f12022_merc_18"
              />
              <CardContent>
                <Typography variant="body1" className={classes.whiteTextColor}>
                  The car will feature 18-inch low-profile tyres for the first time
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent: "center"}}> 
                <InfoModal title="18-inch low-profile tyres" 
                  textParagraph1="F1 fans will have recently seen lots of footage of teams testing Pirelli’s bigger 18-inch tyres in readiness for next year. " 
                  textParagraph2="The new Pirelli compounds and constructions for these 18-inch tyres have been designed with the goal of reducing the amount the tyres overheat when they slide – a primary aspect that should help with closer racing."
                  textParagraph3="The lower profile tyres also have the added benefit of reducing the sidewall deflection changes and the resulting aerodynamic wake effect that occurs. The teams spend a lot of effort on simulating the airflow regimes around the tyre shapes and interactions with the car bodywork. Reducing the sensitivity in this area will be a benefit in both the car design process and resource required – something that's particularly important in the era of the cost cap."
                />
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 545 }} className="flex-item">
              <CardMedia
                component="img"
                height="240"
                image={f12022_template_car_frontview}
                alt="f12022_template_car_frontview"
              />
              <CardContent>
                <Typography variant="body1" className={classes.whiteTextColor}>
                  The front wing and nose concept have been completely re-thought
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent: "center"}}> 
                <InfoModal title="The front wing and nose concept have been completely re-thought" 
                  textParagraph1="Although front wings have been getting progressively simpler in recent seasons, the 2022 F1 car will feature a totally new front wing shape.  " 
                  textParagraph2="Keeping with the philosophy of the 2022 car, the new front wing’s job is to both generate consistent downforce when running closely behind another car, and ensure that the front wheel wake is well controlled and directed down the car in the least disruptive way."
                  textParagraph3="That means not sending the wake dramatically outboard, as is done on the current cars, nor letting it spill under the floor and get ingested by the diffuser, but instead steering it narrowly down the side of the car as much as possible. Or as one engineer on the project put it, the 2022 car’s front wing is designed simply to be an anti-outwash front wing."
                />
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 545 }} className="flex-item">
              <CardMedia
                component="img"
                height="240"
                image={f1_1970_f1_car}
                alt="f1_1970_f1_car"
              />
              <CardContent>
                <Typography variant="body1" className={classes.whiteTextColor}>
                  An aero feature from the 70s is back!
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent: "center"}}> 
                <InfoModal title="Ground effect" 
                  textParagraph1="F1’s Motorsports team began work on the 2022 car back in 2017 – and it soon became apparent that the key change required to ensure closer racing would be placing the aerodynamic emphasis on ground effect to create downforce. Ground effect came to prominence in F1 in the late 1970s, with cars effectively designed in the shape of upside-down airplane wings, creating huge amounts of downforce as they were pushed into the track." 
                  textParagraph2="Full ground effect cars were subsequently outlawed at the end of 1982 – and the 2022 car is certainly not a return to that era (there are no side skirts for a start!). But the 2022 car does feature fully shaped underfloor tunnels, rather than the stepped floor used currently, which will allow teams to generate large amounts of efficient downforce through ground effect (the current floors also exploit ground effect, but not to the same extent)."
                  textParagraph3="The reason for the change is the benign quality of downforce generated in ground effect. Current cars’ barge boards and other bits of aerodynamic furniture are designed to send vortices under the floor to increase downforce. But when those vortices stop working – due, for example, to the influence of closely following another car – the performance drop-off is huge. "
                  //  textParagraph4="With the 2022 car, however, the underfloor downforce is better preserved within the tunnels, without the reliance on arrays of wake-sensitive, vortex-generating geometries – ergo better following, ergo closer racing!"
                />
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 545 }} className="flex-item">
              <CardMedia
                component="img"
                height="240"
                image={f12022_template_car_sideview}
                alt="f12022_template_car_sideview"
              />
              <CardContent>
                <Typography variant="body1" className={classes.whiteTextColor}>
                  Cars will run on more sustainable fuel
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent: "center"}}> 
                <InfoModal title="Cars will run on more sustainable fuel" 
                  textParagraph1="Current regulations see cars running on fuel containing 5.75% bio-components." 
                  textParagraph2="And while F1 is still working hard to introduce fully sustainable fuel in the near-future, 2022 will see the bio-component ratio rise to 10%. That will be achieved through a move to ‘E10 fuel’ – ‘E’ standing for ethanol, while ‘10’ refers to its percentage in the mixture."
                  textParagraph3="Crucially, though, that ethanol must be a second generation biofuel made in a sustainable way, meaning it will have a near-zero carbon footprint – an “interim step”, in the words of Formula 1’s Chief Technical Officer Pat Symonds, which will also help the sport align with current road car fuel regulations."
                />
              </CardActions>
            </Card>
          </div>
          <CookieConsent
            location="bottom"
            buttonText="I accept"
            enableDeclineButton
            declineButtonText="I decline"
            cookieName="cookie"
            style={{ background: "#03a9f4" }}
            buttonStyle={{ background: "#388e3c", color: "#ffffff" , fontSize: "13px" }}
            // expires={0}
            // debug={true}
            onAccept={() => {
              setEnableCookies(true);
            }}
            onDecline={() => {
              setEnableCookies(false);
            }}

          >
            <Typography variant="h6" style={{ fontSize: "18px" }}>This website uses cookies to enhance the user experience.(The website saves user activity)</Typography>
        </CookieConsent>

        <Divider variant="middle" color="#404040" sx={{marginBottom: "10px"}} />

        <InfiniteScroller />

        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
