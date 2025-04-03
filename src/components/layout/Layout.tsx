import React, { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../styles/layout.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="layout">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;