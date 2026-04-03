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
    vec3 originalPos=pos;
    float pulsePhase=uTime*2.5;
    float pulseFactor=1.0+sin(pulsePhase)*0.4*uEffectIntensity;
    float waveFactor=sin(pulsePhase+length(pos)*0.3)*0.3*uEffectIntensity;
    vec3 pulsed=pos*pulseFactor;
    pulsed+=normalize(pos)*waveFactor*3.0;
    float colorPulse=sin(pulsePhase*0.5)*0.5+0.5;
    vColor=mix(vColor,vec3(1.0,0.4,0.8),colorPulse*uEffectIntensity*0.2);
    pos=pulsed;
    vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);
    float dist=length(pos);
    vDistance=dist;
    float sizeMultiplier=1.0+sin(uTime*2.5)*0.2*uEffectIntensity;
    gl_PointSize=(uPointSize/-mvPosition.z)*(1.2+sin(uTime*3.0+dist*0.15)*0.5)*sizeMultiplier;
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

interface ParticlePulseEffectProps {
  /** Night: green + white. Day: deep blue + lavender */
  variant: 'night' | 'day';
  height?: string;
  opacity?: number;
}

const ParticlePulseEffect = ({ variant, height = '400px', opacity = 1 }: ParticlePulseEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Night: emerald green + white — additive glow on dark bg
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
    // Day: transparent bg — warm Apple section bg shows through
    // Night: dark bg — additive glow effect
    renderer.setClearColor(variant === 'night' ? 0x0a0a0a : 0x000000, 0);
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
      const t = (Math.random() - 0.5) * 5.0;
      const angle = Math.random() * Math.PI * 2;
      const radiusBase = 0.4 + Math.pow(Math.abs(t), 2.4);
      const radius = radiusBase * (0.75 + Math.random() * 0.55);
      const x = radius * Math.cos(angle) * 2.9;
      const z = radius * Math.sin(angle) * 2.9;
      const y = t * 7.5;
      positions[i3] = x; positions[i3 + 1] = y; positions[i3 + 2] = z;
      targetPositions[i3] = x; targetPositions[i3 + 1] = y; targetPositions[i3 + 2] = z;
      randomOffsets[i3] = (Math.random() - 0.5) * 2;
      randomOffsets[i3 + 1] = (Math.random() - 0.5) * 2;
      randomOffsets[i3 + 2] = (Math.random() - 0.5) * 2;
      const color = Math.random() > 0.6 ? primaryColor : secondaryColor;
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
        uPointSize: { value: 100 },
        uEffectIntensity: { value: 1 },
        uOpacity: { value: opacity },
      },
      depthWrite: false,
      // Night: additive glow on dark | Day: normal blend on light bg
      blending: variant === 'night' ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let time = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;
      points.rotation.y += 0.002;
      points.rotation.z += 0.0008;
      points.rotation.x = Math.sin(time * 0.12) * 0.1;
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
  }, [variant, opacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="w-full h-full pointer-events-none select-none"
    />
  );
};

export default ParticlePulseEffect;
