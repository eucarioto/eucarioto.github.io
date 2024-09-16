import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Static from "ol/source/ImageStatic";
import ImageLayer from "ol/layer/Image";
import {Projection} from "ol/proj";
import {getCenter} from "ol/extent";
import {Icon, Style} from "ol/style";
import {Point} from "ol/geom";
import {Feature} from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Overlay from 'ol/Overlay.js';

const extent = [0, 0, 3111, 2208];
const projection = new Projection({
  code: 'tierras-habitadas',
  units: 'pixels',
  extent: extent,
});

const iconFeature = new Feature({
  geometry: new Point([600, 2208]),
  name: 'Null Island',
});

const iconStyle = new Style({
  image: new Icon({
    anchor: [0, 0],
    anchorXUnits: 'pixels',
    anchorYUnits: 'pixels',
    src: 'point.png',
  }),
});

iconFeature.setStyle(iconStyle);

const vectorSource = new VectorSource({
  features: [iconFeature],
});

const vectorLayer = new VectorLayer({
  source: vectorSource
});

const element: HTMLElement = document.getElementById('popup') as HTMLElement;

const popup = new Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
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
        vectorLayer
      ],
      /*interactions: defaultInteractions().extend
      ([
        new DragPan({kinetic: new Kinetic(0, 0, 0)})
      ]),*/
      target: 'map',
      view: new View({
        projection: projection,
        center: getCenter(extent),
        extent: [0, 0, 3111, 2209],
        zoom: 1,
        maxZoom: 4,
        minZoom: 1,
      }),
    });
    this.map.addOverlay(popup);

  }
}
