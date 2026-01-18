/**
 * GLUCO Website - Advanced Image Optimization Script
 * Handles lazy loading fallback, image fade-in, error handling, and performance
 */

(function() {
    'use strict';

    // ==========================================
    // Native Lazy Loading Support Detection
    // ==========================================
    const supportsLazyLoading = 'loading' in HTMLImageElement.prototype;

    // ==========================================
    // Intersection Observer for Lazy Loading Fallback
    // ==========================================
    if (!supportsLazyLoading) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all lazy images
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.hasAttribute('src')) {
                img.setAttribute('data-src', img.getAttribute('src'));
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
            imageObserver.observe(img);
        });
    }

    // ==========================================
    // Image Load Event Handler (Fade-in Effect)
    // ==========================================
    function handleImageLoad() {
        const images = document.querySelectorAll('img:not(.loaded)');
        
        images.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                }, { once: true });
            }
        });
    }

    // ==========================================
    // Image Error Handler (Fallback)
    // ==========================================
    function handleImageError(img) {
        img.style.backgroundColor = '#f0f0f0';
        img.style.minHeight = '200px';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        
        // Add error class for CSS styling
        img.classList.add('image-error');
        
        // Create fallback content
        const fallback = document.createElement('div');
        fallback.style.textAlign = 'center';
        fallback.style.color = '#999';
        fallback.innerHTML = '<i class="fa fa-image" style="font-size: 3rem; display: block; margin-bottom: 0.5rem;"></i><span>Image unavailable</span>';
        
        // Only add if parent can hold it
        if (img.parentElement) {
            img.parentElement.style.position = 'relative';
            img.style.opacity = '0.1';
        }
    }

    // Attach error handlers to all images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        }, { once: true });
    });

    // ==========================================
    // Responsive Image Source Selection
    // ==========================================
    function updateResponsiveImages() {
        const screenWidth = window.innerWidth;
        const images = document.querySelectorAll('img[data-src-mobile], img[data-src-tablet], img[data-src-desktop]');
        
        images.forEach(img => {
            let newSrc;
            
            if (screenWidth < 768 && img.hasAttribute('data-src-mobile')) {
                newSrc = img.getAttribute('data-src-mobile');
            } else if (screenWidth < 1024 && img.hasAttribute('data-src-tablet')) {
                newSrc = img.getAttribute('data-src-tablet');
            } else if (img.hasAttribute('data-src-desktop')) {
                newSrc = img.getAttribute('data-src-desktop');
            }
            
            if (newSrc && img.src !== newSrc) {
                img.src = newSrc;
            }
        });
    }

    // ==========================================
    // Preload Critical Images
    // ==========================================
    function preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('img[fetchpriority="high"], img[loading="eager"]');
        
        criticalImages.forEach(img => {
            if (img.src && !img.complete) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                preloadLink.href = img.src;
                
                // Add to head if not already present
                if (!document.querySelector(`link[href="${img.src}"]`)) {
                    document.head.appendChild(preloadLink);
                }
            }
        });
    }

    // ==========================================
    // Blur-up Technique for Progressive Loading
    // ==========================================
    function applyBlurUpEffect() {
        const images = document.querySelectorAll('img[data-blur]');
        
        images.forEach(img => {
            const lowResSrc = img.getAttribute('data-blur');
            if (!lowResSrc) return;
            
            // Create low-res placeholder
            const placeholder = new Image();
            placeholder.src = lowResSrc;
            placeholder.style.filter = 'blur(10px)';
            placeholder.style.transform = 'scale(1.1)';
            
            placeholder.onload = () => {
                img.style.backgroundImage = `url(${lowResSrc})`;
                img.style.backgroundSize = 'cover';
                
                // Load high-res image
                const highRes = new Image();
                highRes.src = img.src;
                highRes.onload = () => {
                    img.style.backgroundImage = 'none';
                    img.classList.add('loaded');
                };
            };
        });
    }

    // ==========================================
    // Monitor Image Performance
    // ==========================================
    function monitorImagePerformance() {
        if ('PerformanceObserver' in window) {
            try {
                const perfObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.initiatorType === 'img') {
                            // Log slow loading images (> 2 seconds)
                            if (entry.duration > 2000) {
                                console.warn(`Slow image detected: ${entry.name} (${Math.round(entry.duration)}ms)`);
                            }
                        }
                    });
                });
                
                perfObserver.observe({ entryTypes: ['resource'] });
            } catch (e) {
                // Performance observer not supported
            }
        }
    }

    // ==========================================
    // Debounce Function for Resize Events
    // ==========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==========================================
    // Initialize on DOM Ready
    // ==========================================
    function init() {
        // Handle image loading and fade-in
        handleImageLoad();
        
        // Preload critical images
        preloadCriticalImages();
        
        // Apply blur-up effect if data-blur present
        applyBlurUpEffect();
        
        // Monitor performance in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            monitorImagePerformance();
        }
        
        // Update responsive images on resize (debounced)
        window.addEventListener('resize', debounce(updateResponsiveImages, 250));
        
        // Initial responsive image check
        updateResponsiveImages();
    }

    // ==========================================
    // Run initialization
    // ==========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ==========================================
    // Export for use in other scripts (optional)
    // ==========================================
    window.GLUCOImageOptimizer = {
        handleImageLoad,
        updateResponsiveImages,
        preloadCriticalImages
    };

})();
