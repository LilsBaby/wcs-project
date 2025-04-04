export function getDistanceBetweenVectors(v1: Vector3, v2: Vector3) {
    return v2.sub(v1).Magnitude
}