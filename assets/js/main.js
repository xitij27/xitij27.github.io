/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add
    if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalClose = document.querySelectorAll('.services__modal-close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i)
    })
})

modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active-modal')
        })
    })
})

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l => l.addEventListener('click', activeWork))


/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }
        else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }

        /*document.querySelector('.nav__menu a[href*=' + 'contact' + ']').classList.add('active-link')*/

    })
}
window.addEventListener('scroll', scrollActive)

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home__data`)
sr.reveal(`.home__handle`, { delay: 700 })
sr.reveal(`.home__social, .home__scroll`, { delay: 900, origin: 'bottom' })


/*=============== GLOBE ===============*/
var root = am5.Root.new("chartdiv");
root._logo.dispose();
// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
    am5themes_Animated.new(root)
]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    wheelY: 'none',
    projection: am5map.geoOrthographic(),
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    maxZoomLevel: 5,
    pinchZoom: false,
    maxPanOut: 0
}));

chart.set("zoomControl", am5map.ZoomControl.new(root, {
    y: am5.p0,
    centerY: am5.p0
  }));

var cont = chart.children.push(am5.Container.new(root, {
    layout: root.horizontalLayout,
    x: 20,
    y: 40
}));

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
    fill: am5.color(0xd4f1f9),//root.interfaceColors.get("alternativeBackground"),
    //fillOpacity: 0,
    strokeOpacity: 0
});

// Add background polygon
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
backgroundSeries.data.push({
    geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
}));

// This function helps to precenter the globe to a country
function selectCountry(id) {
    var dataItem = polygonSeries.getDataItemById(id);
    var target = dataItem.get("mapPolygon");
    if (target) {
        var centroid = target.geoCentroid();
        if (centroid) {
            chart.animate({ key: "rotationX", to: -centroid.longitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
            chart.animate({ key: "rotationY", to: -centroid.latitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
        }
    }
}
polygonSeries.events.on("datavalidated", function () {
    selectCountry("IN");
});

// Create point series for markers
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var planePathSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
var livedSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
var visitedSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

planePathSeries.bullets.push(function () {
    var circle = am5.Circle.new(root, {
        radius: 3,
        tooltipText: '',
        cursorOverStyle: "pointer",
        tooltipY: 0,
        fill: am5.color(0xffba00),
        //stroke: root.interfaceColors.get("background"),
        strokeWidth: 0,
        draggable: false
    });

    return am5.Bullet.new(root, {
        sprite: circle
    });
});

livedSeries.bullets.push(function () {
    var circle = am5.Circle.new(root, {
        radius: 5,
        tooltipText: '{title}',
        cursorOverStyle: "pointer",
        tooltipY: 0,
        fill: am5.color(0x993399),
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 0,
        draggable: false
    });

    return am5.Bullet.new(root, {
        sprite: circle
    });
});

visitedSeries.bullets.push(function () {
    var circle = am5.Circle.new(root, {
        radius: 3,
        tooltipText: '{title}',
        cursorOverStyle: "pointer",
        tooltipY: 0,
        fill: am5.color(0xffba00),
        //stroke: root.interfaceColors.get("background"),
        strokeWidth: 0,
        draggable: false
    });

    return am5.Bullet.new(root, {
        sprite: circle
    });
});

var visitedCities = [
    {
        title: "Kathmandu",
        latitude: 27.7172,
        longitude: 85.3240,
    },
    {
        title: "Hyderabad",
        latitude: 17.3850,
        longitude: 78.4867,
    },
    {
        title: "Ahmedabad",
        latitude: 23.0225,
        longitude: 72.5714,
    },
    {
        title: "Mumbai",
        latitude: 19.0760,
        longitude: 72.8777,
    },
    {
        title: "Dubai",
        latitude: 25.2048,
        longitude: 55.2708,
    },
    {
        title: "Muscat",
        latitude: 22.8351,
        longitude: 59.2506
    }
]

var livedCities = [
    {
        title: "New Delhi",
        latitude: 28.6139,
        longitude: 77.2090,
    },
    {
        title: "Sharjah",
        latitude: 25.3462,
        longitude: 55.4211,
    },
    {
        title: "Bengaluru",
        latitude: 12.9716,
        longitude: 77.5946,
    },
    {
        title: "Doha",
        latitude: 25.2854,
        longitude: 51.5310,
    },
    {
        title: "Singapore",
        latitude: 1.3521,
        longitude: 103.8198,
    },
]

for (var i = 0; i < livedCities.length; i++) {
    var city = livedCities[i];
    var visitedcity = visitedCities[i];
    addLivedCity(city.longitude, city.latitude, city.title);
}

for (var i = 0; i < visitedCities.length; i++) {
    var visitedcity = visitedCities[i];
    addVisitedCity(visitedCities[i].longitude, visitedCities[i].latitude, visitedCities[i].title);
}

// Create line series for trajectory lines
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
lineSeries.mapLines.template.setAll({
    stroke: root.interfaceColors.get("alternativeBackground"),
    strokeOpacity: 0.3
});

lineSeries.data.setAll([{
    "geometry": {
        "type": "LineString",
        "coordinates": [
            [77.2090, 28.6139],
            [55.4211, 25.3462],
            [77.5946, 12.9716],
            [51.5310, 25.2854],
            [103.8198, 1.3521]
        ]
    }
}]);

lineSeries.mapLines.template.setAll({
    stroke: am5.color(0xff0000),
    strokeWidth: 1,
    strokeOpacity: 0.5
});



var newdelhi = addPlanePathCity({ latitude: 28.6139, longitude: 77.2090 }, "New Delhi");
var sharjah = addPlanePathCity({ latitude: 25.3462, longitude: 55.4211 }, "Sharjah");
var bengaluru = addPlanePathCity({ latitude: 12.9716, longitude: 77.5946 }, "Bengaluru");
var doha = addPlanePathCity({ latitude: 25.2854, longitude: 51.5310 }, "Doha");
var sg = addPlanePathCity({ latitude: 1.3521, longitude: 103.8198 }, "Singapore");

var lineDataItem = lineSeries.pushDataItem({
    pointsToConnect: [newdelhi, sharjah, bengaluru, doha, sg]
});
var planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

var plane = am5.Graphics.new(root, {
    svgPath:
        "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
    scale: 0.06,
    centerY: am5.p50,
    centerX: am5.p50,
    fill: am5.color(0x000000)
});

planeSeries.bullets.push(function () {
    var container = am5.Container.new(root, {});
    container.children.push(plane);
    return am5.Bullet.new(root, { sprite: container });
});


var planeDataItem = planeSeries.pushDataItem({
    lineDataItem: lineDataItem,
    positionOnLine: 0,
    autoRotate: true
});
planeDataItem.dataContext = {};

planeDataItem.animate({
    key: "positionOnLine",
    to: 1,
    duration: 10000,
    loops: Infinity,
    easing: am5.ease.linear
});

function addPlanePathCity(coords, title) {
    return planePathSeries.pushDataItem({
        latitude: coords.latitude,
        longitude: coords.longitude,
        title: coords.title
    });
}

function addLivedCity(longitude, latitude, title) {
    livedSeries.data.push({
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title
    });
}

function addVisitedCity(longitude, latitude, title) {
    visitedSeries.data.push({
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title
    });
}

// Make stuff animate on load
chart.appear(1000, 100);