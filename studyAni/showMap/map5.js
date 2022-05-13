    d3.select(window)
        .on("touchmove", touchMove)
        .on("touchstart", touchDown)
        .on("touchend", touchUp)
        .on("mousedown", mouseDown)
        .on("mousemove", mouseMove)
        .on("mouseup", mouseUp);

		var ele = document.getElementById("map"),
    		width = ele.clientWidth,
        height = ele.clientHeight;

    var svg = d3.select("div.map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "green")
        .attr("stroke", "white")
        .attr("stroke-width", ".2");
        // .on("mousedown", mouseDown);

    var projection = d3.geo.orthographic()
        // .scale(height / 2.8)
        // .translate([width / 2, height * ( 1 - 1/10 )])
        .scale(height / 1.3)
        .translate([width / 2, height * ( 1 - 1/5 )])
        .rotate([-137, -34])
        .clipAngle(90)
        .precision(10);

    var path = d3.geo.path()
        .projection(projection);

    var graticule = d3.geo.graticule();

    var mapInfo = [
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


    queue()
        .defer(d3.json, "https://unpkg.com/world-atlas@1/world/110m.json" )
        .await(ready);

    function ready(error, data){

        var features = topojson.feature(data, data.objects.countries).features;

        // world
        svg.selectAll("path")
            .data(features)
            .enter()
            .append("path")
            .attr("d", path);

        // graticule
        svg.append("path")
          .datum(graticule)
          .attr("fill", "none")
          .attr("stroke", "gray")
          .attr("d", path);

        //points
        svg.selectAll("circle")
          .data(mapInfo)
          .enter()
          .append("circle")
          .attr("cx", d=> projection([d.lon, d.lat])[0])
          .attr("cy", d=> projection([d.lon, d.lat])[1])
          .attr("r", 2)
          .attr("fill", "blue");

          setInterval(rotateEarth, 50);
    }

    //rotate earth
    function rotateEarth() {
      if (!m0) {
        var r1 = projection.rotate()[0],
            r2 = projection.rotate()[1];
        projection.rotate([r1 - 0.5, r2])
        reDraw();
      }
    }

    // window mousemove
    function mouseMove() {
        if (m0) {
            // limit vertical rotation between 55 & -55
            var m1 = [d3.event.pageX, d3.event.pageY],
            o1 = [o0[0] + (m1[0] - m0[0]) / 6, o0[1] + (m0[1] - m1[1]) / 6];
            if (o1[1] > 55) {
                o1[1] = 55;
            }
            if (o1[1] < -55) {
                o1[1] = -55;
            }
            projection.rotate(o1);
            reDraw();
        }
    }

    // window mouseup
    function mouseUp() {
        if (m0) {
            m0 = null;
        }
    }

    // svg mousedown
    var m0, o0;
    function mouseDown() {
        m0 = [d3.event.pageX, d3.event.pageY];
        o0 = projection.rotate();
        d3.event.preventDefault();
    }

    // window mousemove
    function touchMove() {
        if (m0) {
            // limit vertical rotation between 55 & -55
            var m1 = [d3.event.touches[0].pageX, d3.event.touches[0].pageY],
            o1 = [o0[0] + (m1[0] - m0[0]) / 6, o0[1] + (m0[1] - m1[1]) / 6];
            if (o1[1] > 55) {
                o1[1] = 55;
            }
            if (o1[1] < -55) {
                o1[1] = -55;
            }
            projection.rotate(o1);
            reDraw();
        }
    }

    // window mouseup
    function touchUp() {
        if (m0) {
            m0 = null;
        }
    }

    function touchDown() {
        m0 = [d3.event.touches[0].pageX, d3.event.touches[0].pageY];
        o0 = projection.rotate();
        d3.event.preventDefault();
    }

    function reDraw() {
        //map
        svg.selectAll("path").attr("d", path);

        //points
        svg.selectAll("circle")
          .data(mapInfo)
          .attr("cx", d=> projection([d.lon, d.lat])[0])
          .attr("cy", d=> projection([d.lon, d.lat])[1]);

        // var china_lon = mapInfo[2].lon,
        // 		china_lat = mapInfo[2].lat,
        //     seoul_lon = mapInfo[0].lon,
        //     seoul_lat = mapInfo[0].lat;
        //
        // var china_point = projection([china_lon, china_lat]),
        // 		seoul_point = projection([seoul_lon, seoul_lat]);

        // console.log("Cihna: ", china_point);
    }
