var scene, camera, sphere, renderer, sphere2, stats, plansza;
function SceneLoad() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    $("#root").append(renderer.domElement);
    camera.lookAt(scene.position);

    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    var planszag = new THREE.PlaneGeometry(5000, 5000, 10, 10);
    plansza = new THREE.Mesh(planszag, material.materialg);
    plansza.rotateX(Math.PI / 2);
    plansza.position.set(0, -50, 0);
    plansza.name = "plansza"
    scene.add(plansza);

    var light = new THREE.AmbientLight(0x515151);
    scene.add(light);

    var geometryS = new THREE.SphereGeometry(60, 32, 32);
    sphere = new THREE.Mesh(geometryS, material.materialS);
    sphere.position.set(0, 0, 0)
    scene.add(sphere);


    var geometryS2 = new THREE.SphereGeometry(20, 32, 32);
    sphere2 = new THREE.Mesh(geometryS2, material.materialS2);
    sphere2.position.set(600, 0, 1350)
    scene.add(sphere2);

    camera.position.set(860, 600, 2800)
    camera.lookAt(scene.position)
}