import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <section>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h4>Willkommen auf meiner Drinks-App!</h4>
    </section>
  );
}
