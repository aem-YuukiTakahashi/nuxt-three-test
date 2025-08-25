varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform vec2 vScreenSize;

float rand(vec2 co){
  float a=fract(dot(co,vec2(2.067390879775102,12.451168662908249)))-.5;
  float s=a*(6.182785114200511+a*a*(-38.026512460676566+a*a*53.392573080032137));
  float t=fract(s*43758.5453);
  return t;
}

void main(){
  float radius=5.;
  float x=(vUv.x*vScreenSize.x)+rand(vUv)*radius*2.-radius;
  float y=(vUv.y*vScreenSize.y)+rand(vec2(vUv.y,vUv.x))*radius*2.-radius;
  vec4 textureColor=texture2D(tDiffuse,vec2(x,y)/vScreenSize);
  gl_FragColor=textureColor;
}