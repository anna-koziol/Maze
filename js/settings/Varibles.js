var hex, doors, player, angle, angle2;
var click = false;
var speed = 10;
var clock = new THREE.Clock();
var form = null;
var allies = [];
var allyVector, allyDirection;

var clickedVect, directionVect;
var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector2();

var raycasterCol = new THREE.Raycaster();
var mouseVectorCol = new THREE.Vector2();