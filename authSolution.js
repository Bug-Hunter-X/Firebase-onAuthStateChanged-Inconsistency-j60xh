The problem is that background state changes don't always trigger onAuthStateChanged immediately.

//Original code with issue
firebase.auth().onAuthStateChanged(user => {
  // UI updates based on user
});

//Solution code
let user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(newUser => {
  if (newUser && !user){
    //User just logged in
  } else if (!newUser && user){
    //User just logged out
  } else if (newUser && user && newUser.uid !== user.uid){
    //User switched account
  } else {
    //User still logged in as before. This else statement will also trigger when the token is refreshed
  }
  user = newUser;
});