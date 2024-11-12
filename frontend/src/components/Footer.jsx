import '@styles/footer.css';


const Footer = () => {
    return (

        <footer className="site-footer">
            <div className="container">
                
                <h6>About</h6>
                     <p className="text-justify">
                        Empresa dedicada a la venta de articulos de cicilismo como tambien reparacion y mantencion de estos.<br />Conoce nuestra tienda ubicada en el centro de Concpecion
                    </p>
                    
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <h6>Horario de Atencion</h6>
                        <ul className="footer-links">
                            <li><a href="#">Lunes a Viernes: 9:00 - 19:00</a></li>
                            <li><a href="#">Sabado: 10:00 - 14:00</a></li>
                            <li><a href="#">Domingo: Cerrado</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </footer >
    );
}

export default Footer;