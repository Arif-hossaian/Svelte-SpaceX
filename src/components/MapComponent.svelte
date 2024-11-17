<script>
	import { onMount } from "svelte";
	import "ol/ol.css";
	import Map from "ol/Map";
	import View from "ol/View";
	import { Tile as TileLayer } from "ol/layer";
	import { OSM } from "ol/source";
	import { Feature } from "ol";
	import { Point } from "ol/geom";
	import { Vector as VectorLayer } from "ol/layer";
	import { Vector as VectorSource } from "ol/source";
	import { Style, Icon } from "ol/style";
  
	export let locations = [];
	
	let map;
  
	onMount(() => {
	  const features = locations.map((location) => {
		const feature = new Feature({
		  geometry: new Point([location.lon, location.lat]),
		  name: location.name,
		  status: location.status,
		});
  
		feature.setStyle(
		  new Style({
			image: new Icon({
			  src: location.status === "active"
				? "https://img.icons8.com/color/48/000000/marker--v1.png"
				: "https://img.icons8.com/color/48/000000/marker.png",
			  scale: 0.8,
			}),
		  })
		);
  
		return feature;
	  });
  
	  const vectorSource = new VectorSource({ features });
	  const vectorLayer = new VectorLayer({ source: vectorSource });
  
	  map = new Map({
		target: "map",
		layers: [
		  new TileLayer({ source: new OSM() }),
		  vectorLayer,
		],
		view: new View({
		  center: [0, 0],
		  zoom: 2,
		}),
	  });
  
	  const extent = vectorSource.getExtent();
	  map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 10 });
	});
  </script>
  
  <style>
	#map {
	  height: 100%;
	  width: 100%;
	}
  
	.map-container {
	  height: 400px;
	}
  </style>
  
  <div class="bg-white p-6 rounded-lg shadow">
	<h3 class="text-lg font-semibold mb-2">Map View</h3>
	<div id="map" class="map-container"></div>
  </div>