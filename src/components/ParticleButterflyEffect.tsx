import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 60000;

const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  uniform float uPointSize;
  uniform float uEffectIntensity;
  attribute vec3 targetPosition;
  attribute vec3 targetColor;
  attribute vec3 color;
  attribute vec3 randomOffset;
  varying vec3 vColor;
  varying float vDistance;

  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;
    x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  void main(){
    vColor=mix(color,targetColor,uMorph);
    vec3 pos=mix(position,targetPosition,uMorph);
    float turb=snoise(pos.xy*0.3+uTime*0.5);
    vec3 scatterDir=normalize(pos+randomOffset*0.5);
    float scatterDist=length(pos)*0.5+randomOffset.x*3.0;
    vec3 scattered=pos+scatterDir*scatterDist*uEffectIntensity*2.5;
    scattered+=vec3(turb,turb*0.5,turb*0.3)*uEffectIntensity*1.5;
    pos=mix(position,scattered,uEffectIntensity*(1.0-uMorph));
    vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);
    float dist=length(pos);
    vDistance=dist;
    gl_PointSize=(uPointSize/-mvPosition.z)*(1.2+sin(uTime*3.0+dist*0.15)*0.5);
    gl_Position=projectionMatrix*mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vDistance;
  void main(){
    float dist=distance(gl_PointCoord,vec2(0.5));
    if(dist>0.5)discard;
    float strength=pow(1.0-dist*2.0,1.6);
    vec3 finalColor=vColor*2.0;
    float alpha=strength*(0.8+sin(vDistance*0.3+uTime)*0.2);
    gl_FragColor=vec4(finalColor,alpha*uOpacity);
  }
`;

interface ParticleButterflyEffectProps {
  /** Night: green #00ff66 + white. Day: dark green #14532d + tender yellow #FDE047 */
  variant: 'night' | 'day';
  height?: string;
  opacity?: number;
}

const ParticleButterflyEffect = ({ variant, height = '400px', opacity = 1 }: ParticleButterflyEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Night: neon green #22c55e + white — additive glow on dark
    // Day: deep green + yellow — vibrant on warm light bg
    const primaryColor = new THREE.Color(variant === 'night' ? '#22c55e' : '#15803d');
    const secondaryColor = new THREE.Color(variant === 'night' ? '#ffffff' : '#fde047');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    const w = el.clientWidth || window.innerWidth;
    const h = el.clientHeight || window.innerHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    el.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const targetColors = new Float32Array(PARTICLE_COUNT * 3);
    const randomOffsets = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const t = (i / PARTICLE_COUNT) * Math.PI * 12;
      const scale = 5.5;
      const exp = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
      const x = Math.sin(t) * exp * scale;
      const y = Math.cos(t) * exp * scale;
      const z = (Math.random() - 0.5) * 15;
      const spread = 2.5;
      positions[i3] = x + (Math.random() - 0.5) * spread;
      positions[i3 + 1] = y + (Math.random() - 0.5) * spread;
      positions[i3 + 2] = z;
      targetPositions[i3] = positions[i3];
      targetPositions[i3 + 1] = positions[i3 + 1];
      targetPositions[i3 + 2] = positions[i3 + 2];
      randomOffsets[i3] = (Math.random() - 0.5) * 2;
      randomOffsets[i3 + 1] = (Math.random() - 0.5) * 2;
      randomOffsets[i3 + 2] = (Math.random() - 0.5) * 2;
      const color = Math.random() > 0.7 ? primaryColor : secondaryColor;
      colors[i3] = color.r; colors[i3 + 1] = color.g; colors[i3 + 2] = color.b;
      targetColors[i3] = color.r; targetColors[i3 + 1] = color.g; targetColors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('targetColor', new THREE.BufferAttribute(targetColors, 3));
    geometry.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uPointSize: { value: 80 },
        uEffectIntensity: { value: 1 },
        uOpacity: { value: opacity },
      },
      depthWrite: false,
      blending: variant === 'night' ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let time = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;
      points.rotation.y += 0.0025;
      points.rotation.z += 0.001;
      points.rotation.x = Math.sin(time * 0.15) * 0.12;
      material.uniforms.uTime.value = time;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="w-full h-full pointer-events-none select-none"
      style={{ opacity }}
    />
  );
};

export default ParticleButterflyEffect;
