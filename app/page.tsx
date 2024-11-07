// pages/index.tsx
import Layout from '@/components/Layout';
import CropSection from '../components/Crop-section';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsFeed from '@/components/NewsFeed';
// import PlantDiseasePredictor from '@/components/PlantDiseaseClassifier';

const Home = () => {
  return (
    <>
    <Header/>
    <Layout>
      <CropSection />
      {/* <PlantDiseasePredictor/> */}
      <NewsFeed/>
  </Layout>
  <Footer/>
  </>
  );
};

export default Home;
