
function knightDistance(cell1, cell2) {
    const knightMoves = [
        [-2, -1], [-2, 1], [2, -1], [2, 1],
        [-1, -2], [-1, 2], [1, -2], [1, 2]
    ];

    const queue = [];
    const visited = new Set();

    queue.push({ cell: cell1, distance: 0 });

    while (queue.length > 0) {
        const { cell, distance } = queue.shift();

        if (cell[0] === cell2[0] && cell[1] === cell2[1]) {
            return distance;
        }

        for (const move of knightMoves) {
            const newRow = cell[0] + move[0];
            const newCol = cell[1] + move[1];
            const newCell = [newRow, newCol];
            
            if (
                newRow >= 0 && newRow < 8 &&
                newCol >= 0 && newCol < 8 &&
                !visited.has(newCell)
            ) {
                visited.add(newCell);
                queue.push({ cell: newCell, distance: distance + 1 });
            }
        }
    }

    return -1; 
}
function kNearestNeighbors(trainingData, queryPoint, k, distanceMeasure) {
    const distances = [];
    for (const dataPoint of trainingData) {
        const distance = distanceMeasure(queryPoint, dataPoint.cell);
        distances.push({ point: dataPoint, distance });
    }
    distances.sort((a, b) => a.distance - b.distance);
    const nearestNeighbors = distances.slice(0, k);
    return nearestNeighbors;
}
function generateTrainingSet() {
    const trainingSet = [];
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            trainingSet.push({ cell: [row, col] });
        }
    }
    return trainingSet;
}

const trainingData = generateTrainingSet();
const queryPoint = [0, 0]; 
const k = 64; 
const nearestNeighbors = kNearestNeighbors(trainingData, queryPoint, k, knightDistance);
nearestNeighbors.forEach(neighbor => {
    console.log(`Cella: [${neighbor.point.cell}] - Distanza: ${neighbor.distance}`);
});
