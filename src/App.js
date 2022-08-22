import './App.css';
import { MapContainer, TileLayer, LayersControl, Marker, useMap} from "react-leaflet";
import L from 'leaflet';
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { useRef, useEffect, useState } from 'react';
import useGeoLocation from './useGeoLocation';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import LocationPin from './LocationPin.png';
import Geoman from './Geoman';
import { EmissionState } from './Context';
import { road_material } from './data';
import PieChart from './charts/PieChart';
import DoughnutChart from './charts/DoughnutChart';
import TabularData from './tables/TabularData';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const searchPlaceIcon = new L.Icon({
  iconUrl: LocationPin,
  iconSize: [32, 32]
})

function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      animateZoom: true,
      marker:{
        icon: searchPlaceIcon
      }
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
}

const {BaseLayer} = LayersControl;
const position = [22.505, 78.505];
const zoom = 4;

function App() {
  const [myLocation, setMyLocation] = useState(false)
  const mapRef = useRef();
  /*useEffect(()=>{
    const { current = {} } = mapRef;
    if (current !== null){
      const {leafletElement: map} = current;
      console.log(current);
      map.locate();
    }
    
  }, [mapRef])*/
  const location = useGeoLocation();

  const {handleGeomanData, nhDistInKm, shDistInKm, rrDistInKm, nhAreaInM, shAreaInM, rrAreaInM} = EmissionState();

  const showMyLocation = () => {
    if(location.loaded && !location.error){
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        15,
        {animate: true}
      );
      setMyLocation(true);
    } else {
      alert(location.error.message);
    }
  }
  return (
    <>
      <div className='max-w-5xl my-8 mx-auto'>
        <MapContainer ref = {mapRef} center = {position} zoom={zoom} scrollWheelZoom = {true} style={{height:"60vh", width:"120vh"}} >
          <LayersControl>
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

            </BaseLayer>
            <BaseLayer name = "Google Hybrid">
              <ReactLeafletGoogleLayer type = {'hybrid'}/>
            </BaseLayer>
            <BaseLayer name = "Google Satellite">
              <ReactLeafletGoogleLayer type = {'satellite'}/>
            </BaseLayer>
          </LayersControl>
          {myLocation?
            <Marker position = {[
              location.coordinates.lat,
              location.coordinates.lng
            ]}></Marker>:""}
          <LeafletgeoSearch/>
          <Geoman/>
        </MapContainer>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button className="py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white" onClick={showMyLocation}>
            Locate Me
          </button>
          <button className="py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white" onClick={handleGeomanData}>
            Calculate
          </button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        {nhDistInKm.length === 0?"":<div><p>Total Distance of NH to be constructed: {`${nhDistInKm.reduce((acc,el)=>acc+=el,0).toFixed(3)}`}km</p></div>}
        {shDistInKm.length === 0?"":<div><p>Total Distance of SH to be constructed: {`${shDistInKm.reduce((acc,el)=>acc+=el,0).toFixed(3)}`}km</p></div>}
        {rrDistInKm.length === 0?"":<div><p>Total Distance of RR to be constructed: {`${rrDistInKm.reduce((acc,el)=>acc+=el,0).toFixed(3)}`}km</p></div>}
      </div>
      <div className="max-w-5xl mx-auto">
        {nhAreaInM.length === 0?"":<div><p>Total Area of trees to be cut for contruction of NH: {`${(nhAreaInM.reduce((acc,el)=>acc+=el,0)/1000000).toFixed(3)}`}km&sup2;</p></div>}
        {shAreaInM.length === 0?"":<div><p>Total Area of trees to be cut for contruction of SH: {`${(shAreaInM.reduce((acc,el)=>acc+=el,0)/1000000).toFixed(3)}`}km&sup2;</p></div>}
        {rrAreaInM.length === 0?"":<div><p>Total Area of trees to be cut for contruction of RR: {`${(rrAreaInM.reduce((acc,el)=>acc+=el,0)/1000000).toFixed(3)}`}km&sup2;</p></div>}
      </div>
      <div className="max-w-5xl mx-auto">
        {nhAreaInM.length !== 0 || shAreaInM.length!==0 || rrAreaInM.length!==0?<div><p>Total Emission from Trees Cut: {`${(((nhAreaInM.reduce((acc,el)=>acc+=el,0)+shAreaInM.reduce((acc,el)=>acc+=el,0), rrAreaInM.reduce((acc,el)=>acc+=el,0))/1000000).toFixed(3))*121,405.8}`}tCO<sub>2</sub></p>  </div>:""}
      </div>
      <div className="flex justify-center">
          {nhDistInKm.length === 0?"":<PieChart chartData={road_material[0].Carbon_emission} name="% of Materials Used in Construction of NH" type="volume"/>}
          {shDistInKm.length === 0?"":<PieChart chartData={road_material[1].Carbon_emission} name="% of Materials Used in Construction of SH" type="volume"/>}
          {rrDistInKm.length === 0?"":<PieChart chartData={road_material[2].Carbon_emission} name="% of Materials Used in Construction of RR" type="volume"/>}
      </div>
      <div className="flex justify-center">
          {nhDistInKm.length === 0?"":<PieChart chartData={road_material[0].Carbon_emission} name="% of CO2 Emission by Materials Used in Construction of NH" type="emission"/>}
          {shDistInKm.length === 0?"":<PieChart chartData={road_material[1].Carbon_emission} name="% of CO2 Emission by Materials Used in Construction of SH" type="emission"/>}
          {rrDistInKm.length === 0?"":<PieChart chartData={road_material[2].Carbon_emission} name="% of CO2 Emission by Materials Used in Construction of RR" type="emission"/>}
      </div>
      <div className="tabularDetails">
          {nhDistInKm.length===0 ?"":<TabularData tableData={road_material[0].Carbon_emission} multiplier={nhDistInKm.reduce((acc,el)=>acc+=el,0)} name="Construction of NH Details:"/>}
          {shDistInKm.length===0 ?"":<TabularData tableData={road_material[1].Carbon_emission} multiplier={shDistInKm.reduce((acc,el)=>acc+=el,0)} name="Construction of SH Details:"/>}
          {rrDistInKm.length===0 ?"":<TabularData tableData={road_material[2].Carbon_emission} multiplier={rrDistInKm.reduce((acc,el)=>acc+=el,0)} name="Construction of RR Details:"/>}
      </div>
    </>
  );
}

export default App;
