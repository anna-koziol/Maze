$(document).ready(function () {
    var enemyCont;
    //ŁADOWANIE PODST ELEMENTÓW SCENY
    SceneLoad();
    //ŁADOWANIE MODELU
    var model = new Model()
    model.loadModel("Model.js", function (data) {
        data.position.z = 1500;
        data.position.x = 600;
        scene.add(data)
        form = data;
    })

    //ENEMY
    var enemymodel = new Enemy()
    enemymodel.loadModel("Enemy.js", function (data) {
        data.position.z = 1600;
        data.position.x = 800;
        scene.add(data)
        enemyCont = data;
    })

    //FUNCKJA NA KLIK W ALLY + PRZEMISZCZANIE  POSTACI GŁÓWNEJ
    var ii = 1;
    $(document).mousedown(function (event) {
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            if (intersects[0].object.name == "ally" && intersects[0].object.clickedRing == undefined) {
                intersects[0].object.clickedRing = true;
                intersects[0].object.parent.position.x = model.getCont().position.x + (100 * ii);
                intersects[0].object.parent.position.z = model.getCont().position.z + (100 * ii);

                intersects[0].object.parent.position.y = model.getCont().position.y;
                Settings.clickAlly.push(intersects[0].object);
                ii++;
            }
            if (intersects[0].object.name == "plansza") {
                clickedVect = intersects[0].point
                directionVect = clickedVect.clone().sub(form.position).normalize()

                sphere.position.set(clickedVect.x, 0, clickedVect.z)
                camera.lookAt(scene.position)

                angle = Math.atan2(
                    form.position.clone().x - clickedVect.x,
                    form.position.clone().z - clickedVect.z
                )

                model.getModel().rotation.y = angle - (Math.PI / 2);
                //form.children[2].rotation.y = angle - (Math.PI);

                for (var i = 0; i < Settings.clickAlly.length; i++) {
                    Settings.clickAlly[i].rotation.y = angle - (Math.PI / 2);
                }
                click = true;
            }
        }
    });

    //POJAWANIE SIĘ RINGA PO NAJECHANIU NA ALLY
    var counterRing = 0;
    var allyRing = new Ally();
    $(document).mousemove(function (event) {
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;

        raycaster.setFromCamera(mouseVector, camera);

        var intersectsAliens = raycaster.intersectObjects(scene.children, true);
        if (intersectsAliens.length > 0) {
            if (intersectsAliens[0].object.name == "ally" && counterRing == 0 && intersectsAliens[0].object.clickedRing == undefined) {
                var ring = allyRing.loadRing()
                ring.position.x = intersectsAliens[0].object.parent.position.x;
                ring.position.z = intersectsAliens[0].object.parent.position.z;
                scene.add(ring)
                counterRing++;
            }
            else {
                setTimeout(function () {
                    scene.remove(Settings.ring);
                    counterRing = 0;
                }, 3000);
            }
        }
    });

    data = new LevelData();
    var level = data.getLevelData().level;
    //DODANIE OGNIA
    var firesObj = data.getLevelData().fire;

    for (var i = 0; i < firesObj.length; i++) {
        var fire = new Fire()
        var fire2 = fire.loadFire();
        fire2.position.x = firesObj[i].x;
        fire2.position.z = firesObj[i].z;
        fire2.name = "fire"
        scene.add(fire2)
    };

    //DODANIE HEXÓW
    for (var j = 0; j < level.length; j++) {
        hex = new Hex();
        hex.getHex().position.y = 100;
        var container = hex.getHex();

        if (parseInt(level[Settings.j].x) % 2 == 0) {
            container.position.x = (Settings.h * Math.sqrt(3)) * parseInt(level[Settings.j].x);
            container.position.z = 1.15 * (Settings.h * Math.sqrt(3)) * parseInt(level[Settings.j].z);
        }
        else {
            container.position.x = (Settings.h * Math.sqrt(3)) * parseInt(level[Settings.j].x);
            container.position.z = 1.15 * (Settings.h * Math.sqrt(3)) * parseInt(level[Settings.j].z) + 1.15 * ((Settings.h * Math.sqrt(3)) / 2);
        }
        scene.add(container);
        Settings.j += 1;
    }

    //DODANIE ALLY NA SCENĘ
    var allies = data.getLevelData().enemies;

    var counter = 0;
    var move = false;
    var interval = setInterval(function () {
        var ally = new Ally();

        ally.loadModel("Ally.js", function (ally) {
            ally.position.x = allies[counter].x;
            ally.position.z = allies[counter].z;

            scene.add(ally)
            counter++;
        })

        if (counter >= allies.length - 1) {
            clearInterval(interval);
            move = true;
        }
    }, 1000);

    function collision() {
        var vect = form.position.clone();
        vect.y = 0;
        var ray = new THREE.Ray(vect, form.children[0].getWorldDirection().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2))
        raycaster.ray = ray;
        var intersectsC = raycaster.intersectObjects(tabHex, true);

        if (intersectsC[0]) {
            sphere2.position.set(intersectsC[0].point.x, intersectsC[0].point.y, intersectsC[0].point.z)
            if (intersectsC[0].distance < 100) {
                speed = 0;
            }
        }
    }

    function allyFollow() {
        for (var i = 0; i < Settings.clickAlly.length; i++) {
            if (i == 0) {
                allyVector = form.position;
            }
            else {
                allyVector = Settings.clickAlly[i - 1].parent.position;
            }

            allyDirection = allyVector.clone().sub(Settings.clickAlly[i].parent.position).normalize();

            if (Settings.clickAlly[i].parent.position.clone().distanceTo(allyVector) > 150) {
                Settings.clickAlly[i].parent.translateOnAxis(allyDirection, speed)
            }

        }
    }

    //RENDER
    var pom = 300;
    var toLeft = true;
    var laserFunction1 = new Laser();
    var enemy = enemymodel.getCont();
    var angleLine = 0;
    var raycasterLine = new THREE.Raycaster();
    var loose = false;

    function render() {
        stats.begin();
        fire.update();

        for (var jkk = 0; jkk < tabsLaser.length; jkk++) {
            tabsLaser[jkk].update();
        }

        if (toLeft) {
            if (enemy.position.x >= 650) { toLeft = false }
            pom += 2;
            enemy.position.set(pom, 0, 1500)
            enemy.rotation.y = Math.PI;
            //ruch linii
            if (enemy.children[2]) {
                enemy.children[2].rotation.y = Math.PI / 7 * Math.sin(angleLine);
                angleLine += 0.1;
            }
        }
        else {
            if (enemy.position.x <= 400) { toLeft = true }
            pom -= 2;
            enemy.position.set(pom, 0, 1500)
            enemy.rotation.y = 2 * Math.PI;
            if (enemy.children[2]) {
                enemy.children[2].rotation.y = Math.PI / 7 * Math.sin(angleLine);
                angleLine += 0.1;
            }
        }

        //ANIMACJE DLA ALLY
        var delta = clock.getDelta();
        if (mixer2.length > 0) {
            for (var i = 0; i < mixer2.length; i++) {
                mixer2[i].update(delta)
            }
        }

        //ANIAMCJA DLA ENEMY
        if (movingEnemy.length > 0) { movingEnemy[0].update(delta) }


        //PRZEMISZCZANIE GŁÓWNEJ POSTACI
        if (click) {
            form.translateOnAxis(directionVect, speed)

            if (form.position.clone().distanceTo(clickedVect) < 10) {
                speed = 0;
            }
            else {
                speed = 20;
                model.updateModel();
                model.setAnimation();
            }
        }



        if (form && form.children[0] && enemy.children[0]) {
            camera.position.x = form.position.x
            camera.position.z = form.position.z + 800
            camera.position.y = form.position.y + 1200
            camera.lookAt(form.position)
            collision();

            ///
            //ZABIJANIE
            /*var rayLine = new THREE.Ray(enemy.position, enemy.getWorldDirection());
            raycaster.ray = rayLine;

            var intersectsLine = raycaster.intersectObject(form.children[0], true);
            if (intersectsLine[0]) {
                console.log("pykło")
                //if(intersectsLine[0].distance < 70 ) {console.log("SSIESZ PAŁĘ FRAJERZE")}
                //console.log(intersectsLine[0].distance) // odległość od vertex-a na wprost, zgodnie z kierunkiem ruchu
            }*/

            var rayLine = new THREE.Ray(form.position.clone(), form.children[0].getWorldDirection().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2))
            raycaster.rayLine = rayLine;
            var intersectsLine = raycaster.intersectObject(enemy.children[0], true);
            if (intersectsLine[0]) {
                if (intersectsLine[0].distance < 90) {
                    console.log("Loose")
                    loose = true;
                    $("#end").css("display", "block");
                }
                console.log(intersectsLine[0].distance)
            }
        }

        allyFollow();
        if(!loose) {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

        stats.end();
    }

    camera.fov = 34;
    camera.updateProjectionMatrix();
    render();

})

