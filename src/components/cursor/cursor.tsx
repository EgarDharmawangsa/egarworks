"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./cursor.css";

const BlobCursor: React.FC = () => {
    const blobRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const move = (e: MouseEvent): void => {
            const x = e.clientX;
            const y = e.clientY;

            if (!blobRef.current) return;

            gsap.to(blobRef.current, {
                x,
                y,
                duration: 0.2,
                ease: "power3.out",
            });
        };

        window.addEventListener("mousemove", move);

        if (blobRef.current) {
            gsap.set(blobRef.current, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            });
        }

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <div className="blob-container">
            <div className="blob-main">
                <div ref={blobRef} className="blob" />
            </div>
        </div>
    );
};

export default BlobCursor;