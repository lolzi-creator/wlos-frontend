import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StakingPage from './pages/StakingPage';
import './styles/index.css';
import './styles/animations.css';
import './styles/staking.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/stake" element={<StakingPage />} />
                    <Route path="/battle" element={<Navigate to="/" />} /> {/* Placeholder for future Battle page */}
                    <Route path="/marketplace" element={<Navigate to="/" />} /> {/* Placeholder for future Marketplace page */}
                    <Route path="/wlos-token" element={<Navigate to="/" />} /> {/* Placeholder for future Token page */}
                    <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown routes to home */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
