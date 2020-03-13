function Laser() {
    var container = new THREE.Object3D();
    var particles = new THREE.Geometry() // geometria - tablica cząsteczek
    var particleMaterial = new THREE.PointsMaterial({
        color: 0x0A1B1F,
        size: 70, // ta wartośc zmieniamy suwakiem skali
        map: new THREE.TextureLoader().load("particle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0.6
    });
    var particleSystem = new THREE.Points(particles, particleMaterial);    

    var v1 = new THREE.Vector3(0, -100, 0)
    var v2 = new THREE.Vector3(0, -100, 100)
    var particlesCount = 60;

    //wektor będący różnicą pomiędzy nimi
    var subV = v2.clone().sub(v1.clone())
    var stepV = subV.divideScalar(particlesCount) // particlesCount - przewidywana ilość cząsteczek


    this.loadLaser = function () {
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < particlesCount; i++) {
                var particle = new THREE.Vector3(
                    v1.x + stepV.x * i,
                    v1.y + stepV.y * i,
                    v1.z + stepV.z * i)
                particles.vertices.push(particle);
            }

            particleSystem.position.set(0, -30 *  (-j) - 50, 0).clone(); 
            container.add(particleSystem.clone());
            //particleSystem.clone().material.size = 60;
        }

        return container
    }

    this.update = function () {
        var verts = particles.vertices

        for (var i = 0; i < verts.length; i++) {
            var particle1 = verts[i];
            // tu zmieniaj losowo pozycję x,y,z każdej z cząsteczek       
            particle1.x = Math.floor(Math.random() * 100) + 1;
            particle1.y = Math.floor(Math.random() * 5) + 1;
            particle1.z = Math.floor(Math.random() * 1) + 1;
        }

        particleSystem.geometry.verticesNeedUpdate = true; // ta funkcja wymusza zmiany w systemie cząsteczek
    }
}

