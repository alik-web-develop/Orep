import React, { useEffect, useState, useRef } from 'react';

const LazyImage = ({ src, alt, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return (
        <div ref={imgRef} style={{ minHeight: '200px', minWidth: '100%' }}>
            {isVisible ? (
                <img src={src} alt={alt} className={className} />
            ) : (
                <div style={{ height: '200px', backgroundColor: '#eee' }}>Loading...</div>
            )}
        </div>
    );
};

export default LazyImage;
