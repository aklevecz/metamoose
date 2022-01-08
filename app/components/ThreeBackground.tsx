import { useEffect } from "react";
import * as THREE from "three";

const fragmentShader = `
#define OCTAVES 1
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;
float random (in vec2 uv) {
    return fract(sin(dot(uv.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}


float fbm (in vec2 uv) {
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;

    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(uv);
        uv *= 2.;
        amplitude *= .5;
    }
    return value;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    
    uv.x *= iResolution.x/iResolution.y;

    vec3 col = 0.5 * .5 + cos(iTime + iMouse.x * .01 + 6. * fbm(uv * atan(3.0))+ vec3(0,23,21));
	
    col += fbm(uv * atan(3.0));
    
    fragColor = vec4(col,1.0);
}
void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

export default function ThreeBackground() {
  useEffect(() => {
    const canvas = document.querySelector("#c")!;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.autoClearColor = false;

    const camera = new THREE.OrthographicCamera(
      -1, // left
      1, // right
      1, // top
      -1, // bottom
      -1, // near,
      1 // far
    );
    const scene = new THREE.Scene();
    const plane = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3() },
      iMouse: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms,
    });
    scene.add(new THREE.Mesh(plane, material));

    function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    let mouse = { x: 0, y: 0 };
    document.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    document.addEventListener("touchmove", onTouch);
    document.addEventListener("touchstart", onTouch);

    function onTouch(e: TouchEvent) {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      mouse.x = x;
      mouse.y = y;
    }

    function render(time: number) {
      time *= 0.001; // convert to seconds

      resizeRendererToDisplaySize(renderer);

      const canvas = renderer.domElement;
      uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
      uniforms.iTime.value = time;
      uniforms.iMouse.value.set(mouse.x, mouse.y);

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <canvas style={{ width: "100%", height: "100%" }} id="c" />
    </div>
  );
}
