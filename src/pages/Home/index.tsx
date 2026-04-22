import preactLogo from "../../assets/preact.svg";
import "./style.css";

export function Home({ user }: { user: any }) {
  if (user) console.log(user);
  return (
    <div class="home">
      <>
        <div class="guest-welcome">
          <h2>Welcome to Micro App!</h2>
          {user ? (<p>You are successfully logged in via the auth provider.</p>) : (<p>Please log in to access personalized features.</p>)}
        </div>

        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} alt="Preact logo" height="100" width="100" />
        </a>
      </>
      <h1>Get Started building Vite-powered Preact Apps </h1>
      <section>
        <Resource
          title="Learn Preact"
          description="If you're new to Preact, try the interactive tutorial to learn important concepts"
          href="https://preactjs.com/tutorial"
        />
        <Resource
          title="Differences to React"
          description="If you're coming from React, you may want to check out our docs to see where Preact differs"
          href="https://preactjs.com/guide/v10/differences-to-react"
        />
        <Resource
          title="Learn Vite"
          description="To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation"
          href="https://vitejs.dev"
        />
      </section>
    </div>
  );
}

function Resource(props) {
  return (
    <a href={props.href} target="_blank" class="resource">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </a>
  );
}
