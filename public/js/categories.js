
firebase.auth().onAuthStateChanged(function(user) {
 // window.user = user; // user is undefined if no user signed in
 if(user){
   console.log("^^^^^^ ",user);
 }else{
   console.log("^^^^^^ ");
 }
});
//categories
const categoriesFormcrt=document.querySelector('#categories-formcrt');
const createCatBtn=document.querySelector('#createCatBtn');
createCatBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  const categoryName=categoriesFormcrt['category_namecrt'].value.toUpperCase();
  document.getElementById("progbarcatrt").style.visibility="visible";
  const buttonv=categoriesFormcrt['createCatBtn'].value;
  console.log("999999 "+categoryName);
    // Retrieve
    var dbcata = "CATEGORIES";
    ///
    var catchecker=0;
            // db.collection(dbcata).get()
            //     .then(function(querySnapshot) {
                    // querySnapshot.forEach(function(doc) {
                    //   if (doc.id==categoryName) {
                    //     catchecker=1;
                    //     console.log("equal equal");
                    //   }
                    //
                    // })
                              console.log("noto not not");
                              db.collection(dbcata).doc(categoryName).set({
                                  numberOfQuizzes: 0
                                }).then(() => {
                                  // close the create modal & reset form
                                  categoriesFormcrt.reset();
                                  document.getElementById("progbarcatrt").style.visibility="hidden";
                                document.getElementById("category_namecrt").focus();
                                }).catch(err => {
                                  console.log(err.message);
                                    // document.querySelector('.error').innerHTML=err.message;
                                    // $('#progbar2').removeClass("active");
                                      document.getElementById("progbarcatrt").style.visibility="hidden";
                                });

                // });

  // console.log(categoryName);
})
