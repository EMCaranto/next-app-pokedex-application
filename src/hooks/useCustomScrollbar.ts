import React, { useEffect, useRef } from 'react';

export const useCustomScrollbar = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current;
    const child = childRef.current;
    const thumb = thumbRef.current;

    if (!parent || !child || !thumb) return;

    const syncScroll = () => {
      const parentWidth = 0.75; // 75% of the parent width

      const trackWidth = parent.clientWidth * parentWidth;
      const thumbWidth = thumb.clientWidth;

      const scrollPercentage =
        child.scrollLeft / (child.scrollWidth - child.clientWidth);

      const thumbPosition = trackWidth - thumbWidth;

      thumb.style.left = `${scrollPercentage * thumbPosition}px`;
    };

    const syncScrollbar = (event: MouseEvent) => {
      const parentWidth = 0.75; // 75% of the parent width

      const trackWidth = parent.clientWidth * parentWidth;
      const thumbWidth = thumb.clientWidth;

      const thumbPosition = trackWidth - thumbWidth;

      const parentClientWidth = 0.125; // 12.5% padding on each side

      const mouse_x =
        event.clientX -
        parent.getBoundingClientRect().left -
        parent.clientWidth * parentClientWidth;

      const scrollPercentage = mouse_x / trackWidth;

      child.scrollLeft =
        scrollPercentage * (child.scrollWidth - child.clientWidth);

      thumb.style.left = `${Math.min(Math.max(0, mouse_x), thumbPosition)}px`;
    };

    const onMouseMove = (event: MouseEvent) => {
      syncScrollbar(event);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    thumb.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    child.addEventListener('scroll', syncScroll);

    syncScroll();
  }, []);

  return { parentRef, childRef, thumbRef };
};
