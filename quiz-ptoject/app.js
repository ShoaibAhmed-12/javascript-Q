
// correctAnswers = ['c', 'b', 'a', 'a'];

// const quizForm = document.querySelector(".quiz-form");
//  const result = document.querySelector(".result");
 
 
//  quizForm.addEventListener("submit", (e) => {
//      e.preventDefault();
//      console.log(e)
     

//    let score = 0;
// //    const questions = ["q1", "q2", "q3", "q4"];
// // const userAnswers = questions.map(question => quizForm[question].value);
// const userAnswers = ["q1", "q2", "q3", "q4"].map(q => quizForm[q].value);


//     // const userAnswers = [quizForm.q1.value, quizForm.q2.value, quizForm.q3.value, quizForm.q4.value];

//     const totalQuestions = correctAnswers.length;
//     const scorePerQuestion = 100 / totalQuestions;

//     console.log(scorePerQuestion)


//     userAnswers.forEach((userAnswer, index) => {
//         if (userAnswer === correctAnswers[index]) {
//             console.log(userAnswer)
//             score += scorePerQuestion
//         }
//     })

//     scrollTo(0, 0);
//     result.classList.remove("d-none");

//     let output = 0;

//     const timer = setInterval(() => {

//         result.querySelector("span").textContent = `${output}%`;
//         if (score === output) {
//             clearInterval(timer)
//         } else {
//             output++;
//         }
//     }, 5);


//  })


// const correctAnswers = ['c', 'b', 'a', 'a'];
// const quizForm = document.querySelector(".quiz-form");
// const result = document.querySelector(".result");

// quizForm.addEventListener("submit", e => {
//     e.preventDefault();

//     const userAnswers = ["q1", "q2", "q3", "q4"].map(q => quizForm[q].value);
//     const score = userAnswers.filter((answer, i) => answer === correctAnswers[i]).length * 25;

//     result.classList.remove("d-none");
//     scrollTo(0, 0);

//     let output = 0;
//     const timer = setInterval(() => {
//         result.querySelector("span").textContent = `${output}%`;
//         if (output >= score) clearInterval(timer);
//         else output++;
//     }, 5);
// });
// const correctAnswers = ['c', 'b', 'a', 'a'];
// const quizForm = document.querySelector(".quiz-form");
// const result = document.querySelector(".result");

// quizForm.onsubmit = e => {
//     e.preventDefault();

//     const score = correctAnswers.reduce((score, answer, i) =>
//         score + (quizForm[`q${i + 1}`].value === answer), 0) * 25;

//     result.classList.remove("d-none");
//     scrollTo(0, 0);

//     let output = 0;
//     const timer = setInterval(() => {
//         result.querySelector("span").textContent = `${output++}%`;
//         if (output > score) clearInterval(timer);
//     }, 5);
// };


let colors = ['red','bleow','green','black','green','red']

let colorcount = {}

for(let i =0; i < colors.length ; i++){
    if
}
console.log(colorcount)
// for(let i =0; i < colors.length;i++){
//     if(colorcount[colors[i]]){
//         colorcount[colors[i]] = colorcount[colors[i]] + 1
//     }else{
//         colorcount[colors[i]] = 1
//     }
// }
// console.log(colorcount)