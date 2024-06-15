import './footer.css'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  function handleSectionNavigate(sectionId) {
    navigate('/allProduct', { state: { sectionId } });
  }

    return (
        <>
        <footer id="footer">
            <div id="container-footer" className="container-fluid">
              <div className="row row-cols-1 row-cols-md-4">
                <div className="col">
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a  className="custom-btn-footer footer-btn-top" onClick={()=>handleNavigate('/allProduct')}>Women</a></div>
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a  className="custom-btn-footer" onClick={()=>handleSectionNavigate('dress-section')}>Dresses</a></div>
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a className="custom-btn-footer" onClick={()=>handleSectionNavigate('pants-section')}>Pants</a></div>
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a  className="custom-btn-footer" onClick={()=>handleSectionNavigate('skirt-section')}>Skirts</a></div>
                </div>
                <div className="col">
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a className="custom-btn-footer footer-btn-top" onClick={()=>handleNavigate('/allProduct')}>Men</a></div>
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a onClick={()=>handleSectionNavigate('shirt-section')} className="custom-btn-footer">Shirts</a></div>
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a onClick={()=>handleSectionNavigate('pants-section')} className="custom-btn-footer">Pants</a></div>
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a onClick={()=>handleSectionNavigate('hoodie-section')} className="custom-btn-footer">Hoodies</a></div>
                </div>
                <div className="col d-flex justify-content-center"><a href="allProduct" className="custom-btn-footer footer-btn-top" onClick={()=>handleSectionNavigate('kids-section')}>Kids</a></div>
                <div className="col">
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a href="#" className="custom-btn-footer footer-btn-top">Links</a></div>
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a href="/" className="custom-btn-footer">Home</a></div>
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a href="/login" className="custom-btn-footer">Login</a></div>
                  <div className="row d-flex flex-column align-items-center justify-content-md-center"><a href="/contact" className="custom-btn-footer">Contact</a></div>
                </div>
              </div>
              <div id="footer-bottom-container">
                <div id="footer-bottom">
                  <div className="d-flex justify-content-center">Copyright ©Ecommerce 2023-2024</div>
                </div>
              </div>
            </div>
          </footer>
        </>
    )
}

export default Footer;