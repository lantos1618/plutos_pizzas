

import { AppBar } from "./_components/AppBar";
import { OrderArrow, OrderComponent } from "./_components/PizzaComponent";
import { getServerAuthSession } from "~/server/auth";




function HeroLanding() {
  const backgroundImage = "url(https://cdn.discordapp.com/attachments/1115663218048774277/1168545336906756157/DALLE_2023-10-30_13.41.43_-_Photo_of_a_top-down_view_of_a_simple_pizza_directly_placed_against_a_dark_infinity_wall_background._The_pizza_has_basic_toppings_like_cheese_and_tomat.png)";
  return (
    <section className="relative justify-center h-[80vh] bg-center bg-cover bg-fixed" style={{ backgroundImage }}>
      <div className="absolute z-2 inset-0 bg-black opacity-50 "></div>
      <div className="relative z-6 h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold font-rounded" >Pluto Pizzas</h1>
        <p className="mt-4 text-2xl font-rounded " >Taste the Universe</p>
      </div>
      <OrderArrow />
    </section>
  );
}

async function OrderSection() {
  const  session  = await getServerAuthSession();

  return (
    <section id="order" className="p-10">
      <OrderComponent session={session}/>
    </section>
  );
}

function AboutUs() {
  return (
    <section id="about" className="py-12 px-4">
      <div className="flex flex-col p-10 gap-2">

        <h2 className="text-2xl font-bold mb-6">About Pluto&apos;s Pizza Shop</h2>
        <p className="text-lg mb-4">
          Pluto’s Pizza Shop is the most popular pizza joint in all of London.
          Renowned for its made-to-order pizza, Pluto&apos;s has been the go-to choice for pizza enthusiasts.
          With our rich history and commitment to quality, we&apos;ve become a landmark in the London food scene.
          As we look to the future, we&apos;re excited to expand into the world of online delivery.
        </p>
        <p className="text-lg">
          Our vision is spearheaded by our Head Chef Floris,
          who is passionate about ensuring that our online
          customers have the same customization options as those who visit us in-store.
          We&apos;re committed to bringing the Pluto&apos;s experience directly to your doorstep.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-12 px-4 ">
      <div className="flex flex-col p-10 gap-2">

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold mb-6">Ordering & Contact Info</h2>
          <p className="text-lg mb-4">
            Ready to taste the best pizza in London? Our order page allows you to create a completely custom pizza and place your order seamlessly.
            While our online platform facilitates the ordering process, payments are made directly to our trusted delivery drivers.
          </p>
          <p className="text-lg">
            All orders are stored securely, ensuring Floris and his dedicated team can efficiently manage and analyze sales.
            If you have any questions or need further assistance, don&apos;t hesitate to reach out. We&apos;re here to help!
          </p>

        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h3 className="text-xl font-bold mt-6">Contact Details</h3>
          <p className="text-lg">
            <strong>Phone:</strong> +44 20 1234 5678
          </p>
          <p className="text-lg">
            <strong>Address:</strong> 123 Pizza Street, London, UK
          </p>
          <p className="text-lg">
            <strong>Business Registration:</strong> UK234-LND5678
          </p>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main className="relative min-h-screen bg-gray-100">
      <AppBar session={session} />
      <HeroLanding />
      <OrderSection  />
      <AboutUs />
      <Contact />
    </main>
  );
}