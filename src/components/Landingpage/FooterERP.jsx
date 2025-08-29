import { Box, Grid, Typography, Link, Container, IconButton, Stack } from '@mui/material';
import { WhatsApp, Facebook, Twitter, LinkedIn, Instagram, YouTube } from '@mui/icons-material';

const sections = [
  {
    imgSrc: "/assets/img/logo.png", // Corrected the image path
    title: 'ERP',
    links: [
      'Phase 1, Electronic City,',
      'Bangalore-560100,',
      'Karnataka',
    ],
  },
  {
    title: 'Contact Us',
    links: [
      'Call Us:', '9164090948', 'Email Us:', 'sales@irpinnovative.com',
    ],
  },
  {
    title: 'Product',
    links: [
      'Software', 'Digital Marketing',
      'IOT', 'Web Design & Development',
      'Employee Self Service',
    ],
  },
  {
    title: 'Follow Us',
    links: [
      { icon: <WhatsApp />, href: 'https://wa.me/your-number' },
      { icon: <Facebook />, href: 'https://facebook.com' },
      { icon: <Twitter />, href: 'https://twitter.com' },
      { icon: <LinkedIn />, href: 'https://linkedin.com' },
      { icon: <Instagram />, href: 'https://instagram.com' },
      { icon: <YouTube />, href: 'https://youtube.com' },
    ],
  },
];

const FooterERP = () => {
  return (
    <Box sx={{ padding: '60px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {section.imgSrc ? (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <img src={section.imgSrc} alt="logo" style={{ width: '50px', height: '50px' }} />
                  <Typography variant="h5" gutterBottom fontWeight={600} color={'#6777F0'}>
                    {section.title}
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="h5" gutterBottom fontWeight={600} color={'#6777F0'}>
                  {section.title}
                </Typography>
              )}
              {section.title === 'Follow Us' ? (
                section.links.map((link, linkIndex) => (
                  <IconButton key={linkIndex} href={link.href}>
                    {link.icon}
                  </IconButton>
                ))
              ) : (
                section.links.map((link, linkIndex) => (
                  <div key={linkIndex}>
                    {link.startsWith('mailto:') ? (
                      <Link
                        href={link}
                        sx={{
                          textDecoration: 'none',
                          color: 'gray',
                          fontWeight: '500',
                          fontSize: '1.2rem',
                          fontFamily: 'sans-serif',
                          lineHeight: '2.2rem',
                        }}
                      >
                        {link}
                      </Link>
                    ) : (
                      <Typography
                        sx={{
                          textDecoration: 'none',
                          color: 'gray',
                          fontWeight: '500',
                          fontSize: '1.2rem',
                          fontFamily: 'sans-serif',
                          lineHeight: '1rem',
                        }}
                      >
                        {link}
                      </Typography>
                    )}
                    <br />
                  </div>
                ))
              )}
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'left', mt: 4 }}>
          <Typography variant="body2" color="textSecondary">
            © 2024 Greytip Software Pvt. Ltd. <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}>Privacy Policy</Link> | <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}>Terms of Use</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterERP;
