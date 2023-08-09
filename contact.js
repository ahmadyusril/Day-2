function submitData() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  let subject = document.getElementById("input-subject").value;
  let message = document.getElementById("input-message").value;

  if (name == "") {
    return alert("Please fill your name!");
  } else if (email == "") {
    return alert("Please fill your email!");
  } else if (phone == "") {
    return alert("Please fill your Phone number!");
  } else if (subject == "") {
    return alert("Please choose the Subject!");
  } else if (message == "") {
    return alert("Please fill your Message!");
  }

     console.log(name);
     console.log(email);
     console.log(phone);
     console.log(subject);
     console.log(message);

  let emailReceiver = "yusril7680@gmail.com";

  let a = document.createElement("a");
  a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello, my name is ${name}, ${message}, please contact me in this phone number ${phone}`;
  a.click();

  let data = { name, email, phone, subject, message };

  console.log(data);
}