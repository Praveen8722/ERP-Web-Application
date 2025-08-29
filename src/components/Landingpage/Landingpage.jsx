import React from 'react';
import NavbarERP  from './NavbarERP';
import  HomeERP  from './HomeERP';
import ServicesSection  from './ServicesSection';
import  TestimonialsSectionERP from './TestimonialsSectionERP';
import  FooterERP  from './FooterERP';
import AdminDashboard from './AdminDashboard';

const Landingpage = () => {
  return (
    <div>
      <NavbarERP />
      <HomeERP />
      <ServicesSection />
      <AdminDashboard />
      <TestimonialsSectionERP />
      <FooterERP />
    </div>
  );
};

export default Landingpage;
