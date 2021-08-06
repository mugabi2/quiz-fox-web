var questionNumber;
var quizCode= localStorage.getItem("current quiz");
const docQuiz = db.collection("QUIZZES").doc(quizCode);
  var statement = docQuiz.get().then(doc => {
           if (doc.exists) {
               // console.log('Document data:', doc.data());
  jQuery.each(doc.data(), function (key, value) {
            if(key=="numberOfQuestions"){
              questionNumber=parseInt(value)+1;
              document.getElementById("qnnumber").innerHTML = questionNumber;
              console.log("dsfds");
            }
})
} else {
console.error('Please check your collection and document name in the [firestore] shortcode!');
}
}).catch(error => {
console.error('Please check your collection and document name in the [firestore] shortcode!', error);
});

$("#createnumber").click(function(event){
    event.preventDefault();
    const question=document.getElementById("question").value;
    const a=document.getElementById("a").value;
    const b=document.getElementById("b").value;
    const c=document.getElementById("c").value;
    const d=document.getElementById("d").value;
    const correct=document.getElementById("correct").value;
    const hasPhoto="0";
    const photoUrl="";

console.log(quizCode," ",questionNumber);
questionNumber=questionNumber.toString();
      db.collection(quizCode).doc(questionNumber).set({
          question: question,
          a: a,
          b: b,
          c: c,
          d: d,
          correct: correct,
          hasPhoto: hasPhoto,
          photoUrl: photoUrl
        }).then(() => {

              docQuiz.update({
              numberOfQuestions:questionNumber
              }).then(() => {
          window.location.href = "quizNumbers.html";
        }).catch(err => {
          console.log(err.message);
        });
          // close the create modal & reset form
        //   categoriesFormcrt.reset();
        //   document.getElementById("progbarcatrt").style.visibility="hidden";
        // document.getElementById("category_namecrt").focus();
        }).catch(err => {
          console.log(err.message);
        });

});
