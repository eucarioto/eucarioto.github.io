import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import Static from "ol/source/ImageStatic";
import ImageLayer from "ol/layer/Image";
import {Projection} from "ol/proj";

const extent = [0, 0, 3111, 2209];
const projection = new Projection({
  code: 'tierras-habitadas',
  units: 'pixels',
  extent: extent,
});


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map!: Map
  ngOnInit(): void {
    this.map = new Map({
      layers: [
        new ImageLayer({
          source: new Static({
            url: 'map.png',
            projection: projection,
            imageExtent: extent,
          }),
        }),
      ],
      target: 'map',
      view: new View({
        projection: projection,
        center: [1555, 1105],
        zoom: 2,
        maxZoom: 4,
        minZoom: 2,
      }),
    });
  }
}
