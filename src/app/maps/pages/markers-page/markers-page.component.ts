import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerData {
  marker: Marker;
  color: string;
}

@Component({
  selector: 'pages-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;
  public currentCenter: LngLat = new LngLat(-62.760927214894224, 8.25934378195467);
  public markerData: MarkerData[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento Html no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-62.760927214894224, 8.25934378195467],
      zoom: 13,
    });
  }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    const markerData: MarkerData = { marker, color };
    this.markerData.push(markerData);
  }
}
