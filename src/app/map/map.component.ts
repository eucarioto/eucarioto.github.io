import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import Static from "ol/source/ImageStatic";
import ImageLayer from "ol/layer/Image";
import {Projection} from "ol/proj";

const projection = new Projection({
  code: 'tierras-habitadas',
  units: 'pixels',
  extent: [0, 0, 3111, 2209],
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
            imageExtent: [0, 0, 3111, 2209],
          }),
        }),
      ],
      /*interactions: defaultInteractions().extend
      ([
        new DragPan({kinetic: new Kinetic(0, 0, 0)})
      ]),*/
      target: 'map',
      view: new View({
        projection: projection,
        center: [1555, 1105],
        extent: [0, 0, 3111, 2209],
        zoom: 2,
        maxZoom: 4,
        minZoom: 2,
      }),
    });
  }
}
