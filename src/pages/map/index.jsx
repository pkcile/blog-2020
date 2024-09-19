import React, { useEffect } from 'react';
import './index.less'
// 有性能问题
const Mapleaflet = ({setMapstatus, location }) => {

  function loadLeaflet(locationDevice) {
    let zoom = 4;
    let longitude = locationDevice?.longitude;
    let latitude = locationDevice?.latitude;
    if(locationDevice?.accuracy > 10000) {
      zoom = 4;
    } else {
      zoom = 17
    }
    let map = L.map('mapleaflet', {
      maxZoom: 18,
      dragging: true,
    }).setView([latitude, longitude], zoom);
    // const map = L.map('mapleaflet').setView([51.505, -0.09], 13);


    L.tileLayer(
      'https://temp.pkcile.cn/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: false,
      maxZoom: 18,
      detectRetina: false,
    }
    ).addTo(map);

    const circle = L.circle([latitude, longitude], {
      color: '#fff',
      fillColor: '#e27728',
      fillOpacity: 1,
      radius: 5,
      stroke: true,
      weight: 2
    }).addTo(map);

    const circle2 = L.circle([latitude, longitude], {
      color: '#e27728',
      fillColor: '#e27728',
      stroke: true,
      weight: 2,
      fillOpacity: 0.1,
      radius: locationDevice?.accuracy
    }).addTo(map);
    var textLabel = L.divIcon({
      className: 'text-label',
      html: '<div style="background-color: white; padding: 5px; border: 1px solid black;">圆形区域</div>'
  });
  var marker = L.marker([latitude - 0.0002, longitude + 0.000] ).addTo(map);
  marker.setOpacity(0) 
  circle2.bindPopup(`你在${locationDevice?.accuracy}米范围内` );
  // marker.bindTooltip("圆形描述", {permanent: true, direction: 'right', });
  // L.marker([latitude, longitude], {icon: textLabel}).addTo(map);

  }

  useEffect(function () {
    if (typeof L == "undefined") {
      var script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.7.0/dist/leaflet.js'
      script.onload = function () {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.7.0/dist/leaflet.css';
        link.onload = function () {
          loadLeaflet(location)
        }
        document.head.appendChild(link);
      }
      document.head.appendChild(script);
    } else {
      loadLeaflet(location)
    }
  }, [location])
  return (
    <div style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 1 }} id="mapleaflet">
      <div
        class='top-update-location-2'
        style={{
          position: "fixed",
          zIndex: 999
        }}
      >
        <div></div>
        <div className="updatelocation"
          onClick={() => {
            setMapstatus(false)
          }}
        >
          <svg t="1726671856783" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7358" ><path d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448-200.96 448-448 448z m0-831.713c-211.584 0-383.713 172.129-383.713 383.713 0 211.552 172.129 383.713 383.713 383.713 211.552 0 383.713-172.16 383.713-383.713 0-211.584-172.161-383.713-383.713-383.713z m45.055 385.09l138.368-136.865c12.576-12.416 12.673-32.672 0.256-45.248s-32.704-12.673-45.248-0.256l-138.56 137.024-136.448-136.864c-12.513-12.513-32.735-12.577-45.248-0.064-12.513 12.48-12.544 32.735-0.064 45.248l136.256 136.672L328.99 648.928c-12.577 12.447-12.673 32.672-0.257 45.248a31.886 31.886 0 0 0 22.752 9.504c8.128 0 16.256-3.103 22.497-9.248l137.567-136.064 138.688 139.137c6.24 6.271 14.432 9.407 22.657 9.407a31.937 31.937 0 0 0 22.591-9.344c12.513-12.48 12.544-32.704 0.064-45.248L557.055 513.376z" p-id="7359" fill="#ffffff"></path></svg>        </div>
      </div>
      <div style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 1 }} id="mapleaflet"></div>

    </div>
  );
};

export default Mapleaflet;