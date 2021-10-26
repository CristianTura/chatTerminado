import Images from '../assest/Images'
import {Link} from 'react-router-dom'
import '../css/Home.css'

const Home = () => {
    return (
        <section className="home">
            <div className="home_card">
                <div className="home_title">
                    <h1>INTOPCOL</h1>
                    <p>Communication</p>
                </div>
                <img src={Images.logo} alt="logo" />
                <div className="home_btn">
                    <Link to="/auth/login">Ingresar</Link>    
                    <p>¿No tienes una cuenta? 
                    <Link to="/auth/register"><strong>Regístrate ahora</strong> </Link></p>
                </div>
            </div>
        </section>
    )
}

export default Home
