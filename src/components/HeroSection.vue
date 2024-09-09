<template>
  <section class="hero-section">
    <div class="main-content">
      <h1>Analyze Your Resume</h1>
      <p>Get instant feedback and improve your chances of landing the job</p>
    </div>
    <img src="@/assets/hero-image.png" alt="Resume Analysis" />
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped>
.hero-section {
  display: flex;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  padding: 50px 100px;
  background: #f8f9fa;
  gap: 50px;
}
h1 {
  font-size: 53px;
  letter-spacing: -0.6px;
  font-weight: 300;
  text-align: left;
  margin: 0px;
  color: #21252a;
  max-width: 310px;
}
p {
  font-size: 20px;
  letter-spacing: -0.2px;
  color: #606264;
  font-weight: 300;
  text-align: left;
  max-width: 443px;
}
.main-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.hero-section img {
  width: 100%;
  max-width: 780px;
}
@media only screen and (min-width: 1024px) and (max-width: 1609px) {
  .hero-section {
    padding: 50px 144px;
  }
  h1 {
    font-size: 40px;
  }
  p {
    font-size: 16px;
  }
  .hero-section img {
    max-width: 400px;
  }
}
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .hero-section {
    padding: 50px 144px;
  }
  h1 {
    font-size: 34px;
  }
  p {
    font-size: 16px;
  }
  .hero-section img {
    max-width: 350px;
  }
}
@media only screen and (min-width: 561px) and (max-width: 768px) {
  .hero-section {
    padding: 50px 100px;
  }
  h1 {
    font-size: 25px;
  }
  p {
    font-size: 16px;
  }
  .hero-section img {
    max-width: 210px;
  }
}
@media only screen and (max-width: 560px) {
   .hero-section {
    flex-direction: column;
    padding: 50px 50px;
    gap: 20px;
  }
  h1 {
    font-size: 20px;
  }
  p {
    font-size: 14px;
  }
  .hero-section img {
    max-width: 90vw;
  }
}
</style>