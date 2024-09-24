import React from "react";
import "../styles/TestimonialsSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTheme } from "@mui/material";

// Replace with actual Unsplash URLs for random images
const unsplashImages = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1570158268183-d296b2892211?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZhY2V8ZW58MHx8MHx8fDA%3D",
];

function TestimonialsSection() {
  const theme = useTheme();

  const testimonials = [
    {
      text: "LEGALIT has transformed our legal workflow, saving us countless hours.",
      clientName: "Sarah Thompson",
      clientPosition: "CEO, Startup Inc.",
      clientPhoto: unsplashImages[0],
    },
    {
      text: "The AI-powered analysis has been a game-changer for our contract management.",
      clientName: "James Wilson",
      clientPosition: "COO, Tech Solutions",
      clientPhoto: unsplashImages[1],
    },
    {
      text: "We no longer worry about missing deadlines or compliance issues thanks to LEGALIT.",
      clientName: "Linda Monroe",
      clientPosition: "General Counsel, FinCorp",
      clientPhoto: unsplashImages[2],
    },
    {
      text: "Collaborating with our legal team has never been easier. LEGALIT is a must-have.",
      clientName: "Michael Brown",
      clientPosition: "Managing Partner, Legal Partners LLP",
      clientPhoto: unsplashImages[3],
    },
  ];

  return (
    <section
      id="testimonials"
      className="testimonials-section"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div className="container">
        <h2 style={{ color: theme.palette.text.primary }}>
          What Our Clients Say
        </h2>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          speed={600} // Animation speed for smoother transitions
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item">
                <p
                  className="testimonial-text"
                  style={{ color: theme.palette.text.secondary }}
                >
                  "{testimonial.text}"
                </p>
                <div className="client-info">
                  <img
                    src={testimonial.clientPhoto}
                    alt={testimonial.clientName}
                    className="client-photo"
                  />
                  <h4 style={{ color: theme.palette.text.primary }}>
                    {testimonial.clientName}
                  </h4>
                  <p style={{ color: theme.palette.text.secondary }}>
                    {testimonial.clientPosition}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TestimonialsSection;
