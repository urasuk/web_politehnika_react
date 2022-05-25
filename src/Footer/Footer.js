import './Footer.css';

function Footer() {
    return(
        <footer className="footer">
            <div className="container">
                <div className="footer__row">
                    <div className="footer__col">
                        <div className="footer__item">
                            <div className="footer__title">
                                Download Our App
                            </div>
                            <div className="footer__subtitle">
                                Download app for android and ios smartphones
                            </div>
                        </div>
                    </div>
                    <div className="footer__col">
                        <div className="footer__item">
                            <div className="footer__img"></div>
                            <div className="footer__subtitle">
                                Our purpose is to sustaninably make the pleasure and benefits of sports accessible to
                                the many
                            </div>
                        </div>
                    </div>
                    <div className="footer__col">
                        <div className="footer__item">
                            <div className="footer__title">
                                Useful links
                            </div>
                            <div className="footer__subtitle">
                                Coupons <br/> Blog Post <br/> Return Policy <br/> Api
                                </div>
                        </div>
                    </div>
                    <div className="footer__col">
                        <div className="footer__item">
                            <div className="footer__title">
                                Follow us
                            </div>
                            <div className="footer__subtitle">
                                Facebook <br/> Twitter <br/> Instagram <br/> Youtube
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;