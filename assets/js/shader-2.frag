varying vec2 vUv;
varying vec3 vNormal;

uniform sampler2D uTexture;

void main(){
  vec4 tcolor=texture2D(uTexture,vUv);
  gl_FragColor=tcolor;
}