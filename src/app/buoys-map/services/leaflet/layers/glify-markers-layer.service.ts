import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuoysMapQuery } from '../../../queries/buoys-map.query';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class GlifyMarkersLayerService extends LayerService {
  private onClickFn = null;
  private onNoPointClickFn = null;
  private points = null;

  constructor(
    private buoysMapQuery: BuoysMapQuery,
    leafletService: LeafletService,
  ) {
    super(leafletService, buoysMapQuery.selectMarkersLayerVisibility$);
  }

  onClick(onClickFn: (e, point, xy) => void) {
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

    L.glify.shapes({
      map: this.leafletService.getMap(),
      data: wholeWorld,
      click: this.onNoPointClickFn,
      opacity: 0
    });

    this.layer = L.glify.points({
      map: this.leafletService.getMap(),
      click: this.onClickFn,
      size: 7,
      color: { r: 255 / 255, g: 0 / 255, b: 0 / 255 },
      opacity: 0.8,
      data: this.points,
      className: 'glify-canvas'
    });
  }

  hide() {
    this.layer.remove();
  }
}
