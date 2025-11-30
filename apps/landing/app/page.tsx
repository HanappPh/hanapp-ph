'use client';

import { useState } from 'react';

import CategoriesSection from '../components/CategoriesSection';
import { allCategories } from '../components/data/categoriesData';
import { jobsData, JobData } from '../components/data/jobsData';
import { testimoniesData } from '../components/data/testimoniesData';
import DemoAboutSections from '../components/DemoAboutSections';
import FinalCTASection from '../components/FinalCTASection';
import FindHelpSection from '../components/FindHelpSection';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import MobileShowcaseSection from '../components/MobileShowcaseSection';
import Navigation from '../components/Navigation';
import ServicesSection from '../components/ServicesSection';
import TestimoniesSection from '../components/TestimoniesSection';

const LandingPage = () => {
  // State to track selected job and categories
  const [selectedJob, setSelectedJob] = useState<JobData>(jobsData[0]); // Default to first job
  const [showAllCategories, setShowAllCategories] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3F5F9] overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Demo and About Sections */}
      <DemoAboutSections />

      {/* Mobile Showcase Section */}
      <MobileShowcaseSection />

      {/* Find Help Section */}
      <FindHelpSection />

      {/* Categories Section */}
      <CategoriesSection
        showAllCategories={showAllCategories}
        setShowAllCategories={setShowAllCategories}
        allCategories={allCategories}
      />

      {/* Services Section */}
      <ServicesSection
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        jobsData={jobsData}
      />

      {/* Testimonies Section */}
      <TestimoniesSection testimoniesData={testimoniesData} />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
