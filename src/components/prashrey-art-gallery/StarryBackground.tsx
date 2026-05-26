import { useEffect, useRef } from "react";
import { useGalleryInteraction } from "../../context/GalleryInteractionContext";

type Star = {
  x: number;
  y: number;
  z: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
};

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mouse, reducedMotion } = useGalleryInteraction();
  const mouseRef = useRef(mouse);

  mouseRef.current = mouse;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;
    let frame = 0;
    let shootingStar: ShootingStar | null = null;
    let nextShootingStar = reducedMotion ? Infinity : 180 + Math.random() * 240;

    const starCount = reducedMotion ? 90 : 220;
    const stars: Star[] = [];

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 2 + 0.4,
          radius: Math.random() * 1.4 + 0.25,
          baseOpacity: Math.random() * 0.45 + 0.15,
          twinkleSpeed: Math.random() * 0.015 + 0.004,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createStars();
    };

    const drawNebula = () => {
      const mx = (mouseRef.current.x - 0.5) * 80;
      const my = (mouseRef.current.y - 0.5) * 80;

      const topGlow = ctx.createRadialGradient(
        width * 0.2 + mx,
        height * 0.15 + my,
        0,
        width * 0.2 + mx,
        height * 0.15 + my,
        width * 0.45,
      );
      topGlow.addColorStop(0, "rgba(76, 29, 149, 0.14)");
      topGlow.addColorStop(1, "transparent");

      const bottomGlow = ctx.createRadialGradient(
        width * 0.8 - mx * 0.5,
        height * 0.85 - my * 0.5,
        0,
        width * 0.8 - mx * 0.5,
        height * 0.85 - my * 0.5,
        width * 0.4,
      );
      bottomGlow.addColorStop(0, "rgba(30, 41, 59, 0.2)");
      bottomGlow.addColorStop(1, "transparent");

      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStars = () => {
      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;

      for (const star of stars) {
        const offsetX = mx * star.z * 28;
        const offsetY = my * star.z * 28;
        let x = star.x + offsetX;
        let y = star.y + offsetY;

        if (x < 0) x += width;
        if (x > width) x -= width;
        if (y < 0) y += height;
        if (y > height) y -= height;

        const twinkle = reducedMotion
          ? star.baseOpacity
          : star.baseOpacity +
            Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.25;

        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228, 228, 231, ${twinkle})`;
        ctx.fill();
      }
    };

    const drawShootingStar = () => {
      if (!shootingStar) return;

      const gradient = ctx.createLinearGradient(
        shootingStar.x,
        shootingStar.y,
        shootingStar.x + shootingStar.length,
        shootingStar.y + shootingStar.length * 0.35,
      );
      gradient.addColorStop(0, `rgba(196, 181, 253, ${shootingStar.opacity})`);
      gradient.addColorStop(1, "transparent");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shootingStar.x, shootingStar.y);
      ctx.lineTo(
        shootingStar.x + shootingStar.length,
        shootingStar.y + shootingStar.length * 0.35,
      );
      ctx.stroke();

      shootingStar.x += shootingStar.speed;
      shootingStar.y += shootingStar.speed * 0.35;
      shootingStar.opacity -= 0.018;

      if (shootingStar.opacity <= 0) {
        shootingStar = null;
      }
    };

    const animate = () => {
      frame += 1;
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, width, height);

      drawNebula();
      drawStars();

      if (!reducedMotion && frame >= nextShootingStar) {
        shootingStar = {
          x: Math.random() * width * 0.6,
          y: Math.random() * height * 0.35,
          length: 90 + Math.random() * 70,
          speed: 10 + Math.random() * 6,
          opacity: 0.9,
        };
        nextShootingStar = frame + 220 + Math.random() * 280;
      }

      drawShootingStar();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
}
