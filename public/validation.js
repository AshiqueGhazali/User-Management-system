
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

function checkPassword(event) {
    event.preventDefault();
  
    let password = document.getElementById("password").value;
    let cnfrPassword = document.getElementById("cnfrm-password").value;
    let message = document.getElementById("message");
    let email = document.getElementById("emailAddress").value;
  
    if (password.length === 0|| password[0]==" ") {
      message.textContent = "Password cannot be empty.";
      message.style.color = "red";
      return;
    }
  
    if (password !== cnfrPassword) {
      message.textContent = "Passwords do not match.";
      message.style.color = "red";
      return; 
    }
    if (!validateEmail(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
        return; 
      }
  
   
    console.log("Password & email verified! Submitting form..."); 
  
    document.getElementById("myForm").submit();
  }



  
  





