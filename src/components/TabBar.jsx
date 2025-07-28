import { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function TabBar({ tabs }) {
    const [activeTab, setActiveTab] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const tabBarRef = useRef(null);
    const tabRefs = useRef([]);

    const checkOverflow = () => {
        if (tabBarRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = tabBarRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [tabs]);

    useEffect(() => {
        if (tabBarRef.current && tabRefs.current[activeTab]) {
            const tab = tabRefs.current[activeTab];
            const tabBar = tabBarRef.current;
            const tabWidth = tab.offsetWidth;
            const tabBarWidth = tabBar.clientWidth;
            let scrollLeft;

            if (activeTab === 0) {
                // For the first tab, align to the left edge
                scrollLeft = 0;
            } else if (activeTab === tabs.length - 1) {
                // For the last tab, align to the right edge
                scrollLeft = tabBar.scrollWidth - tabBarWidth;
            } else {
                // Center other tabs
                const tabCenter = tab.offsetLeft + tabWidth / 2;
                const containerCenter = tabBarWidth / 2;
                scrollLeft = tabCenter - containerCenter;
            }

            tabBar.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
            setTimeout(checkOverflow, 300); // Update arrows after scroll
        }
    }, [activeTab, tabs]);

    const scrollTabs = (direction) => {
        const newIndex = direction === 'left'
            ? Math.max(activeTab - 1, 0)
            : Math.min(activeTab + 1, tabs.length - 1);
        setActiveTab(newIndex);
    };

    return (
        <div className="tabbar-container">
            <div className="tabbar-wrapper">
                {showLeftArrow && (
                    <button className="tabbar-arrow left" onClick={() => scrollTabs('left')}>
                        <FaArrowLeft />
                    </button>
                )}
                <div className="tabbar" ref={tabBarRef}>
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`tab-button ${activeTab === index ? 'active' : ''}`}
                            onClick={() => setActiveTab(index)}
                            ref={el => (tabRefs.current[index] = el)}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>
                {showRightArrow && (
                    <button className="tabbar-arrow right" onClick={() => scrollTabs('right')}>
                        <FaArrowRight />
                    </button>
                )}
            </div>
            <div className="tab-content">
                <p className="profile-bio">{tabs[activeTab].content}</p>
            </div>
        </div>
    );
}

export default TabBar;
