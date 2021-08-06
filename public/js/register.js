
firebase.auth().onAuthStateChanged(function(user) {
 // window.user = user; // user is undefined if no user signed in
 if(user){
   console.log("^^^^^^ ",user);
 }else{
   console.log("^^^^^^ ");
 }
});
const signupForm=document.querySelector('#signup_form1');
const signupBtn=document.querySelector('#signupBtn');

signupBtn.addEventListener("click", function() {
  event.preventDefault();
  const email=document.getElementById("userEmailsu").value;
  const password=document.getElementById("userPasswordsu").value;

console.log(email,password);
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
        document.location.replace("categories.html");
  })
  .catch((error) => {
    console.log(email,password);
  });
});
