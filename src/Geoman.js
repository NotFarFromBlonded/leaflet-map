import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { EmissionState } from "./Context";

const Geoman = () => {
  const context = useLeafletContext();
  const {setnhPolyLines, setshPolyLines, setrrPolyLines, setnhPolyGons, setshPolyGons, setrrPolyGons} = EmissionState();
  
  useEffect(() => {
    const leafletContainer = context.layerContainer || context.map;
    
    leafletContainer.pm.addControls({
      drawMarker: false,
      position: 'topright',
      drawCircle: false,
      drawRectangle: true,
      drawMarker: false,
      drawCircleMarker: false,
      customControls: true
    });

    const _action = [
      'finish',
      
      {
        text: 'NH',
        onClick: () => {
          leafletContainer.pm.setPathOptions({
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 0.4,
          });
          leafletContainer.pm.enableDraw('Polygon',{
            hintlineStyle:{
              color:'blue',
              dashArray: [5, 5]
            }, 
          });
          leafletContainer.pm.enableDraw('Polygon',{
            templineStyle:{
              color:'blue'
            }
          });
          leafletContainer.pm.enableDraw('Line',{
            hintlineStyle:{
              color:'blue',
              dashArray: [5, 5]
            }, 
          });
          leafletContainer.pm.enableDraw('Line',{
            templineStyle:{
              color:'blue'
            }
          });
          
        },
      },
      {
        text: 'SH',
        onClick: () => {
          leafletContainer.pm.setPathOptions({
            color: 'orange',
            fillColor: 'orange',
            fillOpacity: 0.4,
          });
          leafletContainer.pm.enableDraw('Polygon',{
            hintlineStyle:{
              color:'orange',
              dashArray: [5, 5]
            }, 
          });
          leafletContainer.pm.enableDraw('Polygon',{
            templineStyle:{
              color:'orange'
            }
          });
          leafletContainer.pm.enableDraw('Line',{
            hintlineStyle:{
              color:'orange',
              dashArray: [5, 5]
            }, 
          });
          leafletContainer.pm.enableDraw('Line',{
            templineStyle:{
              color:'orange'
            }
          });
          
        },
      },
      {
        text: 'RR',
        onClick: () => {
          leafletContainer.pm.setPathOptions({
            color: 'yellow',
            fillColor: 'yellow',
            fillOpacity: 0.4,
            
          });
          leafletContainer.pm.enableDraw('Polygon',{
            hintlineStyle:{
              color:'yellow',
              dashArray: [5, 5]
            }, 
          });
          leafletContainer.pm.enableDraw('Polygon',{
            templineStyle:{
              color:'yellow'
            }
          });
          leafletContainer.pm.enableDraw('Line',{
            hintlineStyle:{
              color:'yellow',
              dashArray: [5, 5]
            }, 
          });
          leafletContainer.pm.enableDraw('Line',{
            templineStyle:{
              color:'yellow'
            }
          });
          
        },
      },
      'removeLastVertex',
      'cancel',
      
    ]

    leafletContainer.pm.Toolbar.changeActionsOfControl('Polyline', _action)

    
    //leafletContainer.pm.Draw.RectangleCopy.setPathOptions({ color: 'green' });

    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });
    leafletContainer.pm.setPathOptions({color: 'blue'});
    leafletContainer.pm.enableDraw('Polygon',{
      hintlineStyle:{
        color:'blue',
        dashArray: [5, 5]
      }, 
    });
    leafletContainer.pm.enableDraw('Polygon',{
      templineStyle:{
        color:'blue'
      }
    });
    leafletContainer.pm.enableDraw('Line',{
      hintlineStyle:{
        color:'blue',
        dashArray: [5, 5]
      }, 
    });
    leafletContainer.pm.enableDraw('Line',{
      templineStyle:{
        color:'blue'
      }
    });
    
    leafletContainer.on("pm:create", async(e) => {
      if (e.layer && e.layer.pm) {
        const shape = e;
        //console.log(e);
        // enable editing of circle
        shape.layer.pm.enable();
        
        console.log(`object created: ${shape.layer.pm.getShape()}`);
        var st = Object.assign(leafletContainer.pm.getGeomanLayers(true).toGeoJSON().features.at(-1), {color:`${e.layer.options.color}`, id: e.layer._leaflet_id})
        if(st.color === "blue"){
          if(shape.layer.pm.getShape()==="Line"){
            setnhPolyLines(oldArray => [...oldArray, st]);
          }else if(shape.layer.pm.getShape()==="Polygon"){
            setnhPolyGons(oldArray => [...oldArray,st]);
          }
        } else if(st.color === "orange"){
          if(shape.layer.pm.getShape()==="Line"){
            setshPolyLines(oldArray => [...oldArray, st]);
          }else if(shape.layer.pm.getShape()==="Polygon"){
            setshPolyGons(oldArray => [...oldArray,st]);
          }
        } else if(st.color === "yellow"){
          if(shape.layer.pm.getShape()==="Line"){
            setrrPolyLines(oldArray => [...oldArray, st]);
          }else if(shape.layer.pm.getShape()==="Polygon"){
            setrrPolyGons(oldArray => [...oldArray,st]);
          }
        }
        
        
        leafletContainer.pm
          .getGeomanLayers(true)
          .bindPopup("i am whole")
          .openPopup();

        console.log(e.layer);

        shape.layer.on("pm:edit", (e) => {
          if(e.layer.options.color === "blue"){
            setnhPolyLines(oldArray=>oldArray.map((item)=>{if(item.id===e.layer._leaflet_id){const t = e.layer._latlngs.map((item)=>{return [item.lng, item.lat]});item.geometry.coordinates = t;return item}else{return item}}));
            setnhPolyGons(oldArray=>oldArray.map((item)=>{if(item.id===e.layer._leaflet_id){const t = e.layer._latlngs[0].map((item)=>{return [item.lng, item.lat]});item.geometry.coordinates = [t];return item}else{return item}}));
          }else if(e.layer.options.color === "orange"){
            setshPolyLines(oldArray=>oldArray.map((item)=>{if(item.id===e.layer._leaflet_id){const t = e.layer._latlngs.map((item)=>{return [item.lng, item.lat]});item.geometry.coordinates = t;return item}else{return item}}));
            setshPolyGons(oldArray=>oldArray.map((item)=>{if(item.id===e.layer._leaflet_id){const t = e.layer._latlngs[0].map((item)=>{return [item.lng, item.lat]});item.geometry.coordinates = [t];return item}else{return item}}));
          }else if(e.layer.options.color === "yellow"){
            setrrPolyLines(oldArray=>oldArray.map((item)=>{if(item.id===e.layer._leaflet_id){const t = e.layer._latlngs.map((item)=>{return [item.lng, item.lat]});item.geometry.coordinates = t;return item}else{return item}}));
            setrrPolyGons(oldArray=>oldArray.map((item)=>{if(item.id===e.layer._leaflet_id){const t = e.layer._latlngs[0].map((item)=>{return [item.lng, item.lat]});item.geometry.coordinates = [t];return item}else{return item}}));
          }
          
          //console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
          //setPolyLines(leafletContainer.pm.getGeomanLayers(true).toGeoJSON().features.filter((item)=>{if(item.geometry.type==="LineString"&&item.color==="blue"){return item.geometry.coordinates}}));
        });
      }
    });
    
    

    leafletContainer.on("pm:remove", (e) => {
      console.log("object removed");
      //console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
      //setPolyLines(leafletContainer.pm.getGeomanLayers(true).toGeoJSON().features.filter((item)=>{if(item.geometry.type==="LineString"){return item.geometry.coordinates}}));
      if(e.layer.options.color === "blue"){
        setnhPolyLines(oldArray => oldArray.filter((item)=>{if(item.id!==e.layer._leaflet_id){return item};return;}));
        setnhPolyGons(oldArray => oldArray.filter((item)=>{if(item.id!==e.layer._leaflet_id){return item};return;}));
      } else if(e.layer.options.color === "orange"){
        setshPolyLines(oldArray => oldArray.filter((item)=>{if(item.id!==e.layer._leaflet_id){return item};return;}));
        setshPolyGons(oldArray => oldArray.filter((item)=>{if(item.id!==e.layer._leaflet_id){return item};return;}));
      }else if(e.layer.options.color === "yellow"){
        setrrPolyLines(oldArray => oldArray.filter((item)=>{if(item.id!==e.layer._leaflet_id){return item};return;}));
        setrrPolyGons(oldArray => oldArray.filter((item)=>{if(item.id!==e.layer._leaflet_id){return item};return;}));
      }
      
    });

    //console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON().features)

    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
      leafletContainer.pm.setPathOptions({color: 'blue'});
    };
  }, [context]);

  return null;
};

export default Geoman;