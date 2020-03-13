var material = {
    materialg: new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 5,
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load("pod.jpg"),
    }),
    materialS: new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        side: THREE.DoubleSide,
        wireframe: true,
        transparent: true,
        opacity: 0.0
    }),
    materialWall:new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 5,
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load("wall.jpg"),
    }),
    materialS2: new THREE.MeshPhongMaterial({
        color: 0xFFFF00,
        side: THREE.DoubleSide,
        wireframe: true,
        transparent: true,
    }),
    

}