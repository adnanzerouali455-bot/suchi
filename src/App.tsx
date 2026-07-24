import Header from './components/Header';
import Hero from './components/Hero';
import Sizzle from './components/Sizzle';
import IngredientAssembly from './components/IngredientAssembly';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Gallery from './components/Gallery';
import Reservation from './components/Reservation';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-sumi-950">
      <Header />
      <main>
        <Hero />
        <Sizzle />
        <IngredientAssembly />
        <About />
        <MenuSection />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </div>
  );
}
