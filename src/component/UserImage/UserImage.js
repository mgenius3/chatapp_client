import React from "react";
import queryString from "query-string";
import avatar from "./img/img_avatar.png";
import "./UserImage.css";

class UserImage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      room: "",
      booleanImg: false, //check if the uploaded image is been delivered
      submitClick: false, //check whether the user upload an image or not
      imageToUse: false, //check the image the user is going with i.e default image("avatar") or provided image from the user
      ErrorMessage: "", //getting the error message from the server and displaying to the users,
      closeMessage: false, //an event to close the error messages,
      checkIfImageIsSelected:false
    };
  }

  imageRef = React.createRef();

  submitImage = (data) => {
    const imguploaded = document.querySelector(".imguploaded");
    const imgupload = document.querySelector(".imgupload")
    let ask = "";//we will use these variable to ask the user if they will not upload an image
    if(imgupload){
       if (imgupload.value == "") {

      //this will run when the user refuse to upload an image
      ask = window.confirm(
        "You did not upload an image,\n Click ok to continue."
      );
      if (ask) {
        this.setState({ submitClick: true });
        this.setState({ imageToUse: true });
      }
    } else {
      //when image is provided by the user to uplaod
      this.setState({ submitClick: true });
    }
}else{
   if (imguploaded.value == "" ) {
      //this will run when the user refuse to upload an image
      ask = window.confirm(
        "You did not upload an image,\n Click ok to continue."
      );
      if (ask) {
        this.setState({ submitClick: true });
        this.setState({ imageToUse: true });
      }
    } else {
      //when image is provided by the user to uplaod
      this.setState({ submitClick: true });
    }
  };
    const { name, room } = queryString.parse(this.props.location.search);
    this.setState({ name });
    this.setState({ room });
    console.dir(data);
    const formData = new FormData();
    formData.append("name", name); //sending the name of the user
    formData.append("room", room); //sending the room of the user
    formData.append("passport", data.files[0]); //sending the image file of the user

    fetch("https://mosboy-chat-app.herokuapp.com", {
      method: "post",
      mode: "cors",
      //content type header should not be specified bcuz the browser automatically sets them
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          if (!response.includes("ok")) this.setState({ ErrorMessage: response });
          if(ask !== false){//this below get promise will not run if the alert message return false
          fetch(`https://mosboy-chat-app.herokuapp.com/${name}${room}`)
            .then((imgfound) => {
              if (imgfound) {
                this.setState({ booleanImg: true });
                this.setState({ imageToUse: true });
              } else {
                alert("image not found");
              }
            })
            .catch((err) => console.log(err));}
        }
      })
      .catch(console.log);


}
   

  closeErrorMessage = () => {
    this.setState({ closeMessage: true });
  };
  checkIfImageIsSelected=()=>{
    this.setState({checkIfImageIsSelected:true})
  }
  render() {
    const {
      name,
      room,
      booleanImg,
      submitClick,
      imageToUse,
      ErrorMessage,
      closeMessage,
      checkIfImageIsSelected
    } = this.state;

    return (
      <div className="my_img">
        <div
          className="error"
          style={{
            opacity: ErrorMessage ? "1" : "0",
            display: closeMessage ? "none" : "block",
          }}
        >
          {ErrorMessage}
          <sup className="closeErrorMessage" onClick={() => this.closeErrorMessage()}>x</sup>
        </div>
        {booleanImg ? (
          <div className="img">
            <img
              id="userUploadedImg"
              src={`https://mosboy-chat-app.herokuapp.com/${name}${room}`}
              alt="userphoto"
            />
          </div>
        ) : (
          <div className="img">
            <img id="userUploadedImg" src={avatar} alt="userphoto" />
          </div>
        )}
        {submitClick ? (
          imageToUse ? (
            <div className="ready">
              <a href={`/chat?name=${name}&room=${room}`} title="click">
                OK
              </a>
            </div>
          ) : (
            <div className="transition"></div>
          )
        ) : (
          <div className="toolupload">
            <div>
                <input
                  className={checkIfImageIsSelected ? "imguploaded" : "imgupload"}
                  type="file"
                  name="passport"
                  accept="image/*"
                  ref={this.imageRef}
                  onChange={()=>this.checkIfImageIsSelected()}
                />
            </div>
            <button onClick={() => this.submitImage(this.imageRef.current)}>
              upload
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default UserImage;
