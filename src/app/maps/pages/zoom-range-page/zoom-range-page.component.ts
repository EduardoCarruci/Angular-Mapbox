import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'pages-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 10;
  public map?: Map ;
  public currentCenter: LngLat = new LngLat(-62.760927214894224, 8.25934378195467);


  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento Html no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-62.760927214894224, 8.25934378195467], // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
      });

      this.mapListenenrs();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListenenrs() {
    if ( !this.map )  throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.currentZoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev) => {
      if( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('moveend', () => {
      this.currentCenter = this.map!.getCenter();
    });
  }


  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.currentZoom = Number(value);
    this.map?.zoomTo( this.currentZoom );
  }

}
