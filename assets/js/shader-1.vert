uniform float amplitude;

attribute float displacement;

varying vec3 vNormal;
varying vec2 vUv;

void main(){
  vUv=uv;
  vec4 mvPosition=modelViewMatrix*vec4(position,1.);
  gl_Position=projectionMatrix*mvPosition;
}