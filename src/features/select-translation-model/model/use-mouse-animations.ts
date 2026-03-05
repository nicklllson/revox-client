import { useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

export const useMouseAnimations = () => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const rotateX = useSpring(useTransform(mouseY, [-30, 30], [8, -8]), {
		stiffness: 400,
		damping: 30,
	});
	const rotateY = useSpring(useTransform(mouseX, [-60, 60], [-10, 10]), {
		stiffness: 400,
		damping: 30,
	});

	const pillRef = useRef<HTMLButtonElement>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = pillRef.current?.getBoundingClientRect();
		if (!rect) return;
		mouseX.set(e.clientX - rect.left - rect.width / 2);
		mouseY.set(e.clientY - rect.top - rect.height / 2);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	return { handleMouseLeave, handleMouseMove, rotateX, rotateY, pillRef };
};
