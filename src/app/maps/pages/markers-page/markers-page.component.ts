import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'pages-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map')

  public markers: Marker[] = [];

  public divMap?: ElementRef;
  public map?: Map ;
  public currentCenter: LngLat = new LngLat(-62.760927214894224, 8.25934378195467);


  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento Html no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-62.760927214894224, 8.25934378195467], // starting position [lng, lat]
      zoom: 13,
      });

      // const markerHtml = document.createElement('div');
      // markerHtml.innerHTML = 'Eduardo Valderrama'

      // const marker = new Marker({
      //   // color: 'red'
      //   element: markerHtml,
      // })
      //   .setLngLat( this.currentCenter )
      //   .addTo( this.map );

  }

  createMarker() {
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();


    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: LngLat, color: string ) {
    if( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat( lngLat)
      .addTo( this.map );
    this.markers.push( marker );
  }

}
