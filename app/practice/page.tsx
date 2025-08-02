'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function StickyMotionBox() {
  const { scrollY } = useScroll();
  const [isFixed, setIsFixed] = useState(true);
  const [releasedTop, setReleasedTop] = useState(0); // ←固定解除時のtopを保持
  const tickingRef = useRef(false);
  const offsetY = 100;

  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const stopY = window.innerHeight * 0.5;
          const buffer = 20;

          if (currentScroll >= stopY - buffer && isFixed) {
            // 🔻 fixed を解除する時、現在の top を保存
            setReleasedTop(offsetY + currentScroll);
            setIsFixed(false);
          } else if (currentScroll < stopY - buffer && !isFixed) {
            setIsFixed(true);
          }

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isFixed]);

  // アニメーションさせたいなら useSpring(useTransform(...)) を使うこともできる
  const widthRaw = useTransform(scrollY, [0, 200], ['100%', '50%']);
  const width = useSpring(widthRaw, { stiffness: 70, damping: 20 });

  return (
    <div style={{ height: '500vh', background: '#f0f0f0' }}>
      <motion.div
        className="z-20 overflow-hidden h-[90vh] bg-blue-300 rounded-xl"
        style={{
          position: isFixed ? 'fixed' : 'absolute',
          top: isFixed ? offsetY : releasedTop,
          width,
          left: 20,
          transformOrigin: 'left center',
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
          スクロールアニメーション
        </div>
      </motion.div>
    </div>
  );
}
