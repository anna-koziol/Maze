var mixer2 = [];
function Ally() {
    var container = new THREE.Object3D
    var mixer
    var action = "run";
    var meshModel, clone;
    var clock = new THREE.Clock();
    mixer = new THREE.AnimationMixer(meshModel);

    this.loadRing = function (url, callback) {
            var tab = null;
            var geometry = new THREE.RingGeometry(110, 100, 8);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.name = "ring"
            mesh.rotateX(3.14 / 2);
            //dodanie modelu do kontenera
            tab = mesh;
            Settings.ring = tab;
            // zwrócenie kontenera
            return tab;
    }

    this.loadModel = function (url, callback) {

        var loader = new THREE.JSONLoader();

        var modelMaterial = new THREE.MeshBasicMaterial(
            {
                map: THREE.ImageUtils.loadTexture("Spider.jpg"),
                morphTargets: true // odpowiada za animację materiału modelu

            });

        loader.load('Tris2.js', function (geometry) {
            // ładowanie modelu jak porzednio
            meshModel = new THREE.Mesh(geometry, modelMaterial)
            meshModel.position.y = 50; // ustaw pozycje modelu
            meshModel.scale.set(3, 3, 3); // ustaw skalę modelu
            meshModel.name = "ally"
            //utworzenie mixera
            mixer2.push(new THREE.AnimationMixer(meshModel));
            mixer2[ mixer2.length-1].clipAction("run").play();
            //dodanie modelu do kontenera
            container.add(meshModel)

            // zwrócenie kontenera
            callback(container);
        });
    }

    //update mixera
    this.getModel = function () {
        return meshModel;
    }

    this.updateModel = function () {
        var delta = clock.getDelta();
        //if (mixer) mixer.update(delta)
        if (mixer2.length > 0) {
            for (var i = 0; i < mixer2.length; i++) {
                mixer2[i].update(delta)
            }
        }
    }
}