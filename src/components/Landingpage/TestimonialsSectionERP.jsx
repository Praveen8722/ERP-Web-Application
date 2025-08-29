import { Card, CardContent, Typography, Avatar, Grid, Box, Container } from '@mui/material';
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

const testimonials = [
  {
    name: 'Nat Reynolds',
    testimonial: 'Vitae suscipit tellus mauris a diam maecenas sed enim ut. Mauris augue neque gravida in fermentum. Praesent semper feugiat nibh sed pulvinar proin.',
    avatarUrl: '/assets/img/test-image.png', 
  },
  {
    name: 'Celia Almeda',
    testimonial: 'Pharetra vel turpis nunc eget lorem. Quisque id diam quam elementum pulvinar etiam. Ut urna porttitor rhoncus dolor purus non enim praesent elementum.',
    avatarUrl: '/assets/img/test-image.png', 
  },
  {
    name: 'Bob Roberts',
    testimonial: 'Mauris augue neque gravida in fermentum. Praesent semper feugiat nibh sed pulvinar proin. Nibh nisl dictumst vestibulum rhoncus est pellentesque elit.',
    avatarUrl: '/assets/img/test-image.png', 
  },
];

const TestimonialsSection = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ textTransform: 'uppercase', color: 'gray', mb: 2, fontWeight: 600 }}>
          Testimonials
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: '#6777F0' }}>
          What Clients Say
        </Typography>
        <Typography variant="body1" sx={{ mb: 6, mx: 'auto', maxWidth: '600px', color: 'gray' }}>
          We place huge value on strong relationships and have seen the benefit they bring to our business. Customer feedback is vital in helping us to get it right.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                  bgcolor: '#f2f2f2',
                  boxShadow: 'none',
                  transition: 'transform 0.5s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                <Avatar
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    border: '3px solid white'
                  }}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    <BiSolidQuoteAltLeft style={{ fontSize: 18, color: 'black' }} /> {testimonial.testimonial} <BiSolidQuoteAltRight style={{ fontSize: 18, color: 'black' }} />
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#6777F0' }}>
                    {testimonial.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TestimonialsSection;
