import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Stacked Cards Parallax Effect Script */}
      <Script
        id="stacked-panels-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              let ticking = false;
              let panels = [];
              
              function initStackedPanels() {
                panels = Array.from(document.querySelectorAll('.stacked-panel'));
                console.log('Found panels:', panels.length);
                
                if (panels.length === 0) {
                  console.log('No panels found, retrying...');
                  setTimeout(initStackedPanels, 200);
                  return;
                }
                
                // Set initial z-index values and styles
                panels.forEach((panel, index) => {
                  const panelNumber = parseInt(panel.getAttribute('data-panel') || (index + 1));
                  panel.style.zIndex = 10 + panelNumber;
                  panel.style.position = 'relative';
                  panel.style.transform = 'translateY(0px)';
                  console.log('Initialized Panel', panelNumber, 'z-index:', 10 + panelNumber);
                });
                
                console.log('Stacked panels initialized successfully');
                updateStackedPanels();
              }
              
              function updateStackedPanels() {
                if (panels.length === 0) return;
                
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;
                
                panels.forEach((panel, index) => {
                  const panelNumber = parseInt(panel.getAttribute('data-panel') || (index + 1));
                  const rect = panel.getBoundingClientRect();
                  const panelTop = rect.top + scrollY;
                  const panelHeight = rect.height;
                  
                  // Calculate when panel enters viewport
                  const panelBottom = panelTop + panelHeight;
                  const viewportTop = scrollY;
                  const viewportBottom = scrollY + windowHeight;
                  
                  // Panel is in viewport
                  if (panelBottom > viewportTop && panelTop < viewportBottom) {
                    // Calculate scroll progress (0 to 1)
                    const scrollProgress = Math.max(0, Math.min(1, 
                      (scrollY - panelTop + windowHeight) / (panelHeight + windowHeight)
                    ));
                    
                    // Apply stacking effect - higher panels move faster
                    const transformSpeed = panelNumber * 0.5;
                    const translateY = scrollProgress * 100 * transformSpeed;
                    
                    // Apply transform with more pronounced effect
                    panel.style.transform = \`translateY(\${translateY}px) translateZ(\${panelNumber * 5}px)\`;
                    
                    // Add reveal class when panel is visible
                    if (scrollProgress > 0.2 && !panel.classList.contains('reveal-up')) {
                      panel.classList.add('reveal-up');
                    }
                  }
                });
                
                ticking = false;
              }
              
              function requestTick() {
                if (!ticking) {
                  requestAnimationFrame(updateStackedPanels);
                  ticking = true;
                }
              }
              
              function onScroll() {
                requestTick();
              }
              
              // Initialize when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initStackedPanels);
              } else {
                initStackedPanels();
              }
              
              // Add scroll listener
              window.addEventListener('scroll', onScroll, { passive: true });
              window.addEventListener('resize', updateStackedPanels);
              
              // Also try to initialize after a delay to catch any late-loading content
              setTimeout(initStackedPanels, 500);
            })();
          `
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
