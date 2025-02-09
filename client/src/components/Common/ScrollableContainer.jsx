import React, { useRef, useEffect } from "react";

const ScrollableContainer = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e) => {
      isDragging.current = true;
      startY.current = e.pageY - container.offsetTop;
      scrollTop.current = container.scrollTop;
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      e.preventDefault();
      const y = e.pageY - container.offsetTop;
      const walk = (y - startY.current) * 2; // Scroll speed multiplier
      container.scrollTop = scrollTop.current - walk;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      container.style.cursor = "grab";
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      container.style.cursor = "grab";
    };

    // Smooth scroll for wheel event
    const handleWheel = (e) => {
      e.preventDefault();

      const delta = e.deltaY;
      container.scrollTo({
        top: container.scrollTop + delta,
        behavior: "smooth",
      });
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={containerRef} className={`scrollable-container ${className}`}>
      {children}
    </div>
  );
};

export default ScrollableContainer;
