import React from "react";
import "../styles/TestimonialsSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function TestimonialsSection() {
  const testimonials = [
    {
      text: "LEGALIT has transformed our legal workflow, saving us countless hours.",
      clientName: "Sarah Thompson",
      clientPosition: "CEO, Startup Inc.",
      clientPhoto: "path_to_photo1.jpg", // Replace with actual paths
    },
    {
      text: "The AI-powered analysis has been a game-changer for our contract management.",
      clientName: "James Wilson",
      clientPosition: "COO, Tech Solutions",
      clientPhoto: "path_to_photo2.jpg",
    },
    {
      text: "We no longer worry about missing deadlines or compliance issues thanks to LEGALIT.",
      clientName: "Linda Monroe",
      clientPosition: "General Counsel, FinCorp",
      clientPhoto: "path_to_photo3.jpg",
    },
    {
      text: "Collaborating with our legal team has never been easier. LEGALIT is a must-have.",
      clientName: "Michael Brown",
      clientPosition: "Managing Partner, Legal Partners LLP",
      clientPhoto: "path_to_photo4.jpg",
    },
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <h2>What Our Clients Say</h2>
        <Swiper spaceBetween={50} slidesPerView={1} autoplay={{ delay: 5000 }}>
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="client-info">
                  <img
                    src={testimonial.clientPhoto}
                    alt={testimonial.clientName}
                  />
                  <h4>{testimonial.clientName}</h4>
                  <p>{testimonial.clientPosition}</p>
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
