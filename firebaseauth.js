import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { doc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDfws1U3INEZ0iVgD34I4SPHxJkICZG7cA",
    authDomain: "carros-d6437.firebaseapp.com",
    projectId: "carros-d6437",
    storageBucket: "carros-d6437.appspot.com",
    messagingSenderId: "673686792734",
    appId: "1:673686792734:web:26c1b26601022d742adc0f",
    measurementId: "G-HM0Y5N798M"
};

const app = initializeApp(firebaseConfig);

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('signup-btn');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('signup-email').value;
    const password=document.getElementById('signup-password').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('este email já existe !!!', 'signUpMessage');
        }
        else{
            showMessage('não é possível criar usuário', 'signUpMessage');
        }
    })
 });

 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        alert("sucesso ao entrar na conta")
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='index.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            alert("email ou senha incorreto");
        }
        else{
           alert("email ou conta não existe");
        }
    })
 })

 getAuth()
  .getUsers([
    { uid: 'q5XefRMnMjhAOyXhbCCCuaeJ4sS2' },
    { email: 'nycollesimane@acad.ifma.edu.br' },
    { providerId: 'google.com', providerUid: 'google_uid4' },
  ])
  .then((getUsersResult) => {
    console.log('Successfully fetched user data:');
    getUsersResult.users.forEach((userRercord) => {
      console.log(userRercord);
    });

    console.log('Unable to find users corresponding to these identifiers:');
    getUsersResult.notFound.forEach((userIdentifier) => {
      console.log(userIdentifier);
    });
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });