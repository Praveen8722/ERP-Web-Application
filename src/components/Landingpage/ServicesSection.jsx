import { Card, CardContent, Typography, Button, Grid, Container, Box } from '@mui/material';

const data = [
  {
    title: 'ERP Software',
    description: 'The only comprehensive solution for company asset maintenance, employee salary management, and overall enterprise operations in India',
    imageUrl: 'https://www.datocms-assets.com/40521/1715242968-greythr-academy.png?auto=format&dpr=0.86&fit=max&w=560', // replace with the actual URL or import image
    bgColor: '#FFF8E1',
  },
  {
    title: 'ERP Software',
    description: 'The only comprehensive solution for company asset maintenance, employee salary management, and overall enterprise operations in India',
    imageUrl: 'https://www.datocms-assets.com/40521/1715242968-greythr-academy.png?auto=format&dpr=0.86&fit=max&w=560', // replace with the actual URL or import image
    bgColor: '#EEFAF4',
  },
  {
    title: 'ERP Software',
    description: 'The only comprehensive solution for company asset maintenance, employee salary management, and overall enterprise operations in India',
    imageUrl: 'https://www.datocms-assets.com/40521/1715242968-greythr-academy.png?auto=format&dpr=0.86&fit=max&w=560', // replace with the actual URL or import image
    bgColor: '#E6FFFF',
  },
  {
    title: 'ERP Software',
    description: 'The only comprehensive solution for company asset maintenance, employee salary management, and overall enterprise operations in India',
    imageUrl: 'https://www.datocms-assets.com/40521/1715242968-greythr-academy.png?auto=format&dpr=0.86&fit=max&w=560', // replace with the actual URL or import image
    bgColor: '#FFF8E1',
  },
  {
    title: 'ERP Software',
    description: 'The only comprehensive solution for company asset maintenance, employee salary management, and overall enterprise operations in India',
    imageUrl: 'https://www.datocms-assets.com/40521/1715242968-greythr-academy.png?auto=format&dpr=0.86&fit=max&w=560', // replace with the actual URL or import image
    bgColor: '#EEFAF4',
  },
  {
    title: 'ERP Software',
    description: 'The only comprehensive solution for company asset maintenance, employee salary management, and overall enterprise operations in India',
    imageUrl: 'https://www.datocms-assets.com/40521/1715242968-greythr-academy.png?auto=format&dpr=0.86&fit=max&w=560', // replace with the actual URL or import image
    bgColor: '#E6FFFF',
  },

];

const ServicesSection = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h3' fontFamily={'Poppins, sans-serif'}  sx={{ fontWeight: '600', mb: 4, color: '#6777F0' }}>
          Our Services
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ paddingTop: '40px', paddingBottom: '40px', justifyContent: 'center' }}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ textAlign: 'center', padding: '20px', borderRadius: '15px', backgroundColor: item.bgColor, boxShadow: 'none',transition:'1s',
             '&:hover':{
                 transform:'scale(1.1)'
                }}}>
              <img src={item.imageUrl} alt={item.title} style={{ height: '280px', width: '280px' }} />
              <CardContent>
                <Typography variant="h5" component="div" fontFamily={'Poppins, sans-serif'} fontWeight={500}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" fontFamily={'Poppins, sans-serif'} mt={1}>
                  {item.description}
                </Typography>
                <Button sx={{
                  marginTop: '20px',
                  color: '#6777F0',
                  textTransform: 'capitalize',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '522',
                  fontSize:'22px'

                }}>Know More</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServicesSection;