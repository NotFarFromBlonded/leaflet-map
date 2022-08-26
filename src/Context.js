import React, { createContext, useContext, useState} from 'react';
import { computeArea ,LatLng } from 'spherical-geometry-js';

const Emission = createContext();

const Context = ({children}) => {
    const [polyLines, setPolyLines] = useState([]);
    const [polyGons, setPolyGons] = useState([]);
    const [nhDistInKm, setnhDistInKm] = useState([]);
    const [shDistInKm, setshDistInKm] = useState([]);
    const [rrDistInKm, setrrDistInKm] = useState([]);
    const [nhPolyLines, setnhPolyLines] = useState([]);
    const [shPolyLines, setshPolyLines] = useState([]);
    const [rrPolyLines, setrrPolyLines] = useState([]);
    const [nhAreaInM, setnhAreaInM] = useState([]);
    const [shAreaInM, setshAreaInM] = useState([]);
    const [rrAreaInM, setrrAreaInM] = useState([]);
    const [nhPolyGons, setnhPolyGons] = useState([]);
    const [shPolyGons, setshPolyGons] = useState([]);
    const [rrPolyGons, setrrPolyGons] = useState([]);
    

    const distance = (lat1, lon1, lat2, lon2) => {
        var p = 0.017453292519943295;    
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        return 12742 * Math.asin(Math.sqrt(a)); 
    }

    const handleGeomanData = () =>{
        //var d = 0;
        let nhDist = [];
        let shDist = [];
        let rrDist = [];
        let nhArea = [];
        let shArea = [];
        let rrArea = [];
        
        if(nhPolyLines!==[]){
            for(let i = 0; i<nhPolyLines.length; i++){
                let d = 0;
                for(let j = 0; j<nhPolyLines[i].geometry.coordinates.length-1; j++){
                    d+=distance(nhPolyLines[i].geometry.coordinates[j][1],nhPolyLines[i].geometry.coordinates[j][0], nhPolyLines[i].geometry.coordinates[j+1][1], nhPolyLines[i].geometry.coordinates[j+1][0]);
                }
                nhDist.push(d);
            }
        }

        if(shPolyLines!==[]){
            for(let i = 0; i<shPolyLines.length; i++){
                let d = 0;
                for(let j = 0; j<shPolyLines[i].geometry.coordinates.length-1; j++){
                    d+=distance(shPolyLines[i].geometry.coordinates[j][1],shPolyLines[i].geometry.coordinates[j][0], shPolyLines[i].geometry.coordinates[j+1][1], shPolyLines[i].geometry.coordinates[j+1][0]);
                }
                shDist.push(d);
            }
        }

        if(rrPolyLines!==[]){
            for(let i = 0; i<rrPolyLines.length; i++){
                let d = 0;
                for(let j = 0; j<rrPolyLines[i].geometry.coordinates.length-1; j++){
                    d+=distance(rrPolyLines[i].geometry.coordinates[j][1],rrPolyLines[i].geometry.coordinates[j][0], rrPolyLines[i].geometry.coordinates[j+1][1], rrPolyLines[i].geometry.coordinates[j+1][0]);
                }
                rrDist.push(d);
            }
        }

        if(nhPolyGons!==[]){
            for(let i=0; i<nhPolyGons.length; i++){
                let d = nhPolyGons[i].geometry.coordinates[0].map((item)=> {return new LatLng(item[1], item[0])});
                nhArea.push(computeArea(d));
            }
        }

        if(shPolyGons!==[]){
            for(let i=0; i<shPolyGons.length; i++){
                let d = shPolyGons[i].geometry.coordinates[0].map((item)=> {return new LatLng(item[1], item[0])});
                shArea.push(computeArea(d));
            }
        }

        if(rrPolyGons!==[]){
            for(let i=0; i<rrPolyGons.length; i++){
                let d = rrPolyGons[i].geometry.coordinates[0].map((item)=> {return new LatLng(item[1], item[0])});
                rrArea.push(computeArea(d));
            }
        }


        setnhDistInKm(nhDist);
        setshDistInKm(shDist);
        setrrDistInKm(rrDist);
        /*console.log(nhArea);
        console.log(shArea);
        console.log(rrArea);*/
        setnhAreaInM(nhArea);
        setshAreaInM(shArea);
        setrrAreaInM(rrArea);

    }

    return(
        <Emission.Provider value={{ 
            handleGeomanData, 
            polyLines, 
            setPolyLines, 
            polyGons, 
            setPolyGons, 
            nhPolyLines, 
            setnhPolyLines, 
            shPolyLines, 
            setshPolyLines, 
            rrPolyLines, 
            setrrPolyLines,
            nhPolyGons, 
            setnhPolyGons, 
            shPolyGons, 
            setshPolyGons, 
            rrPolyGons, 
            setrrPolyGons,
            nhAreaInM,
            setnhAreaInM,
            shAreaInM,
            setshAreaInM,
            rrAreaInM,
            setrrAreaInM,
            nhDistInKm, 
            setnhDistInKm, 
            shDistInKm, 
            setshDistInKm, 
            rrDistInKm, 
            setrrDistInKm,
            
        }}>
            {children}
        </Emission.Provider>
    )
}

export default Context;
export const EmissionState = () => {
    return useContext(Emission);
}