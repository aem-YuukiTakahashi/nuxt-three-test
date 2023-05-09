varying vec2 vUv;
varying vec3 vNormal;

uniform float utime;
uniform float amplitude;

attribute float displacement;

void main(){
  
  vNormal=normal;
  vUv=uv;
  
  vec3 newPosition=position+amplitude*normal*vec3(displacement);
  
  gl_Position=projectionMatrix*modelViewMatrix*vec4(newPosition,1.);
}