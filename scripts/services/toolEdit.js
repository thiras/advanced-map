app.service("$toolEdit", function ($http, $rootScope) {

    this.data = {
        activeType:false,
        activeButton:false,
        lastActive:false,
        type:{
            Polygon:{
                icons:{
                    polygon:{img:"img/icons/polygonEdit.svg",function:"drawPolygon",label:$rootScope.lang.toolEdit.draw.polygon,active:false},
                    polyRectangle:{img:"img/icons/rectangle.svg",function:"drawPolyRectangle",label:$rootScope.lang.toolEdit.draw.polyRectangle,active:false},
                    polyCircile:{img:"img/icons/circle.svg",function:"drawPolyCircile",label:$rootScope.lang.toolEdit.draw.polyCircile,active:false},
                    polyEllips:{img:"img/icons/ellips.svg",function:"drawPolyellips",label:$rootScope.lang.toolEdit.draw.polyEllips,active:false},
                    polyArc:{img:"img/icons/arc.svg",function:"drawPolyArc",label:$rootScope.lang.toolEdit.draw.polyArc,active:false},
                    polyLineBezier:{img:"img/icons/lineBezier.svg",function:"drawPolyBezier",label:$rootScope.lang.toolEdit.draw.polyLineBezier,active:false},
                    polyEdit:{img:"img/icons/editf.svg",function:"polyEdit",label:$rootScope.lang.toolEdit.draw.edit,active:false},
                    polyRemove:{img:"img/icons/delete.svg",function:"polyRemove",label:$rootScope.lang.toolEdit.draw.delete,active:false}
                }
            },
            Linestring:{
                icons: {
                    line: {img: "img/icons/line.svg", function: "drawLine",label:$rootScope.lang.toolEdit.draw.line,active:false},
                    lineRectangle: {img: "img/icons/lineRectangle.svg", function: "drawLineRectangle",label:$rootScope.lang.toolEdit.draw.lineRectangle,active:false},
                    lineCircle: {img: "img/icons/lineCircle.svg", function: "drawLineCircle",label:$rootScope.lang.toolEdit.draw.lineCircle,active:false},
                    lineArc: {img: "img/icons/arc.svg", function: "drawLineArc",label:$rootScope.lang.toolEdit.draw.lineArc,active:false},
                    lineBezier: {img: "img/icons/lineBezier.svg", function: "drawLineBezier",label:$rootScope.lang.toolEdit.draw.lineBezier,active:false},
                    lineEdit:{img:"img/icons/editf.svg",function:"lineEdit",label:$rootScope.lang.toolEdit.draw.edit,active:false},
                    lineRemove:{img:"img/icons/delete.svg",function:"lineRemove",label:$rootScope.lang.toolEdit.draw.delete,active:false}
                }
            },
            Point:{
               icons:{
                   point:{img: "img/icons/point2.svg", function: "drawPoint",label:$rootScope.lang.toolEdit.draw.point,active:false},
                   marker:{img: "img/icons/marker.svg", function: "drawMarker",label:$rootScope.lang.toolEdit.draw.marker,active:false},
                   pointEdit:{img:"img/icons/editf.svg",function:"pointEdit",label:$rootScope.lang.toolEdit.draw.edit,active:false},
                   pointRemove:{img:"img/icons/delete.svg",function:"pointRemove",label:$rootScope.lang.toolEdit.draw.delete,active:false}
               }
            }
        }
    };
    return this.data;
});