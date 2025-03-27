import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StakingPage from './pages/StakingPage';
import MarketplacePage from './pages/MarketplacePage';
import WlosTokenPage from './pages/WlosTokenPage';
import RoadmapPage from './pages/RoadmapPage';
import WalletPage from './pages/WalletPage';
import FarmerPage from './pages/FarmerPage';
import HeroPage from './pages/HeroPage';
import { WalletContextProvider } from './context/WalletContext';
import { WalletConnectionProvider } from './context/WalletConnectionProvider';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { FarmerProvider } from './context/FarmerContext';
import { HeroProvider } from './context/HeroContext';
import { StakingProvider } from './context/StakingContext';

import './styles/farmers.css';
import './styles/heroes.css';
import './styles/index.css';
import './styles/animations.css';
import './styles/staking.css';
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


function App() {
    return (
        <WalletContextProvider>
            <WalletConnectionProvider>
                <MarketplaceProvider>
                    <FarmerProvider>
                        <HeroProvider>
                            <StakingProvider>
                                <Router>
                                    <div className="app-container">
                                        <Routes>
                                            <Route path="/" element={<HomePage />} />
                                            <Route path="/stake" element={<StakingPage />} />
                                            <Route path="/battle" element={<Navigate to="/" />} /> {/* Placeholder for future Battle page */}
                                            <Route path="/marketplace" element={<MarketplacePage />} />
                                            <Route path="/wlos-token" element={<WlosTokenPage />} />
                                            <Route path="/farmers" element={<FarmerPage />} />
                                            <Route path="/heroes" element={<HeroPage />} />
                                            <Route path="/roadmap" element={<RoadmapPage />} />
                                            <Route path="/wallet" element={<WalletPage />} />
                                            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown routes to home */}
                                        </Routes>
                                    </div>
                                </Router>
                            </StakingProvider>
                        </HeroProvider>
                    </FarmerProvider>
                </MarketplaceProvider>
            </WalletConnectionProvider>
        </WalletContextProvider>
    );
}

export default App;