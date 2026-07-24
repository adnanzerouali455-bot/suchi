import { I18nProvider } from './i18n/I18nContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Sizzle from './components/Sizzle';
import IngredientAssembly from './components/IngredientAssembly';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AmbientParticles from './components/AmbientParticles';

export default function App() {
  return (
    <I18nProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-sumi-950">
        <AmbientParticles />
        <Header />
        <main className="relative z-10">
          <Hero />
          <Sizzle />
          <IngredientAssembly />
          <About />
          <MenuSection />
          <Gallery />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
