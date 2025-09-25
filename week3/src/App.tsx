import './App.css'
import { Router } from './router/Router';
import { Route } from './router/Route';
import { Link } from './router/Link';

const Home = () => {
  return (
      <>
        <h2>Home</h2>
      </>
  )

}

const Moni = () => {
  return (
    <>
      <h2>MONI의 페이지입니다.</h2>
    </>
  )
}

const NotFound = () => <h2>404 Not Found</h2>;

function App() {

  return (
    <>
    <nav style={{display: "flex", gap: 12}}>
      <Link to = "/">HOME</Link>
      <Link to = "/moni">MONI</Link>
      <Link to = "/not-exist">NOT-EXIST</Link>
    </nav>
    {/* Router 안에서 Route 선언 */}
    <Router>
      <Route path="/" component={Home} />
      <Route path="/moni" component={Moni} />
      <Route path="*" component={NotFound} />
    </Router>
    </>
  )
}

export default App
