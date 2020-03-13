function LevelData() {
    var obj =
        {
            "size": "3",
            "level": [
                { "dirIn": 0, "dirOut": 1, "id": "1_0", "z": "1", "x": "0", "size": "4" },
                { "dirIn": 1, "dirOut": 3, "id": "2_0", "z": "2", "x": "0", "size": "4" },

                { "dirIn": 2, "dirOut": 4, "id": "2_1", "z": "2", "x": "1", "size": "4" },
                { "dirIn": 3, "dirOut": 5, "id": "2_2", "z": "2", "x": "2", "size": "4" },
                { "dirIn": 0, "dirOut": 5, "id": "1_2", "z": "1", "x": "2", "size": "4" },
                { "dirIn": 4, "dirOut": 2, "id": "1_1", "z": "1", "x": "1", "size": "4" }
            ],
            "enemies": [
                { "id": "0", "x": "150", "z": "800", "type": "enemy" },
                { "id": "1", "x": "200", "z": "1200", "type": "enemy" },
                { "id": "2", "x": "800", "z": "1700", "type": "enemy" },
            ],
            "fire": [
                { "id": "0", "x": "-30", "z": "550", "type": "fire" },
                { "id": "1", "x": "-30", "z": "1300", "type": "fire" },
                { "id": "2", "x": "600", "z": "1700", "type": "fire" },
            
            ],
        }

    this.getLevelData = function () {
        return obj
    }
}