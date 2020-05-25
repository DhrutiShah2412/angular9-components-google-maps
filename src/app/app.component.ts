import { Component, ViewChild, OnInit } from "@angular/core";
import { GoogleMap, MapInfoWindow, MapMarker } from "@angular/google-maps";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular9 Components - Google Maps";

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    //mapTypeId: "hybrid",
    maxZoom: 15,
    minZoom: 8
  };
  markers = [];
  infoContent = "";
  display?: google.maps.LatLngLiteral;

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: x.coords.latitude,
        lng: x.coords.longitude
      };
      this.markers.push({
        position: {
          lat: x.coords.latitude,
          lng: x.coords.longitude
        },
        label: {
          color: "#00bfa9",
          text: "Marker Label"
        },
        title: "Marker Title",
        info: "Marker info",
        options: {
          animation: google.maps.Animation.BOUNCE
        }
      });
    });
  }

  openInfo(marker: MapMarker, info) {
    this.infoContent = info;
    this.info.open(marker);
  }
  
  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10
      },
      label: {
        color: "#608ff3",
        text: "Marker label " + (this.markers.length + 1)
      },
      title: "Marker title " + (this.markers.length + 1),
      info: "Marker info " + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP
      }
    });
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  click(event: google.maps.MouseEvent) {
    console.log(event);
  }

  removeLastMarker() {
    if (this.markers.length != 1) {
      this.markers.pop();
    }
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }
}
