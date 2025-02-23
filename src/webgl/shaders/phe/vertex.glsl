uniform float uAudioFrequency;
uniform float uTime;

varying vec3 vPosition;

void main() {
    vec3 newPosition = position;

    float intensity = uAudioFrequency * 2.0;
    newPosition.z += sin(newPosition.x * 5.0 + uTime) * intensity;
    newPosition.z += sin(newPosition.y * 5.0 + uTime) * intensity;

    vPosition = newPosition;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
