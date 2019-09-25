import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { BuoysMapQuery } from '../../../queries/buoys-map.query';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';


/**
 * Service to generate clickable marker for each bouy. Uses pinmarker.png file which may be replaced
 * by a svg image for quicker rendering. Currently the marker rendering became very slow, cause isn't clear yet.
 * The idea was to render sets of ~ 150 marker at a time. But this leads to a visible delay. 
 * Better may be the usage of a markercluster: https://github.com/Leaflet/Leaflet.markercluster 
 */
@Injectable({
  providedIn: 'root'
})
export class PinMarkerService extends LayerService{

  private onClickFn = null;
  private onNoPointClickFn = null;
  private points = null;
  private pinicon = null;
  private popup = null;
  private marker = null;
  private markergroup = null;

  // Limits number of markers rendered for troubleshoot.
  private counter = 0;

  constructor(
    private buoysMapQuery: BuoysMapQuery,
    leafletService: LeafletService,
  ) {
    super(leafletService, buoysMapQuery.selectMarkersLayerVisibility$);

/**
 * Load icon and adjust hight and position. There is a slight offset
 * with the current settings. (Stranded bouy in Somalia)
 */
    this.pinicon = L.icon({
      iconUrl: 'assets/images/pinmarker.png',
      iconSize: [8, 8],
      iconAnchor: [4, 8],
      popupAnchor: [0, -8]
    });
  }

  onClick(onClickFn: (point) => void) {
    this.onClickFn = onClickFn;
  }

  onNoPointClick(onNoPointClickFn: () => void) {
    this.onNoPointClickFn = onNoPointClickFn;
  }

  
  init() {
    combineLatest([
      this.buoysMapQuery.selectAll().pipe(
        map(buoys => buoys.map(buoy => {

          const point = [buoy.coordinates.latitude, buoy.coordinates.longitude];
          point['id'] = buoy.id;
          
          // Limit for marker rendering workaround.
          if(this.counter <= 500)  {

            this.marker = L.marker(
              [buoy.coordinates.latitude, buoy.coordinates.longitude],
              {icon: this.pinicon})
              .addTo(this.leafletService.getMap())
              //.bindPopup('Hi am am buoy ' + buoy.id + ' @ ' + buoy.coordinates.latitude + ' / ' + buoy.coordinates.longitude)
              .on('click', () => {
                //console.log('hello');
                //console.log(point['id']);
                this.onClickFn(point);
              });

          } this.counter++;
          return point;
        }))
      ),
      this.visibility$
    ]).subscribe(([points, visibility]) => {
      this.points = points;
      if (this.layer) {
        this.hide();
      }
      if (visibility) {
        this.show();
      }
    });

  }

  // Old version of glify marker, which are unclickable and super odd to use. See master branch for demo.

 /* 

  show() {
    const wholeWorld = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [
                  -175,
                  -85
                ],
                [
                  175,
                  -85
                ],
                [
                  175,
                  85
                ],
                [
                  -175,
                  85
                ],
                [
                  -175,
                  -85
                ]
              ]
            ]
          }
        }
      ]
    };


    L.glify.shapes({
      map: this.leafletService.getMap(),
      data: wholeWorld,
      click: this.onNoPointClickFn,
      opacity: 0
    });

    /*
    this.layer = L.marker([ 46.8523, -121.7603 ], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    });
    
    /*
    this.layer = L.glify.points({
      map: this.leafletService.getMap(),
      click: this.onClickFn,
      size: 5,
      color: { r: 255 / 255, g: 0 / 255, b: 0 / 255 },
      opacity: 0.8,
      data: this.points,
      className: 'glify-canvas'
    });
    */
    
  
/*
  hide() {
    this.layer.remove();
  }
*/
}
