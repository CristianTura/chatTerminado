import { useContext } from "react"
import Images from "../assest/Images"
import { AuthContext } from "../auth/AuthContext";

import '../css/Profile.css'
const Profile = () => {
    const {auth,logout} = useContext(AuthContext);
    return (
        <div>
            <div className="profile_contant">
                <div className="phone">
                    <img src={Images.profile2} alt="perfil" />
                    <h3>{auth.name}</h3>
                    <p>{auth.typeUser}</p>
                </div>
                {/* <div className="profile_items">
                    <div className="items_D">
                        <img src={Images.cell} alt="cell" />
                        <p>llamar</p>
                    </div>
                    <div className="items_D">
                        <img src={Images.message} alt="mess" />
                        <p>mensage</p>
                    </div>
                    <div className="items_D">
                        <img src={Images.more} alt="more" />
                        <p>mas</p>
                    </div>
                </div> */}
                <h2>Archivos adjuntos</h2>
                <div className="attach">
                    <p>Achivo fuente</p>
                    {/* <h3>Ver todo</h3> */}
                </div>
                <div className="attach_items">
                        <div className="attach_items_t">
                            <img src={Images.png} alt="PNG" />
                            <p>Poco phone.png</p>
                        </div>
                        <div className="attach_items_t">
                            <img src={Images.mp3} alt="mp3" />
                            <p>Play date.mp3</p>
                        </div>
                        <div className="attach_items_t">
                            <img src={Images.link} alt="link" />
                            <p>Final file.pdf</p>
                        </div>
                </div>
               {/*  <h2>Fotos y videos</h2>
                <div className="pictures">
                    <img src={Images.contacts} alt="" />
                    <img src={Images.contacts} alt="" />
                    <img src={Images.contacts} alt="" />
                    <img src={Images.contacts} alt="" />
                    <img src={Images.contacts} alt="" />
                    <img src={Images.contacts} alt="" />
                    <img src={Images.contacts} alt="" />
                    <img src={Images.contacts} alt="" />
                    <img src={Images.contacts} alt="" />
                </div> */}
                <div className="close">
                <img src={Images.close} alt="close" />
                <h3 onClick={logout}>Cerrar Sesión</h3>
            </div>
            </div>
        </div>
    )
}

export default Profile