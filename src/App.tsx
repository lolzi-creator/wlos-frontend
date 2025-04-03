import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StakingPage from './pages/StakingPage';
import MarketplacePage from './pages/MarketplacePage';
import WlosTokenPage from './pages/WlosTokenPage';
import RoadmapPage from './pages/RoadmapPage';
import WalletPage from './pages/WalletPage';
import FarmerPage from './pages/FarmerPage';
// import HeroPage from './pages/HeroPage'; // Will be used in future release
import { WalletContextProvider } from './context/WalletContext';
import { WalletConnectionProvider } from './context/WalletConnectionProvider';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { FarmerProvider } from './context/FarmerContext';
import { HeroProvider } from './context/HeroContext';
import { StakingProvider } from './context/StakingContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/common/ScrollToTop';

import './styles/farmers.css';
import './styles/heroes.css';
import './styles/index.css';
import './styles/animations.css';
import './styles/marketplace.css';
import './styles/token.css';
import './styles/roadmap.css';
import './styles/wallet.css';
import './styles/mobile-fixes.css';
import './styles/marketplace.css';
import './styles/inventory.css';
import './styles/listings.css';
import './styles/wallet-assets.css';
import './styles/wallet-overview.css';

// Import new staking CSS files
import './styles/modules/staking/new/StakingPage.css';
import './styles/modules/staking/new/StakingHeroSection.css';
import './styles/modules/staking/new/StakingStatsSection.css';
import './styles/modules/staking/new/StakingPoolsSection.css';
import './styles/modules/staking/new/StakingRewardsSection.css';

// Import new marketplace CSS files
import './styles/modules/marketplace/new/MarketplacePage.css';
import './styles/modules/marketplace/new/MarketplaceHeroSection.css';
import './styles/modules/marketplace/new/MarketplaceStatsSection.css';
import './styles/modules/marketplace/new/MarketplaceItemsSection.css';
import './styles/modules/marketplace/new/MarketplaceInventorySection.css';
import './styles/modules/marketplace/new/MarketplaceListingsSection.css';

function App() {
    return (
        <WalletContextProvider>
            <WalletConnectionProvider>
                <MarketplaceProvider>
                    <FarmerProvider>
                        <HeroProvider>
                            <StakingProvider>
                                <Router>
                                    <ScrollToTop />
                                    <div className="app-container">
                                        <Routes>
                                            <Route path="/" element={<HomePage />} />
                                            <Route path="/stake" element={<StakingPage />} />
                                            {/* Battle and Heroes features are planned for future releases */}
                                            {/* <Route path="/heroes" element={<HeroPage />} /> */}
                                            <Route path="/marketplace" element={<MarketplacePage />} />
                                            <Route path="/wlos-token" element={<WlosTokenPage />} />
                                            <Route path="/farmers" element={<FarmerPage />} />
                                            <Route path="/roadmap" element={<RoadmapPage />} />
                                            <Route path="/wallet" element={<WalletPage />} />
                                            <Route path="*" element={<Navigate to="/" />} />
                                        </Routes>
                                    </div>
                                </Router>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={3000}
                                    hideProgressBar={false}
                                    newestOnTop
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="dark"
                                />
                            </StakingProvider>
                        </HeroProvider>
                    </FarmerProvider>
                </MarketplaceProvider>
            </WalletConnectionProvider>
        </WalletContextProvider>
    );
}

export default App;