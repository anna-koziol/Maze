var movingEnemy = [];
function Enemy() {
    var container = new THREE.Object3D
    var mixer
    var action = "run";
    var meshModel, clone;
    var clock = new THREE.Clock();
    mixer = new THREE.AnimationMixer(meshModel);

    this.loadModel = function (url, callback) {

        var loader = new THREE.JSONLoader();

        var modelMaterial = new THREE.MeshBasicMaterial(
            {
                map: THREE.ImageUtils.loadTexture("Spider2.jpg"),
                morphTargets: true // odpowiada za animację materiału modelu

            });

        loader.load('Tris2.js', function (geometry) {
            // ładowanie modelu jak porzednio
            meshModel = new THREE.Mesh(geometry, modelMaterial)
            meshModel.position.y = 50; // ustaw pozycje modelu
            meshModel.scale.set(3, 3, 3); // ustaw skalę modelu
            meshModel.name = "enemy"
            //utworzenie mixera
            movingEnemy.push(new THREE.AnimationMixer(meshModel));
            movingEnemy[movingEnemy.length - 1].clipAction("run").play();

            //dodanie modelu do kontenera
            container.add(meshModel)

            ///DODANIE RINGU + KRESKI
            var range = new THREE.Mesh(new THREE.RingGeometry(12, 100, 32, 32, -Math.PI / 6, Math.PI / 3), new THREE.MeshBasicMaterial({
                color: 0xcc1100,
                opacity: 0.4,
                side: THREE.DoubleSide,
                transparent: true
            }))
            range.rotation.x = Math.PI;
            range.rotation.z = Math.PI;

            var lineGeo = new THREE.Geometry();
            lineGeo.vertices.push(
                new THREE.Vector3(-100, 0, 0),
                new THREE.Vector3(0, 0, 0)
            )
            var line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({
                color: 0xcdd9e6
            }));

            container.add(range)
            container.add(line)

            // zwrócenie kontenera
            callback(container);
        });
    }

    //update mixera
    this.getModel = function () {
        return meshModel;
    }

    this.getCont = function () {
        return container;
    }

    this.updateModel = function () {
        var delta = clock.getDelta();
        //if (mixer) mixer.update(delta)
        if (movingEnemy.length > 0) {
            for (var i = 0; i < movingEnemy.length; i++) {
                movingEnemy[i].update(delta)
            }
        }
    }
}