import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface LeafletMapProps {
  route: 'mens-hostel' | 'academic-buildings';
}

export function LeafletMap({ route }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const animationStateRef = useRef({ idx: 0, paused: false });
  const tileLayerRef = useRef<any>(null);
  const routeLineRef = useRef<any>(null);
  const checkpointMarkersRef = useRef<any[]>([]);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Initialize map only once
  useEffect(() => {
    if (!mapRef.current) return;

    // Dynamically load Leaflet
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Load Leaflet script
      if (!(window as any).L) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      const L = (window as any).L;

      // Academic section route points
      const academicSectionRoute = [
        [12.968527, 79.156153],
        [12.968488, 79.156046],
        [12.968465, 79.155919],
        [12.968473, 79.155820],
        [12.968531, 79.155705],
        [12.968604, 79.155613],
        [12.968686, 79.155522],
        [12.968759, 79.155486],
        [12.968809, 79.155506],
        [12.968806, 79.155573],
        [12.968790, 79.155736],
        [12.968802, 79.155907],
        [12.968802, 79.156122],
        [12.968782, 79.156296],
        [12.968786, 79.156459],
        [12.968806, 79.156630],
        [12.968806, 79.156805],
        [12.968821, 79.156996],
        [12.968829, 79.157123],
        [12.968824, 79.157198],
        [12.968793, 79.157312],
        [12.968764, 79.157432],
        [12.968756, 79.157555],
        [12.968742, 79.157746],
        [12.968727, 79.157901],
        [12.968730, 79.158080],
        [12.968719, 79.158259],
        [12.968716, 79.158402],
        [12.968716, 79.158552],
        [12.968707, 79.158614],
        [12.968736, 79.158657],
        [12.968902, 79.158657],
        [12.969256, 79.158652],
        [12.969525, 79.158663],
        [12.969785, 79.158663],
        [12.970136, 79.158685],
        [12.970492, 79.158687],
        [12.970580544159738, 79.158687041678],
        [12.970910712904658, 79.15869515697466],
        [12.970985841057914, 79.15870327227123],
        [12.971003634564568, 79.1587276181609],
        [12.971023405126033, 79.1587945693575],
        [12.97102538218208, 79.15890412586103],
        [12.971064923299977, 79.15905223002322],
        [12.971062946244237, 79.15905831649563],
        [12.971104464411589, 79.15924496831649],
        [12.971149936686391, 79.15963653138905],
        [12.971205294221958, 79.15996722972379],
        [12.97124954623277, 79.16034897587701],
        [12.971321678437329, 79.16072443271796],
        [12.971392192930605, 79.16121240542401],
        [12.971466323533912, 79.16148329523472],
        [12.97150248479399, 79.16162245094937],
        [12.971544070236577, 79.16182840140705],
        [12.97160916048058, 79.16210671283633],
        [12.971639897538829, 79.16237760264183],
        [12.97174295704426, 79.16292309304325],
        [12.971796504473003, 79.16329309031313],
        [12.971886907493339, 79.16376250892387],
        [12.971871954810657, 79.16372921017162],
        [12.971947753840665, 79.16413288263473],
        [12.972075828009352, 79.16470821645704],
        [12.972154240735879, 79.16504483369667],
        [12.972265630836871, 79.1654806028044],
        [12.972370181053854, 79.1658923218898],
        [12.97249694812833, 79.16640328269703],
        [12.97256098508281, 79.16663931710269],
        [12.972694286438896, 79.16714625460315],
        [12.97274525458545, 79.16734473806633],
        [12.972757016463932, 79.16743593317103],
        [12.972746561460863, 79.1674949417682],
        [12.972678603930172, 79.16748153072339],
        [12.972645932033798, 79.16744800311137],
        [12.972608032628637, 79.16729243499158],
        [12.97258973636201, 79.16721062761825],
        [12.972528313171336, 79.16697056991616],
        [12.9724485936885, 79.1666446815273],
        [12.9723584191571, 79.16633354527174],
        [12.972268244596618, 79.16595133049468],
        [12.972212048835395, 79.16572334272034],
        [12.972133636129822, 79.16540684206284],
        [12.97203039269415, 79.16501255733307],
        [12.971916694177459, 79.16452037197725],
        [12.971838281378785, 79.16414352161812],
        [12.971765096074495, 79.16380153996364],
        [12.971680148819754, 79.16324364049113],
        [12.971595201535736, 79.16269512874412],
        [12.971480195939822, 79.16206749183665],
        [12.971414851827962, 79.16170807583576],
        [12.971434455063195, 79.16158201200955],
        [12.971452751414793, 79.16153373224823],
        [12.971403089887318, 79.16117565733875],
        [12.971328597575328, 79.16078941924823],
        [12.971282856668447, 79.1604581664226],
        [12.971161316507471, 79.15974738103245],
        [12.971105120500264, 79.15938394171812],
        [12.971080289702327, 79.15909962756817],
        [12.971003183523353, 79.15871204835791],
        [12.970626800475374, 79.1586999784162],
        [12.970285135652606, 79.15867496565716],
        [12.969943103689083, 79.15868105212789],
        [12.969558873199702, 79.15864891320523],
        [12.969036115786706, 79.15865427762314],
        [12.968594384900596, 79.1586381843687],
        [12.968306867344756, 79.15862745553285],
        [12.968254591389817, 79.1589546850262],
        [12.968257205187824, 79.15940261392284],
        [12.968267660379587, 79.15973520783409],
        [12.968267660379587, 79.15937310962424],
        [12.968285956964092, 79.15887958317526],
        [12.968296412154647, 79.15863550215973],
        [12.968719847002646, 79.15864354878663],
        [12.968740709553353, 79.15795148977473],
        [12.968748550932418, 79.15761621363738],
        [12.968816509536774, 79.15716292032285],
        [12.968795599198959, 79.15674986014271],
        [12.968777302653828, 79.15649236805132],
        [12.968685819898448, 79.15639312631974],
        [12.968600185462881, 79.15628979234391],
        [12.968527, 79.156153]
      ];

      // Academic Buildings checkpoints
      const academicCheckpoints = [
        [12.968527, 79.156153],
        [12.969696130604772, 79.15866031731305],
        [12.971104464411589, 79.15924496831649],
        [12.971859584332732, 79.16363129327243],
        [12.972715307191246, 79.16750311815714],
        [12.972378520271823, 79.16635546252402],
        [12.971595201535736, 79.16269512874412],
        [12.971328597575328, 79.16078941924823],
        [12.968267660379587, 79.15973520783409]
      ];

      // Men's Hostel route points
      const mensHostelRoute = [
        [12.968527, 79.156153],
        [12.968488, 79.156046],
        [12.968465, 79.155919],
        [12.968473, 79.155820],
        [12.968531, 79.155705],
        [12.968604, 79.155613],
        [12.968686, 79.155522],
        [12.968759, 79.155486],
        [12.968809, 79.155506],
        [12.968806, 79.155573],
        [12.968790, 79.155736],
        [12.968802, 79.155907],
        [12.968802, 79.156122],
        [12.968782, 79.156296],
        [12.968786, 79.156459],
        [12.968806, 79.156630],
        [12.968806, 79.156805],
        [12.968821, 79.156996],
        [12.968829, 79.157123],
        [12.968824, 79.157198],
        [12.968793, 79.157312],
        [12.968764, 79.157432],
        [12.968756, 79.157555],
        [12.968742, 79.157746],
        [12.968727, 79.157901],
        [12.968730, 79.158080],
        [12.968719, 79.158259],
        [12.968716, 79.158402],
        [12.968716, 79.158552],
        [12.968707, 79.158614],
        [12.968736, 79.158657],
        [12.968902, 79.158657],
        [12.969256, 79.158652],
        [12.969525, 79.158663],
        [12.969696130604772, 79.15866031731305], // checkpoint
        [12.969722237034084, 79.15824187495518],
        [12.969664733810175, 79.1581131289288],
        [12.969735305946742, 79.15807289579557],
        [12.969808491845006, 79.15814799764428],
        [12.970409332248218, 79.15818169305274],
        [12.970744765161863, 79.1582548388259],
        [12.970992146665578, 79.15833228730371],
        [12.97159173128008, 79.15826774691264],
        [12.971918776826419, 79.15819890382669],
        [12.971964898606146, 79.15764815915145],
        [12.971972642179976, 79.15770037324627], // checkpoint
        [12.97207188496321, 79.15703274364088],
        [12.972769881022986, 79.15704266832996],
        [12.972751307264195, 79.15804015393579],
        [12.972646055938158, 79.15866914167451],
        [12.972590334629867, 79.15936801693974],
        [12.97258414337262, 79.1595268522273],
        [12.97254080456759, 79.16039091619157],
        [12.972553187077313, 79.16089283582534],
        [12.972577952108454, 79.16102625746687],
        [12.97262129090702, 79.16122321322344],
        [12.972677012208376, 79.16173783955512],
        [12.972788454773623, 79.16226517270978],
        [12.972800837277786, 79.16239224093984],
        [12.972875132289841, 79.16294498774052],
        [12.972906088538318, 79.16303393550155],
        [12.972943236031396, 79.16334525266514],
        [12.9729741922714, 79.1634913811297],
        [12.973029913493688, 79.16377728464728],
        [12.973067060968278, 79.16399330063837],
        [12.973116590925764, 79.16414578251441],
        [12.973540840908644, 79.16414917384421],
        [12.973816727853153, 79.16416224063957],
        [12.973888882849693, 79.16414917384421],
        [12.973931326955531, 79.164166596238],
        [12.97423692430367, 79.16418401863181],
        [12.974478855271284, 79.16416224063957],
        [12.974542521276287, 79.16413610704888],
        [12.974406700445924, 79.1640838398675],
        [12.97429634596664, 79.1640838398675],
        [12.974122325342128, 79.1640751286706],
        [12.97387614961654, 79.16405770627681],
        [12.973566307408648, 79.16404463948147],
        [12.973464441392979, 79.16403592828458],
        [12.9730955620724, 79.16403186153342],
        [12.97301994946997, 79.16374536396688],
        [12.973002500410441, 79.16365583348856],
        [12.972903622383278, 79.16310074452296],
        [12.972368517083709, 79.16310074452296],
        [12.972223107835987, 79.1630410575374],
        [12.972182393231387, 79.16286199658076],
        [12.972182393231387, 79.162670998227],
        [12.972130045872829, 79.1621696275484],
        [12.972036983874851, 79.16145935242037],
        [12.972031167498821, 79.16105348091862],
        [12.972356884347006, 79.16102363742586],
        [12.972572089887702, 79.16097588783742],
        [12.972554640796446, 79.16036111176493],
        [12.972595355340106, 79.15946580698169],
        [12.972665151685167, 79.15882118753777],
        [12.972734948010624, 79.15845112822737],
        [12.972769846170557, 79.15704848397675],
        [12.972077698507492, 79.15703654657965],
        [12.972042800254991, 79.15757969814814],
        [12.971972642179976, 79.15770037324627],
        [12.971945943052237, 79.15818104928218],
        [12.971459783359066, 79.1582722443842],
        [12.970984077763395, 79.15834198182547],
        [12.970623377332384, 79.15820787138132],
        [12.969802651214362, 79.15814349836813],
        [12.96971901018405, 79.15823469347015],
        [12.969698099922084, 79.15864238922033], //checkpoint
        [12.96920670823883, 79.15864775363944],
        [12.968715304194042, 79.15863706935367],
        [12.96875712488143, 79.15793969504413],
        [12.968819855898861, 79.15716721882595],
        [12.968793717976665, 79.15646984451642],
        [12.968626435209528, 79.15634109849003],
        [12.968527, 79.156153]
      ];

      // Men's Hostel checkpoints
      const mensHostelCheckpoints = [
        [12.968527, 79.156153],
        [12.969696130604772, 79.15866031731305],
        [12.971972642179976, 79.15770037324627],
        [12.972769846170557, 79.15704848397675],
        [12.972751307264195, 79.15804015393579],
        [12.97258414337262, 79.1595268522273],
        [12.97262129090702, 79.16122321322344],
        [12.972875132289841, 79.16294498774052],
        [12.973029913493688, 79.16377728464728],
        [12.973931326955531, 79.164166596238],
        [12.974478855271284, 79.16416224063957],
        [12.97387614961654, 79.16405770627681],
        [12.973464441392979, 79.16403592828458]
      ];

      // Choose route and settings based on route type
      const isAcademic = route === 'academic-buildings';
      const routeCoords = isAcademic ? academicSectionRoute : mensHostelRoute;
      const checkpoints = isAcademic ? academicCheckpoints : mensHostelCheckpoints;
      const mapCenter = isAcademic ? [12.9695, 79.1595] : [12.9726, 79.1610];
      const mapZoom = isAcademic ? 16 : 17;
      const moveInterval = isAcademic ? 100 : 500;

      // Helper function to calculate distance in meters between two lat,lng points
      function getDistance(latlng1: number[], latlng2: number[]) {
        const R = 6371000; // Earth radius in meters
        const toRad = (angle: number) => (angle * Math.PI) / 180;
        const dLat = toRad(latlng2[0] - latlng1[0]);
        const dLon = toRad(latlng2[1] - latlng1[1]);
        const lat1 = toRad(latlng1[0]);
        const lat2 = toRad(latlng2[0]);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }

      // Clean up existing map only on route change
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Initialize map
      const map = L.map(mapRef.current).setView(mapCenter, mapZoom);
      mapInstanceRef.current = map;

      // Add initial tile layer
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      });
      tileLayerRef.current = tileLayer;
      tileLayer.addTo(map);

      // Draw route
      const routeLine = L.polyline(routeCoords, {
        color: '#0891b2',
        weight: 4,
        opacity: 0.8
      });
      routeLineRef.current = routeLine;
      routeLine.addTo(map);

      // Draw checkpoints
      const checkpointMarkers = checkpoints.map((point, index) => {
        const marker = L.circleMarker(point, {
          radius: 6,
          color: '#dc2626',
          fillColor: '#dc2626',
          fillOpacity: 1,
          weight: 2
        }).addTo(map).bindPopup(`Checkpoint ${index + 1}`);
        return marker;
      });
      checkpointMarkersRef.current = checkpointMarkers;

      // Add pulse animation CSS
      if (!document.getElementById('shuttle-animation')) {
        const style = document.createElement('style');
        style.id = 'shuttle-animation';
        style.textContent = `
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // Create initial shuttle marker
      const createShuttleIcon = (routeColor: string) => {
        return L.divIcon({
          className: 'shuttle-marker',
          html: `<div style="
            width: 20px;
            height: 20px;
            background: ${routeColor};
            border-radius: 50%;
            border: 3px solid #ffffff;
            box-shadow: 0 0 15px ${routeColor};
            position: relative;
          ">
            <div style="
              position: absolute;
              top: -2px;
              left: -2px;
              width: 24px;
              height: 24px;
              border: 2px solid ${routeColor};
              border-radius: 50%;
              animation: pulse 2s infinite;
            "></div>
          </div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
      };

      // Initialize marker
      const shuttleTitle = isAcademic ? 'Academic Shuttle' : 'Men\'s Hostel Shuttle';
      const marker = L.marker(routeCoords[0], { 
        icon: createShuttleIcon('#0891b2'),
        title: shuttleTitle
      }).addTo(map).bindPopup(`${shuttleTitle} - Live Tracking`);
      markerRef.current = marker;

      // Reset animation state for new route
      animationStateRef.current = { idx: 0, paused: false };

      // Animate marker with pause at checkpoints
      function moveShuttle() {
        if (animationStateRef.current.paused) return;

        animationStateRef.current.idx = (animationStateRef.current.idx + 1) % routeCoords.length;
        const currentPos = routeCoords[animationStateRef.current.idx];
        marker.setLatLng(currentPos);

        // Check if currentPos is close to any checkpoint (within 10 meters)
        let atCheckpoint = checkpoints.some(cp => getDistance(cp, currentPos) < 10);

        if (atCheckpoint) {
          animationStateRef.current.paused = true;
          setTimeout(() => (animationStateRef.current.paused = false), 2500); // 2.5-second pause at checkpoint
        } else {
          animationStateRef.current.paused = true;
          setTimeout(() => (animationStateRef.current.paused = false), 500); // 0.5-second pause otherwise
        }
      }

      intervalRef.current = setInterval(moveShuttle, moveInterval);
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [route]); // Only depend on route, not theme

  // Handle theme changes without restarting animation
  useEffect(() => {
    if (!mapInstanceRef.current || !(window as any).L) return;

    const L = (window as any).L;

    // Update tile layer based on theme
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newTileLayer = isDark
      ? L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors, © CARTO'
        })
      : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        });

    tileLayerRef.current = newTileLayer;
    newTileLayer.addTo(mapInstanceRef.current);

    // Update route colors
    const routeColor = isDark ? '#2af6f7' : '#0891b2';
    if (routeLineRef.current) {
      routeLineRef.current.setStyle({ color: routeColor });
    }

    // Update checkpoint colors
    const checkpointColor = isDark ? '#ff6b6b' : '#dc2626';
    checkpointMarkersRef.current.forEach(marker => {
      marker.setStyle({
        color: checkpointColor,
        fillColor: checkpointColor
      });
    });

    // Update shuttle marker
    if (markerRef.current) {
      const isAcademic = route === 'academic-buildings';
      const shuttleTitle = isAcademic ? 'Academic Shuttle' : 'Men\'s Hostel Shuttle';
      
      const newShuttleIcon = L.divIcon({
        className: 'shuttle-marker',
        html: `<div style="
          width: 20px;
          height: 20px;
          background: ${routeColor};
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 15px ${routeColor};
          position: relative;
        ">
          <div style="
            position: absolute;
            top: -2px;
            left: -2px;
            width: 24px;
            height: 24px;
            border: 2px solid ${routeColor};
            border-radius: 50%;
            animation: pulse 2s infinite;
          "></div>
        </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      markerRef.current.setIcon(newShuttleIcon);
    }
  }, [isDark, route]);

  const borderColor = isDark ? '#2af6f7' : '#0891b2';
  const bgColor = isDark ? 'rgba(2, 5, 13, 0.8)' : 'rgba(247, 248, 250, 0.9)';
  const routeTitle = route === 'mens-hostel' ? "Men's Hostel" : "Academic Buildings";

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <div
        className="relative rounded-2xl p-4 backdrop-blur-sm"
        style={{
          backgroundColor: bgColor,
          border: `2px solid ${borderColor}60`,
          boxShadow: isDark 
            ? `0 0 30px ${borderColor}40, inset 0 0 20px rgba(42, 246, 247, 0.1)`
            : `0 8px 32px rgba(0, 205, 238, 0.2), inset 0 0 20px rgba(144, 225, 249, 0.1)`,
        }}
      >
        <div
          className="text-center mb-4"
          style={{
            color: isDark ? '#ffffff' : '#1e293b',
            fontSize: '1.25rem',
            fontWeight: '600',
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          {routeTitle} - Live Shuttle Tracking
        </div>
        
        <div
          ref={mapRef}
          className="w-full rounded-xl overflow-hidden"
          style={{
            height: '70vh',
            minHeight: '500px',
            border: `1px solid ${borderColor}30`,
          }}
        />
        
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: isDark ? '#2af6f7' : '#0891b2' }}
            />
            <span style={{ color: isDark ? '#ffffff90' : '#64748b' }}>
              Shuttle Route
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: isDark ? '#ff6b6b' : '#dc2626' }}
            />
            <span style={{ color: isDark ? '#ffffff90' : '#64748b' }}>
              Checkpoints
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}