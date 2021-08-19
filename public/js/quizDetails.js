var quizzes, categoryNumb;
var one="1"
var quizCode;
var photoUrl;
var x = document.getElementById("imagecontainer");
var profilePhotoUrl_key="profile photo";
var name_key="name";
var email_key="items";

var instructorEmail = localStorage.getItem(email_key);
var instructorName = localStorage.getItem(name_key);
var profilePhotoUrl = localStorage.getItem(profilePhotoUrl_key);

//POPULATE CATEGORIES SELECT
db.collection("CATEGORIES").onSnapshot(snapshot=>{
setupDropdownAcc(snapshot.docs);
})

const docReftss = db.collection("INFORMATION").doc("quizzes");
  var statement = docReftss.get().then(doc => {
           if (doc.exists) {
               // console.log('Document data:', doc.data());
  jQuery.each(doc.data(), function (key, value) {
            if(key=="numberOfQuizzes"){
              quizzes=parseInt(value);
              console.log(quizzes);
              quizCode="qc"+quizzes;
              console.log(quizCode);
              x.classList.remove('hideout');
              // photoUrl=`USERS/samuelmugabi2@gmail.com.jpg`;
              photoUrl=`QUIZZES/`+quizCode+`.jpg`;
              console.log(photoUrl);
            }
})
} else {
console.error('Please check your collection and document name in the [firestore] shortcode!');
}
}).catch(error => {
console.error('Please check your collection and document name in the [firestore] shortcode!', error);
});


$("#createquiz").click(function(event){
    event.preventDefault();
    const title=document.getElementById("title").value;
    const description=document.getElementById("description").value;
    const category=document.getElementById("category").value;
    const instructor=instructorName;
    const level="NORMAL";
    const price="FREE";
    const rating="0";
    const numberOfQuestions="0";
    const students="0";
    quizzes=quizzes+1;
    console.log(instructor);

    // GET NUMBER OF QUIZZES IN CATEGORIES
    const docReftss = db.collection("CATEGORIES").doc(category);
      var statement = docReftss.get().then(doc => {
               if (doc.exists) {
      jQuery.each(doc.data(), function (key, value) {
                if(key=="numberOfQuizzes"){
                  categoryNumb=parseInt(value)+1;
                  categoryNumb=categoryNumb.toString();
                }
    })
    } else {
    console.error('Please check your collection and document name in the [firestore] shortcode!');
    }
    }).catch(error => {
    console.error('Please check your collection and document name in the [firestore] shortcode!', error);
    });

console.log(quizCode+"ddddddd");
      db.collection("QUIZZES").doc(quizCode).set({
          title: title,
          description: description,
          category: category,
          instructor: instructor,
          level: level,
          price: price,
          rating: rating,
          students: students,
          hasPhoto: "1",
          ranking: "1",
          photoUrl: photoUrl,
          numberOfQuestions: numberOfQuestions,
          quizCode: quizCode,
          instructorEmail: instructorEmail,
          instructorName: instructorName,
          instructorPhotoUrl: profilePhotoUrl
        }).then(() => {
            localStorage.setItem("current quiz", quizCode);
              db.collection(quizCode).doc(one).set({
              hasPhoto:0
              }).then(() => {
                // UPDATE NUMBER OF QUIZZES
                db.collection("INFORMATION").doc("quizzes").update({
                numberOfQuizzes:quizzes
                }).then(() => {

                  // UPDATE NUMBER OF QUIZZES IN CATEGORIES
                    db.collection("CATEGORIES").doc(category).update({
                    numberOfQuizzes:categoryNumb
                    }).then(() => {
                  window.location.href = "quizNumbers.html";
                  }).catch(err => {
                  console.log(err.message);
                  });
                          }).catch(err => {
            console.log(err.message);
          });
              }).catch(err => {
          console.log(err.message);
        });
        }).catch(err => {
          console.log(err.message);
        });

});

      function preview_image(event) {
      auth.onAuthStateChanged(user=>{
              file=event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('output_image');
          readed=reader.result;
          output.src = readed;
        }
        console.log(photoUrl);
      storage.ref(photoUrl).put(file).then(doc => {
        console.log("upload successful");
        reader.readAsDataURL(file);
      })
    })
  }

// dropdown
const dropdownpro=document.querySelector('.crtitdrp');

const setupDropdownAcc =(data)=>{
  let html=`
    <select class="team wonder " id="category">
    <option>Select Quiz Category</option>`;
  let htmlEnd=`
</select>`;
  var list='';
  data.forEach(doc=>{
    const drops=doc.data();
    const li=`
    <option>${doc.id}</option>
    `;
    html+=li;
  });
  html+=htmlEnd;
dropdownpro.innerHTML=html;
// console.log(html);
  // Or with jQuery

// bring select to life
    $(document).ready(function(){
      $('select').formSelect();
    });
}
