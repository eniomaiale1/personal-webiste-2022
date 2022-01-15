import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

class Contact extends Component {

   constructor(propos){
      super(propos);
      this.state = {
         message:{
            contactName: '',
            contactEmail: '',
            contactSubject: '',
            contactMessage: '',
         },
         allowSend:false,
         reCaptchaToken:null,
      }
      this.onChangeRecapcha = this.onChangeRecapcha.bind(this);
      this.onSendMessage = this.onSendMessage.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }
   handleChange(event){
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
         //...this.state,
         message:{
            ...this.state.message,
            [name]:value
         }
      })
      console.log(name, value);
   }

   onChangeRecapcha(token){
      //console.log('Captcha value:', token);
      var allowSend = false;
      allowSend = token ? true : false;
      this.setState(
         {
            ...this.state, 
            allowSend:allowSend,
            reCaptchaToken:token,
         })
   }

   onSendMessage(event){
      var data = {
         token: this.state.reCaptchaToken,
         message: this.state.message,
      }

      fetch(
         "https://prod-25.eastus2.logic.azure.com:443/workflows/1f979adcd0db49cba4383b4dea5f1499/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GFIu9fOnnQPX4u6pWydw7MI8BiKffRZgBL49CeDlB7s",
         {
            method: 'POST',
            mode: 'cors',
            headers: {
               'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
         console.log(data);
      })
      .catch((error) => {
         console.error('Error:', error);
      });

      event.preventDefault();
   }

  render() {
   //const reRef = useRef();
    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">
         <div className="row section-head">
            <div className="two columns header-col">
               <h1><span>Get In Touch.</span></h1>
            </div>
            <div className="ten columns">
                  <p className="lead">{message}</p>
            </div>
         </div>

         <div className="row">
            <div className="eight columns">
               <form id="contactForm" name="contactForm">
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input 
                        type="text" 
                        size="35" 
                        id="contactName" 
                        name="contactName" 
                        onChange={this.handleChange}
                        value={this.state.message.contactName}
                        />
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input 
                        type="text" 
                        size="35" 
                        id="contactEmail" 
                        name="contactEmail" 
                        onChange={this.handleChange}
                        value={this.state.message.contactEmail}
                        />
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input 
                        type="text" 
                        size="35" 
                        id="contactSubject" 
                        name="contactSubject" 
                        onChange={this.handleChange}
                        value={this.state.message.contactSubject}
                        />
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea 
                        cols="50" 
                        rows="15" 
                        id="contactMessage" 
                        name="contactMessage"
                        onChange={this.handleChange}
                        value={this.state.message.contactMessage}
                        ></textarea>
                  </div>
                  <div>
                     <ReCAPTCHA 
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} 
                        ref={(el) => {this.messageCaptcha = el;}} 
                        onChange={this.onChangeRecapcha}
                        />
                  </div>
                  <div style={{paddingTop:'25px'}}>
                     {this.state.allowSend ? 
                        <button 
                           className="submit" 
                           onClick={this.onSendMessage}
                           >Submit</button>
                        : null }
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning"> Error boy</div>
				   <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Contact Info</h4>
					   <p className="address">
						   {name}<br />
						   {street} <br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span>
					   </p>
				   </div>
               
               <div className="widget widget_tweets" style={{display: 'none'}}>
                  <h4 className="widget-title">Latest Tweets</h4>
                  <ul id="twitter">
                     <li>
                        <span>
                        Tweet1
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">2 Days Ago</a></b>
                     </li>
                     <li>
                        <span>
                        Tweet2
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">3 Days Ago</a></b>
                     </li>
                  </ul>
		         </div>
            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
