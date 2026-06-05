import * as THREE from 'three'

/**
 * Complete galaxy dataset for the WebGPU spiral galaxy renderer.
 * Each entry defines everything needed to build a SpriteNodeMaterial galaxy.
 *
 * Fields:
 *  name         – display name
 *  type         – 'spiral' | 'elliptical' | 'irregular' | 'lenticular' | 'dwarf'
 *  arms         – number of spiral arms (ignored for non-spirals)
 *  count        – particle count
 *  radius       – galaxy radius multiplier
 *  scaleMin/Max – sprite size range
 *  colorInside  – hex string, core colour
 *  colorOutside – hex string, outer arm colour
 *  randomMul    – scatter strength (higher = more irregular/messy)
 *  position     – THREE.Vector3 in scene units
 *  rotation     – THREE.Euler in radians
 *  distance     – real-world distance label
 *  stars        – real-world star count label
 *  description  – short description
 */

export const GALAXY_DEFINITIONS = [

  // ── OUR GALAXY ─────────────────────────────────────────────────────────────
  {
    key: 'milkyWay', name: 'Milky Way', type: 'spiral',
    arms: 4, count: 4000, radius: 5.0, scaleMin: 0.001, scaleMax: 0.08,
    colorInside: '#ffa575', colorOutside: '#6a1599', randomMul: 1.0,
    position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0),
    distance: '0 ly (home)', stars: '200–400 billion',
    description: 'Our barred spiral home galaxy',
  },

  // ── LOCAL GROUP ────────────────────────────────────────────────────────────
  {
    key: 'andromeda', name: 'Andromeda (M31)', type: 'spiral',
    arms: 2, count: 3000, radius: 4.5, scaleMin: 0.001, scaleMax: 0.07,
    colorInside: '#b0c4ff', colorOutside: '#1a0050', randomMul: 1.0,
    position: new THREE.Vector3(22, 2, -8),
    rotation: new THREE.Euler(Math.PI * 0.18, Math.PI * 0.05, 0),
    distance: '2.537 million ly', stars: '~1 trillion',
    description: 'Nearest large spiral; will merge with Milky Way in ~4.5 Gyr',
  },
  {
    key: 'triangulum', name: 'Triangulum (M33)', type: 'spiral',
    arms: 3, count: 2000, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffe0a0', colorOutside: '#664400', randomMul: 1.0,
    position: new THREE.Vector3(14, -3, 12), rotation: new THREE.Euler(0.3, 0.8, 0.1),
    distance: '2.73 million ly', stars: '~40 billion',
    description: 'Third-largest galaxy in the Local Group',
  },
  {
    key: 'largeMagellanicCloud', name: 'Large Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1500, radius: 2.2, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffcce0', colorOutside: '#880055', randomMul: 1.5,
    position: new THREE.Vector3(-8, -5, 6), rotation: new THREE.Euler(0.2, 0.4, 0.1),
    distance: '163,000 ly', stars: '~30 billion',
    description: 'Satellite of Milky Way; contains the Tarantula Nebula',
  },
  {
    key: 'smallMagellanicCloud', name: 'Small Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1000, radius: 1.4, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#c0ffe0', colorOutside: '#006644', randomMul: 1.8,
    position: new THREE.Vector3(-11, -4, 9), rotation: new THREE.Euler(0.1, 0.2, 0.3),
    distance: '200,000 ly', stars: '~3 billion',
    description: 'Satellite of Milky Way; interacts with LMC',
  },
  {
    key: 'sagittariusDwarf', name: 'Sagittarius Dwarf Elliptical', type: 'dwarf',
    arms: 1, count: 600, radius: 1.0, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffddaa', colorOutside: '#885500', randomMul: 2.5,
    position: new THREE.Vector3(3, -2, -6), rotation: new THREE.Euler(0.5, 1.0, 0.2),
    distance: '70,000 ly', stars: '~1 billion',
    description: 'Being absorbed by the Milky Way',
  },
  {
    key: 'canisMajorDwarf', name: 'Canis Major Dwarf', type: 'dwarf',
    arms: 1, count: 500, radius: 0.9, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffeecc', colorOutside: '#664400', randomMul: 2.8,
    position: new THREE.Vector3(5, -6, 2), rotation: new THREE.Euler(0.3, 0.5, 0.1),
    distance: '25,000 ly', stars: '~1 billion',
    description: 'Closest known galaxy; partially merged with Milky Way',
  },
  {
    key: 'sculptorDwarf', name: 'Sculptor Dwarf', type: 'dwarf',
    arms: 1, count: 400, radius: 0.8, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ddccff', colorOutside: '#330066', randomMul: 3.0,
    position: new THREE.Vector3(-16, -8, -5), rotation: new THREE.Euler(0.1, 0.3, 0.2),
    distance: '290,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite of Milky Way',
  },
  {
    key: 'fornaxDwarf', name: 'Fornax Dwarf', type: 'dwarf',
    arms: 1, count: 450, radius: 0.85, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffe8cc', colorOutside: '#553300', randomMul: 2.8,
    position: new THREE.Vector3(-18, 3, -12), rotation: new THREE.Euler(0.2, 0.7, 0.0),
    distance: '460,000 ly', stars: '~tens of millions',
    description: 'Dwarf spheroidal; contains 6 globular clusters',
  },
  {
    key: 'leo1', name: 'Leo I Dwarf', type: 'dwarf',
    arms: 1, count: 350, radius: 0.7, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddbb', colorOutside: '#442200', randomMul: 3.2,
    position: new THREE.Vector3(20, 6, -18), rotation: new THREE.Euler(0.0, 0.4, 0.1),
    distance: '820,000 ly', stars: '~5 million',
    description: 'One of the most distant Local Group dwarfs',
  },
  {
    key: 'leo2', name: 'Leo II Dwarf', type: 'dwarf',
    arms: 1, count: 300, radius: 0.6, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddcc', colorOutside: '#553322', randomMul: 3.0,
    position: new THREE.Vector3(22, 5, -20), rotation: new THREE.Euler(0.1, 0.5, 0.0),
    distance: '701,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite in Leo',
  },
  {
    key: 'ic10', name: 'IC 10', type: 'irregular',
    arms: 1, count: 700, radius: 1.1, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#aaffcc', colorOutside: '#004422', randomMul: 2.0,
    position: new THREE.Vector3(-20, 4, -14), rotation: new THREE.Euler(0.4, 0.6, 0.2),
    distance: '2.2 million ly', stars: '~few hundred million',
    description: 'Only known starburst galaxy in the Local Group',
  },

  // ── NEARBY UNIVERSE (5–500 Mly) ────────────────────────────────────────────
  {
    key: 'whirlpool', name: 'Whirlpool (M51)', type: 'spiral',
    arms: 2, count: 2500, radius: 3.8, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#88aaff', colorOutside: '#220066', randomMul: 1.0,
    position: new THREE.Vector3(38, 8, -20), rotation: new THREE.Euler(0.1, 0.3, 0.0),
    distance: '23 million ly', stars: '~100 billion',
    description: 'Grand-design spiral interacting with NGC 5195',
  },
  {
    key: 'sombrero', name: 'Sombrero (M104)', type: 'lenticular',
    arms: 1, count: 2000, radius: 3.2, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#fff5cc', colorOutside: '#443300', randomMul: 0.6,
    position: new THREE.Vector3(-35, -10, 18),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.2, 0.1),
    distance: '31 million ly', stars: '~800 billion',
    description: 'Lenticular with prominent dust lane and bright nucleus',
  },
  {
    key: 'pinwheel', name: 'Pinwheel (M101)', type: 'spiral',
    arms: 5, count: 2800, radius: 4.2, scaleMin: 0.001, scaleMax: 0.065,
    colorInside: '#aaddff', colorOutside: '#002255', randomMul: 1.1,
    position: new THREE.Vector3(32, -5, 25), rotation: new THREE.Euler(0.05, 0.2, 0.0),
    distance: '21 million ly', stars: '~1 trillion',
    description: 'Face-on grand spiral in Ursa Major',
  },
  {
    key: 'cigar', name: 'Cigar (M82)', type: 'irregular',
    arms: 1, count: 1800, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa44', colorOutside: '#441100', randomMul: 0.4,
    position: new THREE.Vector3(30, 7, 22),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.3, 0.1),
    distance: '12 million ly', stars: '~30 billion',
    description: 'Edge-on starburst galaxy; companion to M81',
  },
  {
    key: 'bodesGalaxy', name: "Bode's Galaxy (M81)", type: 'spiral',
    arms: 2, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffddaa', colorOutside: '#553300', randomMul: 0.9,
    position: new THREE.Vector3(28, 6, 20), rotation: new THREE.Euler(0.3, 0.4, 0.05),
    distance: '12 million ly', stars: '~250 billion',
    description: 'Interacting with M82 and NGC 3077',
  },
  {
    key: 'sunflower', name: 'Sunflower (M63)', type: 'spiral',
    arms: 3, count: 1800, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffcc88', colorOutside: '#442200', randomMul: 1.0,
    position: new THREE.Vector3(25, 4, -28), rotation: new THREE.Euler(0.6, 0.3, 0.2),
    distance: '37 million ly', stars: '~400 billion',
    description: 'Flocculent spiral with many short arm segments',
  },
  {
    key: 'blackEye', name: 'Black Eye (M64)', type: 'spiral',
    arms: 2, count: 1600, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffbbaa', colorOutside: '#220000', randomMul: 0.9,
    position: new THREE.Vector3(-22, 2, -32), rotation: new THREE.Euler(0.2, 0.6, 0.1),
    distance: '17 million ly', stars: '~100 billion',
    description: 'Dark dust lane in front of bright nucleus',
  },
  {
    key: 'centaurusA', name: 'Centaurus A (NGC 5128)', type: 'elliptical',
    arms: 1, count: 2000, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffeecc', colorOutside: '#333300', randomMul: 0.5,
    position: new THREE.Vector3(-26, -6, 20),
    rotation: new THREE.Euler(Math.PI * 0.25, 0.1, 0.0),
    distance: '13 million ly', stars: '~100 billion',
    description: 'Closest radio galaxy to Earth; active galactic nucleus',
  },
  {
    key: 'virgoA', name: 'Virgo A (M87)', type: 'elliptical',
    arms: 1, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffeeaa', colorOutside: '#443300', randomMul: 0.4,
    position: new THREE.Vector3(-42, 10, -25), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '53 million ly', stars: '~1 trillion',
    description: 'Giant elliptical; first black hole ever imaged (EHT 2019)',
  },
  {
    key: 'cartwheel', name: 'Cartwheel Galaxy', type: 'irregular',
    arms: 1, count: 1400, radius: 2.4, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#aaffff', colorOutside: '#004444', randomMul: 0.5,
    position: new THREE.Vector3(40, -12, -30), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '500 million ly', stars: '~few billion',
    description: 'Ring galaxy formed by collision; JWST imaging target',
  },
  {
    key: 'antennae1', name: 'Antennae (NGC 4038)', type: 'irregular',
    arms: 2, count: 1500, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa88', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(-30, -8, 35), rotation: new THREE.Euler(0.4, 0.5, 0.3),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Colliding pair; classic merger in progress',
  },
  {
    key: 'antennae2', name: 'Antennae (NGC 4039)', type: 'irregular',
    arms: 2, count: 1200, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ff9977', colorOutside: '#330011', randomMul: 2.2,
    position: new THREE.Vector3(-28, -9, 37), rotation: new THREE.Euler(0.5, 0.4, 0.4),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Merging companion to NGC 4038',
  },
  {
    key: 'mice1', name: 'Mice (NGC 4676A)', type: 'spiral',
    arms: 2, count: 1200, radius: 2.3, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ccddff', colorOutside: '#112244', randomMul: 1.8,
    position: new THREE.Vector3(45, 5, 10), rotation: new THREE.Euler(0.3, 0.2, 0.5),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding pair with long tidal tails resembling mice',
  },
  {
    key: 'mice2', name: 'Mice (NGC 4676B)', type: 'spiral',
    arms: 2, count: 1000, radius: 2.0, scaleMin: 0.001, scaleMax: 0.038,
    colorInside: '#bbccff', colorOutside: '#001133', randomMul: 1.9,
    position: new THREE.Vector3(47, 4, 12), rotation: new THREE.Euler(0.4, 0.3, 0.6),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding companion to NGC 4676A',
  },
  {
    key: 'stephan1', name: "Stephan's Quintet (NGC 7317)", type: 'elliptical',
    arms: 1, count: 800, radius: 1.6, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffcc99', colorOutside: '#442200', randomMul: 0.7,
    position: new THREE.Vector3(50, 8, -35), rotation: new THREE.Euler(0.2, 0.3, 0.1),
    distance: '300 million ly', stars: '~tens of billions',
    description: "Part of Stephan's Quintet compact group",
  },
  {
    key: 'stephan2', name: "Stephan's Quintet (NGC 7318)", type: 'spiral',
    arms: 2, count: 900, radius: 1.7, scaleMin: 0.001, scaleMax: 0.032,
    colorInside: '#aabbff', colorOutside: '#112266', randomMul: 1.5,
    position: new THREE.Vector3(51, 7, -33), rotation: new THREE.Euler(0.3, 0.4, 0.2),
    distance: '300 million ly', stars: '~tens of billions',
    description: 'Interacting pair; first JWST image subject',
  },
  {
    key: 'circinus', name: 'Circinus Galaxy', type: 'spiral',
    arms: 2, count: 1300, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#aaffaa', colorOutside: '#004400', randomMul: 1.2,
    position: new THREE.Vector3(8, -14, 10),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.4, 0.2),
    distance: '13 million ly', stars: '~tens of billions',
    description: 'Active Seyfert 2; hidden behind the Milky Way plane',
  },

  // ── DEEP FIELD BACKGROUND (distant, small) ─────────────────────────────────
  {
    key: 'deepA', name: 'Deep Field A', type: 'elliptical',
    arms: 1, count: 500, radius: 1.2, scaleMin: 0.0005, scaleMax: 0.02,
    colorInside: '#ffddaa', colorOutside: '#442211', randomMul: 0.5,
    position: new THREE.Vector3(60, 15, 40), rotation: new THREE.Euler(0.1, 0.5, 0.2),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background elliptical',
  },
  {
    key: 'deepB', name: 'Deep Field B', type: 'spiral',
    arms: 2, count: 600, radius: 1.3, scaleMin: 0.0005, scaleMax: 0.022,
    colorInside: '#bbccff', colorOutside: '#001144', randomMul: 1.0,
    position: new THREE.Vector3(-55, -18, -45), rotation: new THREE.Euler(0.3, 1.0, 0.4),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background spiral',
  },
  {
    key: 'deepC', name: 'Deep Field C', type: 'irregular',
    arms: 1, count: 400, radius: 0.9, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffaacc', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(48, -20, -50), rotation: new THREE.Euler(0.6, 0.8, 0.5),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant irregular background galaxy',
  },
  {
    key: 'deepD', name: 'Deep Field D', type: 'elliptical',
    arms: 1, count: 450, radius: 1.0, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffeecc', colorOutside: '#332200', randomMul: 0.4,
    position: new THREE.Vector3(-60, 20, 30), rotation: new THREE.Euler(0.2, 0.9, 0.1),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant elliptical background galaxy',
  },
  {
    key: 'deepE', name: 'Deep Field E', type: 'spiral',
    arms: 3, count: 550, radius: 1.1, scaleMin: 0.0005, scaleMax: 0.019,
    colorInside: '#aaffdd', colorOutside: '#003322', randomMul: 1.1,
    position: new THREE.Vector3(55, 12, -55), rotation: new THREE.Euler(0.4, 1.2, 0.3),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant spiral background galaxy',
  },
  {
    key: 'milkyWay', name: 'Milky Way', type: 'spiral',
    arms: 4, count: 4000, radius: 5.0, scaleMin: 0.001, scaleMax: 0.08,
    colorInside: '#ffa575', colorOutside: '#6a1599', randomMul: 1.0,
    position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0),
    distance: '0 ly (home)', stars: '200–400 billion',
    description: 'Our barred spiral home galaxy',
  },

  // ── LOCAL GROUP ────────────────────────────────────────────────────────────
  {
    key: 'andromeda', name: 'Andromeda (M31)', type: 'spiral',
    arms: 2, count: 3000, radius: 4.5, scaleMin: 0.001, scaleMax: 0.07,
    colorInside: '#b0c4ff', colorOutside: '#1a0050', randomMul: 1.0,
    position: new THREE.Vector3(22, 2, -8),
    rotation: new THREE.Euler(Math.PI * 0.18, Math.PI * 0.05, 0),
    distance: '2.537 million ly', stars: '~1 trillion',
    description: 'Nearest large spiral; will merge with Milky Way in ~4.5 Gyr',
  },
  {
    key: 'triangulum', name: 'Triangulum (M33)', type: 'spiral',
    arms: 3, count: 2000, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffe0a0', colorOutside: '#664400', randomMul: 1.0,
    position: new THREE.Vector3(14, -3, 12), rotation: new THREE.Euler(0.3, 0.8, 0.1),
    distance: '2.73 million ly', stars: '~40 billion',
    description: 'Third-largest galaxy in the Local Group',
  },
  {
    key: 'largeMagellanicCloud', name: 'Large Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1500, radius: 2.2, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffcce0', colorOutside: '#880055', randomMul: 1.5,
    position: new THREE.Vector3(-8, -5, 6), rotation: new THREE.Euler(0.2, 0.4, 0.1),
    distance: '163,000 ly', stars: '~30 billion',
    description: 'Satellite of Milky Way; contains the Tarantula Nebula',
  },
  {
    key: 'smallMagellanicCloud', name: 'Small Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1000, radius: 1.4, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#c0ffe0', colorOutside: '#006644', randomMul: 1.8,
    position: new THREE.Vector3(-11, -4, 9), rotation: new THREE.Euler(0.1, 0.2, 0.3),
    distance: '200,000 ly', stars: '~3 billion',
    description: 'Satellite of Milky Way; interacts with LMC',
  },
  {
    key: 'sagittariusDwarf', name: 'Sagittarius Dwarf Elliptical', type: 'dwarf',
    arms: 1, count: 600, radius: 1.0, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffddaa', colorOutside: '#885500', randomMul: 2.5,
    position: new THREE.Vector3(3, -2, -6), rotation: new THREE.Euler(0.5, 1.0, 0.2),
    distance: '70,000 ly', stars: '~1 billion',
    description: 'Being absorbed by the Milky Way',
  },
  {
    key: 'canisMajorDwarf', name: 'Canis Major Dwarf', type: 'dwarf',
    arms: 1, count: 500, radius: 0.9, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffeecc', colorOutside: '#664400', randomMul: 2.8,
    position: new THREE.Vector3(5, -6, 2), rotation: new THREE.Euler(0.3, 0.5, 0.1),
    distance: '25,000 ly', stars: '~1 billion',
    description: 'Closest known galaxy; partially merged with Milky Way',
  },
  {
    key: 'sculptorDwarf', name: 'Sculptor Dwarf', type: 'dwarf',
    arms: 1, count: 400, radius: 0.8, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ddccff', colorOutside: '#330066', randomMul: 3.0,
    position: new THREE.Vector3(-16, -8, -5), rotation: new THREE.Euler(0.1, 0.3, 0.2),
    distance: '290,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite of Milky Way',
  },
  {
    key: 'fornaxDwarf', name: 'Fornax Dwarf', type: 'dwarf',
    arms: 1, count: 450, radius: 0.85, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffe8cc', colorOutside: '#553300', randomMul: 2.8,
    position: new THREE.Vector3(-18, 3, -12), rotation: new THREE.Euler(0.2, 0.7, 0.0),
    distance: '460,000 ly', stars: '~tens of millions',
    description: 'Dwarf spheroidal; contains 6 globular clusters',
  },
  {
    key: 'leo1', name: 'Leo I Dwarf', type: 'dwarf',
    arms: 1, count: 350, radius: 0.7, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddbb', colorOutside: '#442200', randomMul: 3.2,
    position: new THREE.Vector3(20, 6, -18), rotation: new THREE.Euler(0.0, 0.4, 0.1),
    distance: '820,000 ly', stars: '~5 million',
    description: 'One of the most distant Local Group dwarfs',
  },
  {
    key: 'leo2', name: 'Leo II Dwarf', type: 'dwarf',
    arms: 1, count: 300, radius: 0.6, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddcc', colorOutside: '#553322', randomMul: 3.0,
    position: new THREE.Vector3(22, 5, -20), rotation: new THREE.Euler(0.1, 0.5, 0.0),
    distance: '701,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite in Leo',
  },
  {
    key: 'ic10', name: 'IC 10', type: 'irregular',
    arms: 1, count: 700, radius: 1.1, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#aaffcc', colorOutside: '#004422', randomMul: 2.0,
    position: new THREE.Vector3(-20, 4, -14), rotation: new THREE.Euler(0.4, 0.6, 0.2),
    distance: '2.2 million ly', stars: '~few hundred million',
    description: 'Only known starburst galaxy in the Local Group',
  },

  // ── NEARBY UNIVERSE (5–500 Mly) ────────────────────────────────────────────
  {
    key: 'whirlpool', name: 'Whirlpool (M51)', type: 'spiral',
    arms: 2, count: 2500, radius: 3.8, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#88aaff', colorOutside: '#220066', randomMul: 1.0,
    position: new THREE.Vector3(38, 8, -20), rotation: new THREE.Euler(0.1, 0.3, 0.0),
    distance: '23 million ly', stars: '~100 billion',
    description: 'Grand-design spiral interacting with NGC 5195',
  },
  {
    key: 'sombrero', name: 'Sombrero (M104)', type: 'lenticular',
    arms: 1, count: 2000, radius: 3.2, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#fff5cc', colorOutside: '#443300', randomMul: 0.6,
    position: new THREE.Vector3(-35, -10, 18),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.2, 0.1),
    distance: '31 million ly', stars: '~800 billion',
    description: 'Lenticular with prominent dust lane and bright nucleus',
  },
  {
    key: 'pinwheel', name: 'Pinwheel (M101)', type: 'spiral',
    arms: 5, count: 2800, radius: 4.2, scaleMin: 0.001, scaleMax: 0.065,
    colorInside: '#aaddff', colorOutside: '#002255', randomMul: 1.1,
    position: new THREE.Vector3(32, -5, 25), rotation: new THREE.Euler(0.05, 0.2, 0.0),
    distance: '21 million ly', stars: '~1 trillion',
    description: 'Face-on grand spiral in Ursa Major',
  },
  {
    key: 'cigar', name: 'Cigar (M82)', type: 'irregular',
    arms: 1, count: 1800, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa44', colorOutside: '#441100', randomMul: 0.4,
    position: new THREE.Vector3(30, 7, 22),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.3, 0.1),
    distance: '12 million ly', stars: '~30 billion',
    description: 'Edge-on starburst galaxy; companion to M81',
  },
  {
    key: 'bodesGalaxy', name: "Bode's Galaxy (M81)", type: 'spiral',
    arms: 2, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffddaa', colorOutside: '#553300', randomMul: 0.9,
    position: new THREE.Vector3(28, 6, 20), rotation: new THREE.Euler(0.3, 0.4, 0.05),
    distance: '12 million ly', stars: '~250 billion',
    description: 'Interacting with M82 and NGC 3077',
  },
  {
    key: 'sunflower', name: 'Sunflower (M63)', type: 'spiral',
    arms: 3, count: 1800, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffcc88', colorOutside: '#442200', randomMul: 1.0,
    position: new THREE.Vector3(25, 4, -28), rotation: new THREE.Euler(0.6, 0.3, 0.2),
    distance: '37 million ly', stars: '~400 billion',
    description: 'Flocculent spiral with many short arm segments',
  },
  {
    key: 'blackEye', name: 'Black Eye (M64)', type: 'spiral',
    arms: 2, count: 1600, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffbbaa', colorOutside: '#220000', randomMul: 0.9,
    position: new THREE.Vector3(-22, 2, -32), rotation: new THREE.Euler(0.2, 0.6, 0.1),
    distance: '17 million ly', stars: '~100 billion',
    description: 'Dark dust lane in front of bright nucleus',
  },
  {
    key: 'centaurusA', name: 'Centaurus A (NGC 5128)', type: 'elliptical',
    arms: 1, count: 2000, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffeecc', colorOutside: '#333300', randomMul: 0.5,
    position: new THREE.Vector3(-26, -6, 20),
    rotation: new THREE.Euler(Math.PI * 0.25, 0.1, 0.0),
    distance: '13 million ly', stars: '~100 billion',
    description: 'Closest radio galaxy to Earth; active galactic nucleus',
  },
  {
    key: 'virgoA', name: 'Virgo A (M87)', type: 'elliptical',
    arms: 1, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffeeaa', colorOutside: '#443300', randomMul: 0.4,
    position: new THREE.Vector3(-42, 10, -25), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '53 million ly', stars: '~1 trillion',
    description: 'Giant elliptical; first black hole ever imaged (EHT 2019)',
  },
  {
    key: 'cartwheel', name: 'Cartwheel Galaxy', type: 'irregular',
    arms: 1, count: 1400, radius: 2.4, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#aaffff', colorOutside: '#004444', randomMul: 0.5,
    position: new THREE.Vector3(40, -12, -30), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '500 million ly', stars: '~few billion',
    description: 'Ring galaxy formed by collision; JWST imaging target',
  },
  {
    key: 'antennae1', name: 'Antennae (NGC 4038)', type: 'irregular',
    arms: 2, count: 1500, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa88', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(-30, -8, 35), rotation: new THREE.Euler(0.4, 0.5, 0.3),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Colliding pair; classic merger in progress',
  },
  {
    key: 'antennae2', name: 'Antennae (NGC 4039)', type: 'irregular',
    arms: 2, count: 1200, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ff9977', colorOutside: '#330011', randomMul: 2.2,
    position: new THREE.Vector3(-28, -9, 37), rotation: new THREE.Euler(0.5, 0.4, 0.4),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Merging companion to NGC 4038',
  },
  {
    key: 'mice1', name: 'Mice (NGC 4676A)', type: 'spiral',
    arms: 2, count: 1200, radius: 2.3, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ccddff', colorOutside: '#112244', randomMul: 1.8,
    position: new THREE.Vector3(45, 5, 10), rotation: new THREE.Euler(0.3, 0.2, 0.5),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding pair with long tidal tails resembling mice',
  },
  {
    key: 'mice2', name: 'Mice (NGC 4676B)', type: 'spiral',
    arms: 2, count: 1000, radius: 2.0, scaleMin: 0.001, scaleMax: 0.038,
    colorInside: '#bbccff', colorOutside: '#001133', randomMul: 1.9,
    position: new THREE.Vector3(47, 4, 12), rotation: new THREE.Euler(0.4, 0.3, 0.6),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding companion to NGC 4676A',
  },
  {
    key: 'stephan1', name: "Stephan's Quintet (NGC 7317)", type: 'elliptical',
    arms: 1, count: 800, radius: 1.6, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffcc99', colorOutside: '#442200', randomMul: 0.7,
    position: new THREE.Vector3(50, 8, -35), rotation: new THREE.Euler(0.2, 0.3, 0.1),
    distance: '300 million ly', stars: '~tens of billions',
    description: "Part of Stephan's Quintet compact group",
  },
  {
    key: 'stephan2', name: "Stephan's Quintet (NGC 7318)", type: 'spiral',
    arms: 2, count: 900, radius: 1.7, scaleMin: 0.001, scaleMax: 0.032,
    colorInside: '#aabbff', colorOutside: '#112266', randomMul: 1.5,
    position: new THREE.Vector3(51, 7, -33), rotation: new THREE.Euler(0.3, 0.4, 0.2),
    distance: '300 million ly', stars: '~tens of billions',
    description: 'Interacting pair; first JWST image subject',
  },
  {
    key: 'circinus', name: 'Circinus Galaxy', type: 'spiral',
    arms: 2, count: 1300, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#aaffaa', colorOutside: '#004400', randomMul: 1.2,
    position: new THREE.Vector3(8, -14, 10),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.4, 0.2),
    distance: '13 million ly', stars: '~tens of billions',
    description: 'Active Seyfert 2; hidden behind the Milky Way plane',
  },

  // ── DEEP FIELD BACKGROUND (distant, small) ─────────────────────────────────
  {
    key: 'deepA', name: 'Deep Field A', type: 'elliptical',
    arms: 1, count: 500, radius: 1.2, scaleMin: 0.0005, scaleMax: 0.02,
    colorInside: '#ffddaa', colorOutside: '#442211', randomMul: 0.5,
    position: new THREE.Vector3(60, 15, 40), rotation: new THREE.Euler(0.1, 0.5, 0.2),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background elliptical',
  },
  {
    key: 'deepB', name: 'Deep Field B', type: 'spiral',
    arms: 2, count: 600, radius: 1.3, scaleMin: 0.0005, scaleMax: 0.022,
    colorInside: '#bbccff', colorOutside: '#001144', randomMul: 1.0,
    position: new THREE.Vector3(-55, -18, -45), rotation: new THREE.Euler(0.3, 1.0, 0.4),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background spiral',
  },
  {
    key: 'deepC', name: 'Deep Field C', type: 'irregular',
    arms: 1, count: 400, radius: 0.9, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffaacc', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(48, -20, -50), rotation: new THREE.Euler(0.6, 0.8, 0.5),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant irregular background galaxy',
  },
  {
    key: 'deepD', name: 'Deep Field D', type: 'elliptical',
    arms: 1, count: 450, radius: 1.0, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffeecc', colorOutside: '#332200', randomMul: 0.4,
    position: new THREE.Vector3(-60, 20, 30), rotation: new THREE.Euler(0.2, 0.9, 0.1),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant elliptical background galaxy',
  },
  {
    key: 'deepE', name: 'Deep Field E', type: 'spiral',
    arms: 3, count: 550, radius: 1.1, scaleMin: 0.0005, scaleMax: 0.019,
    colorInside: '#aaffdd', colorOutside: '#003322', randomMul: 1.1,
    position: new THREE.Vector3(55, 12, -55), rotation: new THREE.Euler(0.4, 1.2, 0.3),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant spiral background galaxy',
  },
  {
    key: 'milkyWay', name: 'Milky Way', type: 'spiral',
    arms: 4, count: 4000, radius: 5.0, scaleMin: 0.001, scaleMax: 0.08,
    colorInside: '#ffa575', colorOutside: '#6a1599', randomMul: 1.0,
    position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0),
    distance: '0 ly (home)', stars: '200–400 billion',
    description: 'Our barred spiral home galaxy',
  },

  // ── LOCAL GROUP ────────────────────────────────────────────────────────────
  {
    key: 'andromeda', name: 'Andromeda (M31)', type: 'spiral',
    arms: 2, count: 3000, radius: 4.5, scaleMin: 0.001, scaleMax: 0.07,
    colorInside: '#b0c4ff', colorOutside: '#1a0050', randomMul: 1.0,
    position: new THREE.Vector3(22, 2, -8),
    rotation: new THREE.Euler(Math.PI * 0.18, Math.PI * 0.05, 0),
    distance: '2.537 million ly', stars: '~1 trillion',
    description: 'Nearest large spiral; will merge with Milky Way in ~4.5 Gyr',
  },
  {
    key: 'triangulum', name: 'Triangulum (M33)', type: 'spiral',
    arms: 3, count: 2000, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffe0a0', colorOutside: '#664400', randomMul: 1.0,
    position: new THREE.Vector3(14, -3, 12), rotation: new THREE.Euler(0.3, 0.8, 0.1),
    distance: '2.73 million ly', stars: '~40 billion',
    description: 'Third-largest galaxy in the Local Group',
  },
  {
    key: 'largeMagellanicCloud', name: 'Large Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1500, radius: 2.2, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffcce0', colorOutside: '#880055', randomMul: 1.5,
    position: new THREE.Vector3(-8, -5, 6), rotation: new THREE.Euler(0.2, 0.4, 0.1),
    distance: '163,000 ly', stars: '~30 billion',
    description: 'Satellite of Milky Way; contains the Tarantula Nebula',
  },
  {
    key: 'smallMagellanicCloud', name: 'Small Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1000, radius: 1.4, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#c0ffe0', colorOutside: '#006644', randomMul: 1.8,
    position: new THREE.Vector3(-11, -4, 9), rotation: new THREE.Euler(0.1, 0.2, 0.3),
    distance: '200,000 ly', stars: '~3 billion',
    description: 'Satellite of Milky Way; interacts with LMC',
  },
  {
    key: 'sagittariusDwarf', name: 'Sagittarius Dwarf Elliptical', type: 'dwarf',
    arms: 1, count: 600, radius: 1.0, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffddaa', colorOutside: '#885500', randomMul: 2.5,
    position: new THREE.Vector3(3, -2, -6), rotation: new THREE.Euler(0.5, 1.0, 0.2),
    distance: '70,000 ly', stars: '~1 billion',
    description: 'Being absorbed by the Milky Way',
  },
  {
    key: 'canisMajorDwarf', name: 'Canis Major Dwarf', type: 'dwarf',
    arms: 1, count: 500, radius: 0.9, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffeecc', colorOutside: '#664400', randomMul: 2.8,
    position: new THREE.Vector3(5, -6, 2), rotation: new THREE.Euler(0.3, 0.5, 0.1),
    distance: '25,000 ly', stars: '~1 billion',
    description: 'Closest known galaxy; partially merged with Milky Way',
  },
  {
    key: 'sculptorDwarf', name: 'Sculptor Dwarf', type: 'dwarf',
    arms: 1, count: 400, radius: 0.8, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ddccff', colorOutside: '#330066', randomMul: 3.0,
    position: new THREE.Vector3(-16, -8, -5), rotation: new THREE.Euler(0.1, 0.3, 0.2),
    distance: '290,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite of Milky Way',
  },
  {
    key: 'fornaxDwarf', name: 'Fornax Dwarf', type: 'dwarf',
    arms: 1, count: 450, radius: 0.85, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffe8cc', colorOutside: '#553300', randomMul: 2.8,
    position: new THREE.Vector3(-18, 3, -12), rotation: new THREE.Euler(0.2, 0.7, 0.0),
    distance: '460,000 ly', stars: '~tens of millions',
    description: 'Dwarf spheroidal; contains 6 globular clusters',
  },
  {
    key: 'leo1', name: 'Leo I Dwarf', type: 'dwarf',
    arms: 1, count: 350, radius: 0.7, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddbb', colorOutside: '#442200', randomMul: 3.2,
    position: new THREE.Vector3(20, 6, -18), rotation: new THREE.Euler(0.0, 0.4, 0.1),
    distance: '820,000 ly', stars: '~5 million',
    description: 'One of the most distant Local Group dwarfs',
  },
  {
    key: 'leo2', name: 'Leo II Dwarf', type: 'dwarf',
    arms: 1, count: 300, radius: 0.6, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddcc', colorOutside: '#553322', randomMul: 3.0,
    position: new THREE.Vector3(22, 5, -20), rotation: new THREE.Euler(0.1, 0.5, 0.0),
    distance: '701,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite in Leo',
  },
  {
    key: 'ic10', name: 'IC 10', type: 'irregular',
    arms: 1, count: 700, radius: 1.1, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#aaffcc', colorOutside: '#004422', randomMul: 2.0,
    position: new THREE.Vector3(-20, 4, -14), rotation: new THREE.Euler(0.4, 0.6, 0.2),
    distance: '2.2 million ly', stars: '~few hundred million',
    description: 'Only known starburst galaxy in the Local Group',
  },

  // ── NEARBY UNIVERSE (5–500 Mly) ────────────────────────────────────────────
  {
    key: 'whirlpool', name: 'Whirlpool (M51)', type: 'spiral',
    arms: 2, count: 2500, radius: 3.8, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#88aaff', colorOutside: '#220066', randomMul: 1.0,
    position: new THREE.Vector3(38, 8, -20), rotation: new THREE.Euler(0.1, 0.3, 0.0),
    distance: '23 million ly', stars: '~100 billion',
    description: 'Grand-design spiral interacting with NGC 5195',
  },
  {
    key: 'sombrero', name: 'Sombrero (M104)', type: 'lenticular',
    arms: 1, count: 2000, radius: 3.2, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#fff5cc', colorOutside: '#443300', randomMul: 0.6,
    position: new THREE.Vector3(-35, -10, 18),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.2, 0.1),
    distance: '31 million ly', stars: '~800 billion',
    description: 'Lenticular with prominent dust lane and bright nucleus',
  },
  {
    key: 'pinwheel', name: 'Pinwheel (M101)', type: 'spiral',
    arms: 5, count: 2800, radius: 4.2, scaleMin: 0.001, scaleMax: 0.065,
    colorInside: '#aaddff', colorOutside: '#002255', randomMul: 1.1,
    position: new THREE.Vector3(32, -5, 25), rotation: new THREE.Euler(0.05, 0.2, 0.0),
    distance: '21 million ly', stars: '~1 trillion',
    description: 'Face-on grand spiral in Ursa Major',
  },
  {
    key: 'cigar', name: 'Cigar (M82)', type: 'irregular',
    arms: 1, count: 1800, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa44', colorOutside: '#441100', randomMul: 0.4,
    position: new THREE.Vector3(30, 7, 22),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.3, 0.1),
    distance: '12 million ly', stars: '~30 billion',
    description: 'Edge-on starburst galaxy; companion to M81',
  },
  {
    key: 'bodesGalaxy', name: "Bode's Galaxy (M81)", type: 'spiral',
    arms: 2, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffddaa', colorOutside: '#553300', randomMul: 0.9,
    position: new THREE.Vector3(28, 6, 20), rotation: new THREE.Euler(0.3, 0.4, 0.05),
    distance: '12 million ly', stars: '~250 billion',
    description: 'Interacting with M82 and NGC 3077',
  },
  {
    key: 'sunflower', name: 'Sunflower (M63)', type: 'spiral',
    arms: 3, count: 1800, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffcc88', colorOutside: '#442200', randomMul: 1.0,
    position: new THREE.Vector3(25, 4, -28), rotation: new THREE.Euler(0.6, 0.3, 0.2),
    distance: '37 million ly', stars: '~400 billion',
    description: 'Flocculent spiral with many short arm segments',
  },
  {
    key: 'blackEye', name: 'Black Eye (M64)', type: 'spiral',
    arms: 2, count: 1600, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffbbaa', colorOutside: '#220000', randomMul: 0.9,
    position: new THREE.Vector3(-22, 2, -32), rotation: new THREE.Euler(0.2, 0.6, 0.1),
    distance: '17 million ly', stars: '~100 billion',
    description: 'Dark dust lane in front of bright nucleus',
  },
  {
    key: 'centaurusA', name: 'Centaurus A (NGC 5128)', type: 'elliptical',
    arms: 1, count: 2000, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffeecc', colorOutside: '#333300', randomMul: 0.5,
    position: new THREE.Vector3(-26, -6, 20),
    rotation: new THREE.Euler(Math.PI * 0.25, 0.1, 0.0),
    distance: '13 million ly', stars: '~100 billion',
    description: 'Closest radio galaxy to Earth; active galactic nucleus',
  },
  {
    key: 'virgoA', name: 'Virgo A (M87)', type: 'elliptical',
    arms: 1, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffeeaa', colorOutside: '#443300', randomMul: 0.4,
    position: new THREE.Vector3(-42, 10, -25), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '53 million ly', stars: '~1 trillion',
    description: 'Giant elliptical; first black hole ever imaged (EHT 2019)',
  },
  {
    key: 'cartwheel', name: 'Cartwheel Galaxy', type: 'irregular',
    arms: 1, count: 1400, radius: 2.4, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#aaffff', colorOutside: '#004444', randomMul: 0.5,
    position: new THREE.Vector3(40, -12, -30), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '500 million ly', stars: '~few billion',
    description: 'Ring galaxy formed by collision; JWST imaging target',
  },
  {
    key: 'antennae1', name: 'Antennae (NGC 4038)', type: 'irregular',
    arms: 2, count: 1500, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa88', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(-30, -8, 35), rotation: new THREE.Euler(0.4, 0.5, 0.3),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Colliding pair; classic merger in progress',
  },
  {
    key: 'antennae2', name: 'Antennae (NGC 4039)', type: 'irregular',
    arms: 2, count: 1200, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ff9977', colorOutside: '#330011', randomMul: 2.2,
    position: new THREE.Vector3(-28, -9, 37), rotation: new THREE.Euler(0.5, 0.4, 0.4),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Merging companion to NGC 4038',
  },
  {
    key: 'mice1', name: 'Mice (NGC 4676A)', type: 'spiral',
    arms: 2, count: 1200, radius: 2.3, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ccddff', colorOutside: '#112244', randomMul: 1.8,
    position: new THREE.Vector3(45, 5, 10), rotation: new THREE.Euler(0.3, 0.2, 0.5),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding pair with long tidal tails resembling mice',
  },
  {
    key: 'mice2', name: 'Mice (NGC 4676B)', type: 'spiral',
    arms: 2, count: 1000, radius: 2.0, scaleMin: 0.001, scaleMax: 0.038,
    colorInside: '#bbccff', colorOutside: '#001133', randomMul: 1.9,
    position: new THREE.Vector3(47, 4, 12), rotation: new THREE.Euler(0.4, 0.3, 0.6),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding companion to NGC 4676A',
  },
  {
    key: 'stephan1', name: "Stephan's Quintet (NGC 7317)", type: 'elliptical',
    arms: 1, count: 800, radius: 1.6, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffcc99', colorOutside: '#442200', randomMul: 0.7,
    position: new THREE.Vector3(50, 8, -35), rotation: new THREE.Euler(0.2, 0.3, 0.1),
    distance: '300 million ly', stars: '~tens of billions',
    description: "Part of Stephan's Quintet compact group",
  },
  {
    key: 'stephan2', name: "Stephan's Quintet (NGC 7318)", type: 'spiral',
    arms: 2, count: 900, radius: 1.7, scaleMin: 0.001, scaleMax: 0.032,
    colorInside: '#aabbff', colorOutside: '#112266', randomMul: 1.5,
    position: new THREE.Vector3(51, 7, -33), rotation: new THREE.Euler(0.3, 0.4, 0.2),
    distance: '300 million ly', stars: '~tens of billions',
    description: 'Interacting pair; first JWST image subject',
  },
  {
    key: 'circinus', name: 'Circinus Galaxy', type: 'spiral',
    arms: 2, count: 1300, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#aaffaa', colorOutside: '#004400', randomMul: 1.2,
    position: new THREE.Vector3(8, -14, 10),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.4, 0.2),
    distance: '13 million ly', stars: '~tens of billions',
    description: 'Active Seyfert 2; hidden behind the Milky Way plane',
  },

  // ── DEEP FIELD BACKGROUND (distant, small) ─────────────────────────────────
  {
    key: 'deepA', name: 'Deep Field A', type: 'elliptical',
    arms: 1, count: 500, radius: 1.2, scaleMin: 0.0005, scaleMax: 0.02,
    colorInside: '#ffddaa', colorOutside: '#442211', randomMul: 0.5,
    position: new THREE.Vector3(60, 15, 40), rotation: new THREE.Euler(0.1, 0.5, 0.2),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background elliptical',
  },
  {
    key: 'deepB', name: 'Deep Field B', type: 'spiral',
    arms: 2, count: 600, radius: 1.3, scaleMin: 0.0005, scaleMax: 0.022,
    colorInside: '#bbccff', colorOutside: '#001144', randomMul: 1.0,
    position: new THREE.Vector3(-55, -18, -45), rotation: new THREE.Euler(0.3, 1.0, 0.4),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background spiral',
  },
  {
    key: 'deepC', name: 'Deep Field C', type: 'irregular',
    arms: 1, count: 400, radius: 0.9, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffaacc', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(48, -20, -50), rotation: new THREE.Euler(0.6, 0.8, 0.5),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant irregular background galaxy',
  },
  {
    key: 'deepD', name: 'Deep Field D', type: 'elliptical',
    arms: 1, count: 450, radius: 1.0, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffeecc', colorOutside: '#332200', randomMul: 0.4,
    position: new THREE.Vector3(-60, 20, 30), rotation: new THREE.Euler(0.2, 0.9, 0.1),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant elliptical background galaxy',
  },
  {
    key: 'deepE', name: 'Deep Field E', type: 'spiral',
    arms: 3, count: 550, radius: 1.1, scaleMin: 0.0005, scaleMax: 0.019,
    colorInside: '#aaffdd', colorOutside: '#003322', randomMul: 1.1,
    position: new THREE.Vector3(55, 12, -55), rotation: new THREE.Euler(0.4, 1.2, 0.3),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant spiral background galaxy',
  },
  {
    key: 'milkyWay', name: 'Milky Way', type: 'spiral',
    arms: 4, count: 4000, radius: 5.0, scaleMin: 0.001, scaleMax: 0.08,
    colorInside: '#ffa575', colorOutside: '#6a1599', randomMul: 1.0,
    position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0),
    distance: '0 ly (home)', stars: '200–400 billion',
    description: 'Our barred spiral home galaxy',
  },

  // ── LOCAL GROUP ────────────────────────────────────────────────────────────
  {
    key: 'andromeda', name: 'Andromeda (M31)', type: 'spiral',
    arms: 2, count: 3000, radius: 4.5, scaleMin: 0.001, scaleMax: 0.07,
    colorInside: '#b0c4ff', colorOutside: '#1a0050', randomMul: 1.0,
    position: new THREE.Vector3(22, 2, -8),
    rotation: new THREE.Euler(Math.PI * 0.18, Math.PI * 0.05, 0),
    distance: '2.537 million ly', stars: '~1 trillion',
    description: 'Nearest large spiral; will merge with Milky Way in ~4.5 Gyr',
  },
  {
    key: 'triangulum', name: 'Triangulum (M33)', type: 'spiral',
    arms: 3, count: 2000, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffe0a0', colorOutside: '#664400', randomMul: 1.0,
    position: new THREE.Vector3(14, -3, 12), rotation: new THREE.Euler(0.3, 0.8, 0.1),
    distance: '2.73 million ly', stars: '~40 billion',
    description: 'Third-largest galaxy in the Local Group',
  },
  {
    key: 'largeMagellanicCloud', name: 'Large Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1500, radius: 2.2, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffcce0', colorOutside: '#880055', randomMul: 1.5,
    position: new THREE.Vector3(-8, -5, 6), rotation: new THREE.Euler(0.2, 0.4, 0.1),
    distance: '163,000 ly', stars: '~30 billion',
    description: 'Satellite of Milky Way; contains the Tarantula Nebula',
  },
  {
    key: 'smallMagellanicCloud', name: 'Small Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1000, radius: 1.4, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#c0ffe0', colorOutside: '#006644', randomMul: 1.8,
    position: new THREE.Vector3(-11, -4, 9), rotation: new THREE.Euler(0.1, 0.2, 0.3),
    distance: '200,000 ly', stars: '~3 billion',
    description: 'Satellite of Milky Way; interacts with LMC',
  },
  {
    key: 'sagittariusDwarf', name: 'Sagittarius Dwarf Elliptical', type: 'dwarf',
    arms: 1, count: 600, radius: 1.0, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffddaa', colorOutside: '#885500', randomMul: 2.5,
    position: new THREE.Vector3(3, -2, -6), rotation: new THREE.Euler(0.5, 1.0, 0.2),
    distance: '70,000 ly', stars: '~1 billion',
    description: 'Being absorbed by the Milky Way',
  },
  {
    key: 'canisMajorDwarf', name: 'Canis Major Dwarf', type: 'dwarf',
    arms: 1, count: 500, radius: 0.9, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffeecc', colorOutside: '#664400', randomMul: 2.8,
    position: new THREE.Vector3(5, -6, 2), rotation: new THREE.Euler(0.3, 0.5, 0.1),
    distance: '25,000 ly', stars: '~1 billion',
    description: 'Closest known galaxy; partially merged with Milky Way',
  },
  {
    key: 'sculptorDwarf', name: 'Sculptor Dwarf', type: 'dwarf',
    arms: 1, count: 400, radius: 0.8, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ddccff', colorOutside: '#330066', randomMul: 3.0,
    position: new THREE.Vector3(-16, -8, -5), rotation: new THREE.Euler(0.1, 0.3, 0.2),
    distance: '290,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite of Milky Way',
  },
  {
    key: 'fornaxDwarf', name: 'Fornax Dwarf', type: 'dwarf',
    arms: 1, count: 450, radius: 0.85, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffe8cc', colorOutside: '#553300', randomMul: 2.8,
    position: new THREE.Vector3(-18, 3, -12), rotation: new THREE.Euler(0.2, 0.7, 0.0),
    distance: '460,000 ly', stars: '~tens of millions',
    description: 'Dwarf spheroidal; contains 6 globular clusters',
  },
  {
    key: 'leo1', name: 'Leo I Dwarf', type: 'dwarf',
    arms: 1, count: 350, radius: 0.7, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddbb', colorOutside: '#442200', randomMul: 3.2,
    position: new THREE.Vector3(20, 6, -18), rotation: new THREE.Euler(0.0, 0.4, 0.1),
    distance: '820,000 ly', stars: '~5 million',
    description: 'One of the most distant Local Group dwarfs',
  },
  {
    key: 'leo2', name: 'Leo II Dwarf', type: 'dwarf',
    arms: 1, count: 300, radius: 0.6, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddcc', colorOutside: '#553322', randomMul: 3.0,
    position: new THREE.Vector3(22, 5, -20), rotation: new THREE.Euler(0.1, 0.5, 0.0),
    distance: '701,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite in Leo',
  },
  {
    key: 'ic10', name: 'IC 10', type: 'irregular',
    arms: 1, count: 700, radius: 1.1, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#aaffcc', colorOutside: '#004422', randomMul: 2.0,
    position: new THREE.Vector3(-20, 4, -14), rotation: new THREE.Euler(0.4, 0.6, 0.2),
    distance: '2.2 million ly', stars: '~few hundred million',
    description: 'Only known starburst galaxy in the Local Group',
  },

  // ── NEARBY UNIVERSE (5–500 Mly) ────────────────────────────────────────────
  {
    key: 'whirlpool', name: 'Whirlpool (M51)', type: 'spiral',
    arms: 2, count: 2500, radius: 3.8, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#88aaff', colorOutside: '#220066', randomMul: 1.0,
    position: new THREE.Vector3(38, 8, -20), rotation: new THREE.Euler(0.1, 0.3, 0.0),
    distance: '23 million ly', stars: '~100 billion',
    description: 'Grand-design spiral interacting with NGC 5195',
  },
  {
    key: 'sombrero', name: 'Sombrero (M104)', type: 'lenticular',
    arms: 1, count: 2000, radius: 3.2, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#fff5cc', colorOutside: '#443300', randomMul: 0.6,
    position: new THREE.Vector3(-35, -10, 18),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.2, 0.1),
    distance: '31 million ly', stars: '~800 billion',
    description: 'Lenticular with prominent dust lane and bright nucleus',
  },
  {
    key: 'pinwheel', name: 'Pinwheel (M101)', type: 'spiral',
    arms: 5, count: 2800, radius: 4.2, scaleMin: 0.001, scaleMax: 0.065,
    colorInside: '#aaddff', colorOutside: '#002255', randomMul: 1.1,
    position: new THREE.Vector3(32, -5, 25), rotation: new THREE.Euler(0.05, 0.2, 0.0),
    distance: '21 million ly', stars: '~1 trillion',
    description: 'Face-on grand spiral in Ursa Major',
  },
  {
    key: 'cigar', name: 'Cigar (M82)', type: 'irregular',
    arms: 1, count: 1800, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa44', colorOutside: '#441100', randomMul: 0.4,
    position: new THREE.Vector3(30, 7, 22),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.3, 0.1),
    distance: '12 million ly', stars: '~30 billion',
    description: 'Edge-on starburst galaxy; companion to M81',
  },
  {
    key: 'bodesGalaxy', name: "Bode's Galaxy (M81)", type: 'spiral',
    arms: 2, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffddaa', colorOutside: '#553300', randomMul: 0.9,
    position: new THREE.Vector3(28, 6, 20), rotation: new THREE.Euler(0.3, 0.4, 0.05),
    distance: '12 million ly', stars: '~250 billion',
    description: 'Interacting with M82 and NGC 3077',
  },
  {
    key: 'sunflower', name: 'Sunflower (M63)', type: 'spiral',
    arms: 3, count: 1800, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffcc88', colorOutside: '#442200', randomMul: 1.0,
    position: new THREE.Vector3(25, 4, -28), rotation: new THREE.Euler(0.6, 0.3, 0.2),
    distance: '37 million ly', stars: '~400 billion',
    description: 'Flocculent spiral with many short arm segments',
  },
  {
    key: 'blackEye', name: 'Black Eye (M64)', type: 'spiral',
    arms: 2, count: 1600, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffbbaa', colorOutside: '#220000', randomMul: 0.9,
    position: new THREE.Vector3(-22, 2, -32), rotation: new THREE.Euler(0.2, 0.6, 0.1),
    distance: '17 million ly', stars: '~100 billion',
    description: 'Dark dust lane in front of bright nucleus',
  },
  {
    key: 'centaurusA', name: 'Centaurus A (NGC 5128)', type: 'elliptical',
    arms: 1, count: 2000, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffeecc', colorOutside: '#333300', randomMul: 0.5,
    position: new THREE.Vector3(-26, -6, 20),
    rotation: new THREE.Euler(Math.PI * 0.25, 0.1, 0.0),
    distance: '13 million ly', stars: '~100 billion',
    description: 'Closest radio galaxy to Earth; active galactic nucleus',
  },
  {
    key: 'virgoA', name: 'Virgo A (M87)', type: 'elliptical',
    arms: 1, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffeeaa', colorOutside: '#443300', randomMul: 0.4,
    position: new THREE.Vector3(-42, 10, -25), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '53 million ly', stars: '~1 trillion',
    description: 'Giant elliptical; first black hole ever imaged (EHT 2019)',
  },
  {
    key: 'cartwheel', name: 'Cartwheel Galaxy', type: 'irregular',
    arms: 1, count: 1400, radius: 2.4, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#aaffff', colorOutside: '#004444', randomMul: 0.5,
    position: new THREE.Vector3(40, -12, -30), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '500 million ly', stars: '~few billion',
    description: 'Ring galaxy formed by collision; JWST imaging target',
  },
  {
    key: 'antennae1', name: 'Antennae (NGC 4038)', type: 'irregular',
    arms: 2, count: 1500, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa88', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(-30, -8, 35), rotation: new THREE.Euler(0.4, 0.5, 0.3),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Colliding pair; classic merger in progress',
  },
  {
    key: 'antennae2', name: 'Antennae (NGC 4039)', type: 'irregular',
    arms: 2, count: 1200, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ff9977', colorOutside: '#330011', randomMul: 2.2,
    position: new THREE.Vector3(-28, -9, 37), rotation: new THREE.Euler(0.5, 0.4, 0.4),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Merging companion to NGC 4038',
  },
  {
    key: 'mice1', name: 'Mice (NGC 4676A)', type: 'spiral',
    arms: 2, count: 1200, radius: 2.3, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ccddff', colorOutside: '#112244', randomMul: 1.8,
    position: new THREE.Vector3(45, 5, 10), rotation: new THREE.Euler(0.3, 0.2, 0.5),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding pair with long tidal tails resembling mice',
  },
  {
    key: 'mice2', name: 'Mice (NGC 4676B)', type: 'spiral',
    arms: 2, count: 1000, radius: 2.0, scaleMin: 0.001, scaleMax: 0.038,
    colorInside: '#bbccff', colorOutside: '#001133', randomMul: 1.9,
    position: new THREE.Vector3(47, 4, 12), rotation: new THREE.Euler(0.4, 0.3, 0.6),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding companion to NGC 4676A',
  },
  {
    key: 'stephan1', name: "Stephan's Quintet (NGC 7317)", type: 'elliptical',
    arms: 1, count: 800, radius: 1.6, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffcc99', colorOutside: '#442200', randomMul: 0.7,
    position: new THREE.Vector3(50, 8, -35), rotation: new THREE.Euler(0.2, 0.3, 0.1),
    distance: '300 million ly', stars: '~tens of billions',
    description: "Part of Stephan's Quintet compact group",
  },
  {
    key: 'stephan2', name: "Stephan's Quintet (NGC 7318)", type: 'spiral',
    arms: 2, count: 900, radius: 1.7, scaleMin: 0.001, scaleMax: 0.032,
    colorInside: '#aabbff', colorOutside: '#112266', randomMul: 1.5,
    position: new THREE.Vector3(51, 7, -33), rotation: new THREE.Euler(0.3, 0.4, 0.2),
    distance: '300 million ly', stars: '~tens of billions',
    description: 'Interacting pair; first JWST image subject',
  },
  {
    key: 'circinus', name: 'Circinus Galaxy', type: 'spiral',
    arms: 2, count: 1300, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#aaffaa', colorOutside: '#004400', randomMul: 1.2,
    position: new THREE.Vector3(8, -14, 10),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.4, 0.2),
    distance: '13 million ly', stars: '~tens of billions',
    description: 'Active Seyfert 2; hidden behind the Milky Way plane',
  },

  // ── DEEP FIELD BACKGROUND (distant, small) ─────────────────────────────────
  {
    key: 'deepA', name: 'Deep Field A', type: 'elliptical',
    arms: 1, count: 500, radius: 1.2, scaleMin: 0.0005, scaleMax: 0.02,
    colorInside: '#ffddaa', colorOutside: '#442211', randomMul: 0.5,
    position: new THREE.Vector3(60, 15, 40), rotation: new THREE.Euler(0.1, 0.5, 0.2),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background elliptical',
  },
  {
    key: 'deepB', name: 'Deep Field B', type: 'spiral',
    arms: 2, count: 600, radius: 1.3, scaleMin: 0.0005, scaleMax: 0.022,
    colorInside: '#bbccff', colorOutside: '#001144', randomMul: 1.0,
    position: new THREE.Vector3(-55, -18, -45), rotation: new THREE.Euler(0.3, 1.0, 0.4),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background spiral',
  },
  {
    key: 'deepC', name: 'Deep Field C', type: 'irregular',
    arms: 1, count: 400, radius: 0.9, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffaacc', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(48, -20, -50), rotation: new THREE.Euler(0.6, 0.8, 0.5),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant irregular background galaxy',
  },
  {
    key: 'deepD', name: 'Deep Field D', type: 'elliptical',
    arms: 1, count: 450, radius: 1.0, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffeecc', colorOutside: '#332200', randomMul: 0.4,
    position: new THREE.Vector3(-60, 20, 30), rotation: new THREE.Euler(0.2, 0.9, 0.1),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant elliptical background galaxy',
  },
  {
    key: 'deepE', name: 'Deep Field E', type: 'spiral',
    arms: 3, count: 550, radius: 1.1, scaleMin: 0.0005, scaleMax: 0.019,
    colorInside: '#aaffdd', colorOutside: '#003322', randomMul: 1.1,
    position: new THREE.Vector3(55, 12, -55), rotation: new THREE.Euler(0.4, 1.2, 0.3),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant spiral background galaxy',
  },
  {
    key: 'milkyWay', name: 'Milky Way', type: 'spiral',
    arms: 4, count: 4000, radius: 5.0, scaleMin: 0.001, scaleMax: 0.08,
    colorInside: '#ffa575', colorOutside: '#6a1599', randomMul: 1.0,
    position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0),
    distance: '0 ly (home)', stars: '200–400 billion',
    description: 'Our barred spiral home galaxy',
  },

  // ── LOCAL GROUP ────────────────────────────────────────────────────────────
  {
    key: 'andromeda', name: 'Andromeda (M31)', type: 'spiral',
    arms: 2, count: 3000, radius: 4.5, scaleMin: 0.001, scaleMax: 0.07,
    colorInside: '#b0c4ff', colorOutside: '#1a0050', randomMul: 1.0,
    position: new THREE.Vector3(22, 2, -8),
    rotation: new THREE.Euler(Math.PI * 0.18, Math.PI * 0.05, 0),
    distance: '2.537 million ly', stars: '~1 trillion',
    description: 'Nearest large spiral; will merge with Milky Way in ~4.5 Gyr',
  },
  {
    key: 'triangulum', name: 'Triangulum (M33)', type: 'spiral',
    arms: 3, count: 2000, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffe0a0', colorOutside: '#664400', randomMul: 1.0,
    position: new THREE.Vector3(14, -3, 12), rotation: new THREE.Euler(0.3, 0.8, 0.1),
    distance: '2.73 million ly', stars: '~40 billion',
    description: 'Third-largest galaxy in the Local Group',
  },
  {
    key: 'largeMagellanicCloud', name: 'Large Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1500, radius: 2.2, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffcce0', colorOutside: '#880055', randomMul: 1.5,
    position: new THREE.Vector3(-8, -5, 6), rotation: new THREE.Euler(0.2, 0.4, 0.1),
    distance: '163,000 ly', stars: '~30 billion',
    description: 'Satellite of Milky Way; contains the Tarantula Nebula',
  },
  {
    key: 'smallMagellanicCloud', name: 'Small Magellanic Cloud', type: 'irregular',
    arms: 1, count: 1000, radius: 1.4, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#c0ffe0', colorOutside: '#006644', randomMul: 1.8,
    position: new THREE.Vector3(-11, -4, 9), rotation: new THREE.Euler(0.1, 0.2, 0.3),
    distance: '200,000 ly', stars: '~3 billion',
    description: 'Satellite of Milky Way; interacts with LMC',
  },
  {
    key: 'sagittariusDwarf', name: 'Sagittarius Dwarf Elliptical', type: 'dwarf',
    arms: 1, count: 600, radius: 1.0, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffddaa', colorOutside: '#885500', randomMul: 2.5,
    position: new THREE.Vector3(3, -2, -6), rotation: new THREE.Euler(0.5, 1.0, 0.2),
    distance: '70,000 ly', stars: '~1 billion',
    description: 'Being absorbed by the Milky Way',
  },
  {
    key: 'canisMajorDwarf', name: 'Canis Major Dwarf', type: 'dwarf',
    arms: 1, count: 500, radius: 0.9, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffeecc', colorOutside: '#664400', randomMul: 2.8,
    position: new THREE.Vector3(5, -6, 2), rotation: new THREE.Euler(0.3, 0.5, 0.1),
    distance: '25,000 ly', stars: '~1 billion',
    description: 'Closest known galaxy; partially merged with Milky Way',
  },
  {
    key: 'sculptorDwarf', name: 'Sculptor Dwarf', type: 'dwarf',
    arms: 1, count: 400, radius: 0.8, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ddccff', colorOutside: '#330066', randomMul: 3.0,
    position: new THREE.Vector3(-16, -8, -5), rotation: new THREE.Euler(0.1, 0.3, 0.2),
    distance: '290,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite of Milky Way',
  },
  {
    key: 'fornaxDwarf', name: 'Fornax Dwarf', type: 'dwarf',
    arms: 1, count: 450, radius: 0.85, scaleMin: 0.001, scaleMax: 0.025,
    colorInside: '#ffe8cc', colorOutside: '#553300', randomMul: 2.8,
    position: new THREE.Vector3(-18, 3, -12), rotation: new THREE.Euler(0.2, 0.7, 0.0),
    distance: '460,000 ly', stars: '~tens of millions',
    description: 'Dwarf spheroidal; contains 6 globular clusters',
  },
  {
    key: 'leo1', name: 'Leo I Dwarf', type: 'dwarf',
    arms: 1, count: 350, radius: 0.7, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddbb', colorOutside: '#442200', randomMul: 3.2,
    position: new THREE.Vector3(20, 6, -18), rotation: new THREE.Euler(0.0, 0.4, 0.1),
    distance: '820,000 ly', stars: '~5 million',
    description: 'One of the most distant Local Group dwarfs',
  },
  {
    key: 'leo2', name: 'Leo II Dwarf', type: 'dwarf',
    arms: 1, count: 300, radius: 0.6, scaleMin: 0.001, scaleMax: 0.02,
    colorInside: '#ffddcc', colorOutside: '#553322', randomMul: 3.0,
    position: new THREE.Vector3(22, 5, -20), rotation: new THREE.Euler(0.1, 0.5, 0.0),
    distance: '701,000 ly', stars: '~few million',
    description: 'Dwarf spheroidal satellite in Leo',
  },
  {
    key: 'ic10', name: 'IC 10', type: 'irregular',
    arms: 1, count: 700, radius: 1.1, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#aaffcc', colorOutside: '#004422', randomMul: 2.0,
    position: new THREE.Vector3(-20, 4, -14), rotation: new THREE.Euler(0.4, 0.6, 0.2),
    distance: '2.2 million ly', stars: '~few hundred million',
    description: 'Only known starburst galaxy in the Local Group',
  },

  // ── NEARBY UNIVERSE (5–500 Mly) ────────────────────────────────────────────
  {
    key: 'whirlpool', name: 'Whirlpool (M51)', type: 'spiral',
    arms: 2, count: 2500, radius: 3.8, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#88aaff', colorOutside: '#220066', randomMul: 1.0,
    position: new THREE.Vector3(38, 8, -20), rotation: new THREE.Euler(0.1, 0.3, 0.0),
    distance: '23 million ly', stars: '~100 billion',
    description: 'Grand-design spiral interacting with NGC 5195',
  },
  {
    key: 'sombrero', name: 'Sombrero (M104)', type: 'lenticular',
    arms: 1, count: 2000, radius: 3.2, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#fff5cc', colorOutside: '#443300', randomMul: 0.6,
    position: new THREE.Vector3(-35, -10, 18),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.2, 0.1),
    distance: '31 million ly', stars: '~800 billion',
    description: 'Lenticular with prominent dust lane and bright nucleus',
  },
  {
    key: 'pinwheel', name: 'Pinwheel (M101)', type: 'spiral',
    arms: 5, count: 2800, radius: 4.2, scaleMin: 0.001, scaleMax: 0.065,
    colorInside: '#aaddff', colorOutside: '#002255', randomMul: 1.1,
    position: new THREE.Vector3(32, -5, 25), rotation: new THREE.Euler(0.05, 0.2, 0.0),
    distance: '21 million ly', stars: '~1 trillion',
    description: 'Face-on grand spiral in Ursa Major',
  },
  {
    key: 'cigar', name: 'Cigar (M82)', type: 'irregular',
    arms: 1, count: 1800, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa44', colorOutside: '#441100', randomMul: 0.4,
    position: new THREE.Vector3(30, 7, 22),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.3, 0.1),
    distance: '12 million ly', stars: '~30 billion',
    description: 'Edge-on starburst galaxy; companion to M81',
  },
  {
    key: 'bodesGalaxy', name: "Bode's Galaxy (M81)", type: 'spiral',
    arms: 2, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffddaa', colorOutside: '#553300', randomMul: 0.9,
    position: new THREE.Vector3(28, 6, 20), rotation: new THREE.Euler(0.3, 0.4, 0.05),
    distance: '12 million ly', stars: '~250 billion',
    description: 'Interacting with M82 and NGC 3077',
  },
  {
    key: 'sunflower', name: 'Sunflower (M63)', type: 'spiral',
    arms: 3, count: 1800, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffcc88', colorOutside: '#442200', randomMul: 1.0,
    position: new THREE.Vector3(25, 4, -28), rotation: new THREE.Euler(0.6, 0.3, 0.2),
    distance: '37 million ly', stars: '~400 billion',
    description: 'Flocculent spiral with many short arm segments',
  },
  {
    key: 'blackEye', name: 'Black Eye (M64)', type: 'spiral',
    arms: 2, count: 1600, radius: 2.8, scaleMin: 0.001, scaleMax: 0.05,
    colorInside: '#ffbbaa', colorOutside: '#220000', randomMul: 0.9,
    position: new THREE.Vector3(-22, 2, -32), rotation: new THREE.Euler(0.2, 0.6, 0.1),
    distance: '17 million ly', stars: '~100 billion',
    description: 'Dark dust lane in front of bright nucleus',
  },
  {
    key: 'centaurusA', name: 'Centaurus A (NGC 5128)', type: 'elliptical',
    arms: 1, count: 2000, radius: 3.0, scaleMin: 0.001, scaleMax: 0.055,
    colorInside: '#ffeecc', colorOutside: '#333300', randomMul: 0.5,
    position: new THREE.Vector3(-26, -6, 20),
    rotation: new THREE.Euler(Math.PI * 0.25, 0.1, 0.0),
    distance: '13 million ly', stars: '~100 billion',
    description: 'Closest radio galaxy to Earth; active galactic nucleus',
  },
  {
    key: 'virgoA', name: 'Virgo A (M87)', type: 'elliptical',
    arms: 1, count: 2200, radius: 3.5, scaleMin: 0.001, scaleMax: 0.06,
    colorInside: '#ffeeaa', colorOutside: '#443300', randomMul: 0.4,
    position: new THREE.Vector3(-42, 10, -25), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '53 million ly', stars: '~1 trillion',
    description: 'Giant elliptical; first black hole ever imaged (EHT 2019)',
  },
  {
    key: 'cartwheel', name: 'Cartwheel Galaxy', type: 'irregular',
    arms: 1, count: 1400, radius: 2.4, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#aaffff', colorOutside: '#004444', randomMul: 0.5,
    position: new THREE.Vector3(40, -12, -30), rotation: new THREE.Euler(0.1, 0.2, 0.0),
    distance: '500 million ly', stars: '~few billion',
    description: 'Ring galaxy formed by collision; JWST imaging target',
  },
  {
    key: 'antennae1', name: 'Antennae (NGC 4038)', type: 'irregular',
    arms: 2, count: 1500, radius: 2.5, scaleMin: 0.001, scaleMax: 0.045,
    colorInside: '#ffaa88', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(-30, -8, 35), rotation: new THREE.Euler(0.4, 0.5, 0.3),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Colliding pair; classic merger in progress',
  },
  {
    key: 'antennae2', name: 'Antennae (NGC 4039)', type: 'irregular',
    arms: 2, count: 1200, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ff9977', colorOutside: '#330011', randomMul: 2.2,
    position: new THREE.Vector3(-28, -9, 37), rotation: new THREE.Euler(0.5, 0.4, 0.4),
    distance: '45 million ly', stars: '~few hundred billion',
    description: 'Merging companion to NGC 4038',
  },
  {
    key: 'mice1', name: 'Mice (NGC 4676A)', type: 'spiral',
    arms: 2, count: 1200, radius: 2.3, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#ccddff', colorOutside: '#112244', randomMul: 1.8,
    position: new THREE.Vector3(45, 5, 10), rotation: new THREE.Euler(0.3, 0.2, 0.5),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding pair with long tidal tails resembling mice',
  },
  {
    key: 'mice2', name: 'Mice (NGC 4676B)', type: 'spiral',
    arms: 2, count: 1000, radius: 2.0, scaleMin: 0.001, scaleMax: 0.038,
    colorInside: '#bbccff', colorOutside: '#001133', randomMul: 1.9,
    position: new THREE.Vector3(47, 4, 12), rotation: new THREE.Euler(0.4, 0.3, 0.6),
    distance: '300 million ly', stars: '~100 billion',
    description: 'Colliding companion to NGC 4676A',
  },
  {
    key: 'stephan1', name: "Stephan's Quintet (NGC 7317)", type: 'elliptical',
    arms: 1, count: 800, radius: 1.6, scaleMin: 0.001, scaleMax: 0.03,
    colorInside: '#ffcc99', colorOutside: '#442200', randomMul: 0.7,
    position: new THREE.Vector3(50, 8, -35), rotation: new THREE.Euler(0.2, 0.3, 0.1),
    distance: '300 million ly', stars: '~tens of billions',
    description: "Part of Stephan's Quintet compact group",
  },
  {
    key: 'stephan2', name: "Stephan's Quintet (NGC 7318)", type: 'spiral',
    arms: 2, count: 900, radius: 1.7, scaleMin: 0.001, scaleMax: 0.032,
    colorInside: '#aabbff', colorOutside: '#112266', randomMul: 1.5,
    position: new THREE.Vector3(51, 7, -33), rotation: new THREE.Euler(0.3, 0.4, 0.2),
    distance: '300 million ly', stars: '~tens of billions',
    description: 'Interacting pair; first JWST image subject',
  },
  {
    key: 'circinus', name: 'Circinus Galaxy', type: 'spiral',
    arms: 2, count: 1300, radius: 2.2, scaleMin: 0.001, scaleMax: 0.04,
    colorInside: '#aaffaa', colorOutside: '#004400', randomMul: 1.2,
    position: new THREE.Vector3(8, -14, 10),
    rotation: new THREE.Euler(Math.PI * 0.45, 0.4, 0.2),
    distance: '13 million ly', stars: '~tens of billions',
    description: 'Active Seyfert 2; hidden behind the Milky Way plane',
  },

  // ── DEEP FIELD BACKGROUND (distant, small) ─────────────────────────────────
  {
    key: 'deepA', name: 'Deep Field A', type: 'elliptical',
    arms: 1, count: 500, radius: 1.2, scaleMin: 0.0005, scaleMax: 0.02,
    colorInside: '#ffddaa', colorOutside: '#442211', randomMul: 0.5,
    position: new THREE.Vector3(60, 15, 40), rotation: new THREE.Euler(0.1, 0.5, 0.2),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background elliptical',
  },
  {
    key: 'deepB', name: 'Deep Field B', type: 'spiral',
    arms: 2, count: 600, radius: 1.3, scaleMin: 0.0005, scaleMax: 0.022,
    colorInside: '#bbccff', colorOutside: '#001144', randomMul: 1.0,
    position: new THREE.Vector3(-55, -18, -45), rotation: new THREE.Euler(0.3, 1.0, 0.4),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant background spiral',
  },
  {
    key: 'deepC', name: 'Deep Field C', type: 'irregular',
    arms: 1, count: 400, radius: 0.9, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffaacc', colorOutside: '#440022', randomMul: 2.0,
    position: new THREE.Vector3(48, -20, -50), rotation: new THREE.Euler(0.6, 0.8, 0.5),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant irregular background galaxy',
  },
  {
    key: 'deepD', name: 'Deep Field D', type: 'elliptical',
    arms: 1, count: 450, radius: 1.0, scaleMin: 0.0005, scaleMax: 0.018,
    colorInside: '#ffeecc', colorOutside: '#332200', randomMul: 0.4,
    position: new THREE.Vector3(-60, 20, 30), rotation: new THREE.Euler(0.2, 0.9, 0.1),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant elliptical background galaxy',
  },
  {
    key: 'deepE', name: 'Deep Field E', type: 'spiral',
    arms: 3, count: 550, radius: 1.1, scaleMin: 0.0005, scaleMax: 0.019,
    colorInside: '#aaffdd', colorOutside: '#003322', randomMul: 1.1,
    position: new THREE.Vector3(55, 12, -55), rotation: new THREE.Euler(0.4, 1.2, 0.3),
    distance: '>1 billion ly', stars: 'unknown', description: 'Distant spiral background galaxy',
  },
  
]

/**
 * buildGalaxy(def, time, brightness, nodeModules)
 * ─────────────────────────────────────────────────────────────────────────────
 * Builds a complete SpriteNodeMaterial galaxy mesh from a definition entry.
 *
 * @param  def          — one entry from GALAXY_DEFINITIONS
 * @param  time         — timerGlobal(0.5) node, created once in your main file
 * @param  brightness   — overall brightness multiplier (default 2.5)
 * @param  nodeModules  — destructured from 'three/examples/jsm/nodes/Nodes.js'
 *
 * @returns { mesh, mat, colorInside, colorOutside }
 *   mesh         — THREE.Mesh with isInstancedMesh=true, ready to add to scene
 *   mat          — SpriteNodeMaterial (for live colour editing)
 *   colorInside  — uniform node (call .value.set(hex) to change)
 *   colorOutside — uniform node
 *
 * Example usage in script.js:
 *
 *   import { GALAXY_DEFINITIONS, buildGalaxy } from './galaxyData.js'
 *   import { ..., timerGlobal } from 'three/examples/jsm/nodes/Nodes.js'
 *   import * as NodeModules from 'three/examples/jsm/nodes/Nodes.js'
 *
 *   const time = timerGlobal(0.5)
 *
 *   GALAXY_DEFINITIONS.forEach(def => {
 *     const { mesh } = buildGalaxy(def, time, 2.5, NodeModules)
 *     scene.add(mesh)
 *   })
 */
export function buildGalaxy(def, time, brightness = 2.5, nodeModules) {
  const {
    SpriteNodeMaterial, color, cos, float, mix,
    range, sin, uniform, uv, vec3, vec4,
  } = nodeModules

  const mat = new SpriteNodeMaterial({
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
  })

  mat.scaleNode = range(def.scaleMin, def.scaleMax)

  const radiusRatio = range(0, 1)
  const radius      = radiusRatio.pow(1.5).mul(def.radius)
  const arms        = Math.max(1, def.arms)
  const branchAngle = range(0, arms).floor().mul(Math.PI * 2 / arms)
  const angle       = branchAngle.add(time.mul(radiusRatio.oneMinus()))

  const pos3 = vec3(cos(angle), 0, sin(angle)).mul(radius)

  // Irregular / elliptical galaxies get extra scatter
  const scatter = def.type === 'elliptical' ? 0.5
                : def.type === 'dwarf'      ? def.randomMul * 1.2
                : def.type === 'irregular'  ? def.randomMul * 1.5
                : def.randomMul
  const random = range(vec3(-1), vec3(1)).pow(3).mul(radiusRatio).mul(scatter).add(0.2)

  mat.positionNode = pos3.add(random)

  const cIn    = uniform(color(def.colorInside))
  const cOut   = uniform(color(def.colorOutside))
  const col    = mix(cIn, cOut, radiusRatio.oneMinus().pow(2).oneMinus()).mul(brightness)
  const alpha  = float(0.1).div(uv().sub(0.5).length()).sub(0.2)
  mat.colorNode = vec4(col, alpha)

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat)
  mesh.isInstancedMesh = true
  mesh.count           = def.count
  mesh.position.copy(def.position)
  mesh.rotation.copy(def.rotation)
  mesh.userData.galaxyKey  = def.key
  mesh.userData.galaxyName = def.name

  return { mesh, mat, colorInside: cIn, colorOutside: cOut }
}