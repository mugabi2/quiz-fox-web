          var profilePhotoUrl_key="profile photo";
          var name_key="name";
          var email_key="items";

firebase.auth().onAuthStateChanged(function(user) {
 // window.user = user; // user is undefined if no user signed in
 if(user){
   console.log("^^^^^^ ",user);
 }else{
   console.log("out out out ");
 }
});

$("#loginbutton").click(function(event){
    event.preventDefault();
    const email=document.getElementById("userEmailli").value;
    const password=document.getElementById("userPasswordli").value;
firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
  // Signed in

     localStorage.setItem(email_key, email);
   var sulement=db.collection("USERS").where("email", "==", email);
   sulement.get().then(function(querySnapshot) {
       querySnapshot.forEach(function(doc) {
   var dropss=doc.id;
   jQuery.each(doc.data(), function (key, value) {
             if(key=="profilePhotoUrl"){
               localStorage.setItem(profilePhotoUrl_key, value);
             }else if (key=="name") {
                localStorage.setItem(name_key, value);
              }
   })

         document.location.replace("index.html");
   });
   }).catch(error => {
   console.error('Please check your collection and document name in the [firestore] shortcode!', error);
   });

})
.catch(function(err) {
console.log(err);
 });
});

// $("#registerpageto").click(function(event){
//     event.preventDefault();
//     window.location.href = "register.html";
//     //   document.location.replace("home.html");
// });

//log in
const loginForm=document.querySelector('#login_form');
const loginBtn=document.querySelector('#loginbutton');
// loginBtn.addEventListener('click', (e) =>{
//   e.preventDefault();
//   loginBtn.classList.add('active');
//
//   const email=document.getElementById("userEmailli").value;
//   const password=document.getElementById("userPasswordli").value;
//   if (email === '' || password==='')
//   {
//       alert("Please fill in all fields");
//       // $('#selBooks').focus();
//       console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
//         document.getElementById('errormsg').innerHTML="Please fill in all fields";
//         // document.getElementById("progbarsing").style.visibility="hidden";
//         loginBtn.classList.remove('active');
//       return false;
//     }else {
//     // log in the user
//   auth.signInWithEmailAndPassword(email, password).then(cred => {
//       // console.log(cred.user);
//       console.log("000000000");
//       localStorage.setItem("kzzero", 0);
// ////////////////
//       var waitforme=storage(email);
//       //////////////////
// console.log("wait",waitforme);
//   // WAIT FOR THE PROMISE
//       const checkIfDonesee = () => {
//         waitforme.then(ok => {
//           waitforme=ok;
//                     // var song = localStorage.getItem(account_key);
//                     // console.log("555555acckey",song);
//                     localStorage.setItem("kzfive", 5);
//           console.log("wait:",waitforme);
//           localStorage.setItem("login", "1");
//           loginForm.reset();
//         document.querySelector('.error').innerHTML=" ";
//         var take=localStorage.getItem(account_key);
//         console.log("take",take);
//         // login
//         loginBtn.classList.remove('active');
//         document.location.replace("index.html");
//
//           })
//           .catch(err => {
//             console.error(err)
//             loginBtn.classList.remove('active');
//           })
//
//       }
//       checkIfDonesee();
//
//   }).catch(err=>{
//     document.querySelector('.error').innerHTML=err.message;
//     loginBtn.classList.remove('active');
//   });
//   console.log(email,password);
// }
// })// login end
