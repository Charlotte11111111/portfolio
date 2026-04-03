import HeroSection from '@/components/HeroSection';
import VibeCodingSection from '@/components/VibeCodingSection';
import EducationSection from '@/components/EducationSection';
import StudioSection from '@/components/StudioSection';
import WorkSection from '@/components/WorkSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import CandySupport from '@/components/CandySupport';

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <HeroSection />
      <VibeCodingSection />
      <EducationSection />
      <StudioSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
      <CandySupport />
    </div>
  );
};

export default Index;
