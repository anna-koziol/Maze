var tabHex = [];
function Hex() {
    var side;
    var h = Settings.h;
    var a = (2 * h) / Math.sqrt(3) + 25;
    var geometry = new THREE.BoxGeometry(a, 200, 50);
    var container = new THREE.Object3D()
    var wall = new THREE.Mesh(geometry, material.materialWall);

    data = new LevelData();
    var doors = data.getLevelData().level;

    for (var i = 0; i < 6; i++) {
        if ((i != doors[Settings.j].dirIn) && (i != doors[Settings.j].dirOut)) {
            side = wall.clone()
            tabHex.push(side)
        }
        else {
            side = new Doors().getDoors();
            tabHex.push(side.children[0])
            tabHex.push(side.children[1])            
        }

        side.position.x = h * Math.sin(i * (Math.PI / 3));
        side.position.z = h * Math.cos(i * (Math.PI / 3));
        side.lookAt(container.position)

        container.add(side)
    }

    this.getHex = function () {
        return container
    }

    this.getTabHex = function () {
        return tabHex
    }
}
