/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DebateList from './components/DebateList';
import LearningSection from './components/LearningSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <DebateList />
        <LearningSection />
      </main>
      <Footer />
    </div>
  );
}

