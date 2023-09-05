import React, { useEffect } from 'react';

const StarFall: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('starfallCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#0c1831', '#30436f', '#869ccc', '#dce3f2'];
    const stars: any[] = [];
    let mouseX = window.innerWidth / 2;

    const generateStar = () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 5 + 2;
      const isComet = Math.random() < 0.33;  // One third of stars will be comets
      const speedMultiplier = isComet ? 2 : 1;
      return { x, y, radius, color, isComet, speedMultiplier };
    };

    for (let i = 0; i < 30; i++) {
      stars.push(generateStar());
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        if (star.isComet) {
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2, star.y); // Start of the tail
          ctx.lineTo(star.x + star.radius * 2, star.y); // End of the tail
          ctx.strokeStyle = star.color;
          ctx.lineWidth = star.radius / 2;
          ctx.stroke();
          ctx.closePath();
        }
      });
    };

    const update = () => {
      const direction = (mouseX / canvas.width - 0.5) * 0.6;
      stars.forEach((star) => {
        star.y += 0.6 * star.radius * star.speedMultiplier;  // Multiplied by speedMultiplier
        star.x += direction * star.radius;  // move horizontally based on mouse position
        if (star.y > canvas.height) {
          Object.assign(star, generateStar());
          star.y = 0;
        }
      });
      draw();
      requestAnimationFrame(update);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
    };

    window.addEventListener('mousemove', handleMouseMove);

    update();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <canvas id="starfallCanvas" className="absolute top-0 left-0 w-full h-full z-[-1]"></canvas>
    </div>
  );
};

export default StarFall;


