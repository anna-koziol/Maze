var fires = [];
function Fire() {
    var container = new THREE.Object3D()
    var scale = 0;

    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie kolorów poszczególnych cząsteczek
    });


    this.loadFire = function () {
        for (var i = 0; i < 300; i++) {
            var random = Math.floor((Math.random() * 5) + 1);
            var particle = new THREE.Mesh(geometry, material.clone())
            particle.scale.set(random, random, random);

            var angle = Math.floor(Math.random() * (360 + 1));
            var r = Math.floor(Math.random() * (50 + 1));
            particle.position.x = Math.cos(Math.floor(Math.random() * (360 + 1))) * Math.floor(Math.random() * (60 + 1));;
            particle.position.z = Math.sin(Math.floor(Math.random() * (360 + 1))) * Math.floor(Math.random() * (60 + 1));;            
            particle.position.y = Math.floor(Math.random() * (350));

            container.add(particle)
            fires.push(particle)
        }

        var light = new THREE.PointLight(0xff6600, 6, 200, Math.PI / 2);
        container.add(light)
        return container
    }

    this.update = function () {
        for (var i = 0; i < fires.length; i++) {
            fires[i].position.y = fires[i].position.y + Math.floor((Math.random() * 4) + 1);

            if (fires[i].position.y == 350) {
                fires[i].position.y = 0;
            }
            else if (fires[i].position.y > 350) {
                fires[i].position.y = 0;
                fires[i].material.opacity = 1;
            }
            else {

            }

            fires[i].material.opacity = fires[i].material.opacity - 0.025;
        }
    }
}

