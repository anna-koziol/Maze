function Model() {

    var container = new THREE.Object3D
    var mixer
    var action = "jump";
    var mixer2 = [];
    var meshModel, clone, axes;
    var clock = new THREE.Clock();
    mixer = new THREE.AnimationMixer(meshModel);

    this.loadModel = function (url, callback) {

        var loader = new THREE.JSONLoader();

        var modelMaterial = new THREE.MeshBasicMaterial(
            {
                map: THREE.ImageUtils.loadTexture("ld.jpg"),
                morphTargets: true // odpowiada za animację materiału modelu

            });

        loader.load('tris.js', function (geometry) {
            // ładowanie modelu jak porzednio
            meshModel = new THREE.Mesh(geometry, modelMaterial)
            meshModel.name = "name";
            meshModel.position.y = 100; // ustaw pozycje modelu
            meshModel.scale.set(3, 3, 3); // ustaw skalę modelu
            meshModel.name = "tris"
            meshModel.castShadow = true
            //utworzenie mixera
            mixer = new THREE.AnimationMixer(meshModel);

            //dodanie modelu do kontenera
            container.add(meshModel)

            var light = new THREE.PointLight(0xFFFFFF, 3, 200);
            light.position.set(0, 200, 0);

            /* var light = new THREE.SpotLight(0xd4d4d4, 100, 500, 3.14/2);
             light.intensity = 1.7;
             light.penumbra  = 1;
             light.decay = 1;
             light.position.set(0, 500, 0);*/

            //light.castShadow = true
            container.add(light)

            axes = new THREE.AxesHelper(100)
            //container.add(axes)

            // zwrócenie kontenera
            callback(container);
        });
    }
    // update mixera

    this.getModel = function () {
        return meshModel;
    }

    this.getCont = function () {
        return container;
    }

    this.getAxes = function () {
        return axes;
    }

    this.updateModel = function () {
        var delta = clock.getDelta();
        if (mixer) mixer.update(delta)
        if (mixer2.length > 0) {
            for (var i = 0; i < mixer2.length; i++) {
                mixer2[i].update(delta)
            }
        }
    }

    //animowanie postaci
    this.setAnimation = function () {
        mixer.clipAction("run").play();
    }
}
