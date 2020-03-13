var tabsLaser = [];
function Doors() {
    var h = Settings.h;
    var a = (2 * h) / Math.sqrt(3)
    var geometry = new THREE.BoxGeometry(a / 5, 200, 50);
    var container = new THREE.Object3D()

    var door = new THREE.Mesh(geometry, material.materialWall);
    var side = door.clone()
    side.position.x = -h / 2.5;
    container.add(side)

    var door = new THREE.Mesh(geometry, material);
    var side = door.clone()
    side.position.x = h / 2.5;
    container.add(side)

    //DODANIE DRZWI-LASERÓW
    var laserFunction = new Laser();
    tabsLaser.push(laserFunction)

    var laser = laserFunction.loadLaser();
    //laser.rotateY(Math.PI/2);
    container.add(laser);
    

    this.getDoors = function () {
        return container
    }
}

