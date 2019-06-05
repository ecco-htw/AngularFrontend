import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { BuoysMapQuery } from '../../../queries/buoys-map.query';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';

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

  

  constructor(
    private buoysMapQuery: BuoysMapQuery,
    leafletService: LeafletService,
  ) {
    super(leafletService, buoysMapQuery.selectMarkersLayerVisibility$);


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

          this.marker = L.marker(
            [buoy.coordinates.latitude, buoy.coordinates.longitude],
            {icon: this.pinicon})
            .addTo(this.leafletService.getMap())
            .bindPopup('Hi am am buoy ' + buoy.id + ' @ ' + buoy.coordinates.latitude + ' / ' + buoy.coordinates.longitude)
            //.on('click', this.router.navigate(['/buoy', buoy.id, 'details']));
            //.on('click', this.onClickFn(1, point, 2));
            //.on('mouseover', console.log('hi'));
            .on('click', () => {
              console.log('hello');
              console.log(point['id']);
              this.onClickFn(point);
             });

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

      


/*    
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
    

    

    //this.map = L.map(mapElement, mapOptions).setView(bounds.getCenter(), 3);
    //var marker = L.marker([51.5, -0.09],{icon: this.pinicon}).addTo(this.leafletService.getMap());
   // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    /*
    var markers = L.markerClusterGroup();
    markers.addlayer(L.marker(marker.getRandomLatLng(this.map)));
    this.map.addLayer(markers);
    */
    
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
    
  }

  hide() {
    this.layer.remove();
  }
}
