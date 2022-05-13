export class Map {
  constructor() {
    var ele = document.getElementById("map"),
        width = ele.clientWidth,
        height = ele.clientHeight;

    this.svg = d3.select("div.map").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "green")
      .attr("stroke", "white")
      .attr("stroke-width", ".2");

    this.projection = d3.geo.orthographic()
      .scale(height / 1.3)
      .translate([width / 2, height * ( 1 - 1/5 )])
      .rotate([-137, -34])
      .clipAngle(90)
      .precision(10);

    this.path = d3.geo.path()
      .projection(this.projection);

    this.mapInfo = [
      {
        "name":"서울",
        "lat" : "37.532600",
        "lon" : "127.024612"
      },
      {
        "name":"대전",
        "lat" : "36.3730178",
        "lon" : "127.2483736"
      },
      {
        "name":"China",
        "lat" : "49",
        "lon" : "60"
      }
    ]
  }

  ready(error, data){
    console.log("1, start");
    var features;
    queue()
        .defer(d3.json, "https://unpkg.com/world-atlas@1/world/110m.json" )
        .await( function(error, data) {
          features = topojson.feature(data, data.objects.countries).features;
          console.log("2, ", features);
          return features
          }
        );
    // world
    // var features = topojson.feature(data, data.objects.countries).features;

    console.log("3, ", features);
    //
    // console.log(this);
    // console.log("?");
    // console.log(this.path);

    // this.svg.selectAll("path")
    //   .data(features)
    //   .enter()
    //   .append("path")
    //   .attr("d", this.path);
    //
    // // graticule
    // this.svg.append("path")
    //   .datum(graticule)
    //   .attr("fill", "none")
    //   .attr("stroke", "gray")
    //   .attr("d", path);
    //
    // //points
    // this.svg.selectAll("circle")
    //   .data(mapInfo)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", d=> projection([d.lon, d.lat])[0])
    //   .attr("cy", d=> projection([d.lon, d.lat])[1])
    //   .attr("r", 2)
    //   .attr("fill", "blue");
  }

  ready2() {
    var a = this.ready()
  }
}
