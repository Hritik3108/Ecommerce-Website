import { useState } from "react";
import Loading from "../loading";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [contactForm,setContactForm]=useState({
        name:'',
        email:'',
        message:''
    })

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true);
        console.log(contactForm);
        const config = {
            headers: { 
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            };
        
        const body={
            name:contactForm.name,
            email:contactForm.email,
            message:contactForm.message
        }    

        try {
            const sendRequest = await axios.post(`/ecom/contact`, body, config);
            setLoading(false);
            if(sendRequest.status===200){
                toast("Thank You For Contacting Us!");
            }
        } catch (error) {
            console.error("Error sending data:", error.message);
            setLoading(false);
        }

    }

    function handleChange(event){
        const {name,value} = event.target
        setContactForm(prev=>({
            ...prev,
            [name]:value
        }));
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <>
        <div className="container-fluid contact-Container">
        <h1 className="carousel-heading">Contact-Us</h1>
            <div className="row">
                <div className="col">
                    <img src="https://plus.unsplash.com/premium_photo-1709311452215-496c6740ca59?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="contact-img" className="img-contact" />
                </div>
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex flex-column">
                            <div className="col-md-12">
                                <label htmlFor="name" className="form-label fw-bold">Name:</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    className="form-control" 
                                    placeholder="Enter your name"
                                    name="name"
                                    value={contactForm.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="e-mail" className="form-label fw-bold">E-mail:</label>
                                <input 
                                    type="email" 
                                    id="e-mail" 
                                    className="form-control" 
                                    placeholder="Enter your E-mail"
                                    name="email"
                                    value={contactForm.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="msg" className="form-label fw-bold">Message:</label>
                                <textarea 
                                    type="text" 
                                    id="msg" 
                                    className="form-control" 
                                    placeholder="Enter your message"
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleChange}
                                    required
                                    ></textarea>
                            </div>
                        </div>
                       
                        <div className="d-grid gap-2 sub-btn">
                            <button type="submit" className="btn custom-btn btn-block active">Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition: Bounce
        ></ToastContainer>

        </>
    )
}

export default Contact;