import "./Home.Styles.css";

function Home() {
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  return (
    <div className="home">
      <div className="user">Welcome {username}.</div>

      <div className="email"> You currently signed in with {email}.</div>
    </div>
  );
}

export default Home;
