

import { AppBar } from "./AppBar";
import { OrderComponent } from "./menu/OrderComponent";

function HeroLanding() {
  const backgroundImage = "url(https://cdn.discordapp.com/attachments/1115663218048774277/1168545336906756157/DALLE_2023-10-30_13.41.43_-_Photo_of_a_top-down_view_of_a_simple_pizza_directly_placed_against_a_dark_infinity_wall_background._The_pizza_has_basic_toppings_like_cheese_and_tomat.png)";
  return (
    <section className="relative h-screen bg-center bg-cover bg-fixed" style={{ backgroundImage }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold">Pluto Pizzas</h1>
        <p className="mt-4 text-2xl">Taste the Universe</p>
      </div>
    </section>
  );
}

function OrderSection() {
  return (
    <section id="order" className="p-10">
      <OrderComponent />
    </section>
  );
}

function AboutUs() {
  return (
    <section id="about" className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">About Pluto&apos;s Pizza Shop</h2>
      <p className="text-lg mb-4">
        Pluto’s Pizza Shop is the most popular pizza joint in all of London. Renowned for its made-to-order pizza, Pluto&apos;s has been the go-to choice for pizza enthusiasts. With our rich history and commitment to quality, we&apos;ve become a landmark in the London food scene. As we look to the future, we&apos;re excited to expand into the world of online delivery.
      </p>
      <p className="text-lg">
        Our vision is spearheaded by our Head Chef Floris, who is passionate about ensuring that our online customers have the same customization options as those who visit us in-store. We&apos;re committed to bringing the Pluto&apos;s experience directly to your doorstep.
      </p>
    </section>
  );
}


function Contact() {
  return (
    <section id="contact" className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Ordering & Contact Info</h2>
      <p className="text-lg mb-4">
        Ready to taste the best pizza in London? Our order page allows you to create a completely custom pizza and place your order seamlessly. While our online platform facilitates the ordering process, payments are made directly to our trusted delivery drivers.
      </p>
      <p className="text-lg">
        All orders are stored securely, ensuring Floris and his dedicated team can efficiently manage and analyze sales. If you have any questions or need further assistance, don&apos;t hesitate to reach out. We&apos;re here to help!
      </p>
      {/* Add any contact information or form if needed */}
    </section>
  );
}


export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <AppBar />
      <HeroLanding />
      <OrderSection />
      <AboutUs />
      <Contact />
    </div>
  );
}