		// Your web app's Firebase configuration
		const firebaseConfig = {

			apiKey: "AIzaSyAGuzgDlxHoFh2Y7AwZkkAX5reAz960DiA",
			
			authDomain: "restaurant-app-de673.firebaseapp.com",
			
			projectId: "restaurant-app-de673",
			
			storageBucket: "restaurant-app-de673.appspot.com",
			
			messagingSenderId: "57200602935",
			
			appId: "1:57200602935:web:50650e45cff9d52cd674b2"
			
			};
			
			
			// Initialize Firebase
			firebase.initializeApp(firebaseConfig);
			// Initialize variables
			const auth = firebase.auth()
			const database = firebase.database()
			

			//listing for auth status
		auth.onAuthStateChanged(user => {
			console.log(user)
		})


			// Set up our register function
			function register () {
			  // Get all our input fields
			  email = document.getElementById('email').value
			  password = document.getElementById('password').value
			  full_name = document.getElementById('full_name').value
			  date_of_birth = document.getElementById('date').value
			  
			
			  gender = "";
				if(document.getElementById('Male').checked){
					gender = document.getElementById("Male").value
				} else if (document.getElementById('Female').checked){
					gender = document.getElementById("Female").value
				}else if (document.getElementById('Others').checked){
					gender = document.getElementById("Others").value
				}
			
			  // Validate input fields
			  if (validate_email(email) == false || validate_password(password) == false) {
				alert('Email or Password is Outta Line!!')
				return
				// Don't continue running the code
			  }
			  if (validate_field(full_name) == false  ) {
				alert('One or More Extra Fields is Outta Line!!')
				return
			  }
			 
			  // Move on with Auth
			  auth.createUserWithEmailAndPassword(email, password)
			  .then(function() {
				// Declare user variable
				var user = auth.currentUser
			
				// Add this user to Firebase Database
				var database_ref = database.ref()
			
				// Create User data
				var user_data = {
				  email : email,
				  full_name : full_name,
				  date_of_birth: date_of_birth,
				  gender:gender,  
				  last_login : Date.now()
				}
			
				// Push to Firebase Database
				database_ref.child('users/' + user.uid).set(user_data)
			
				// DOne
				window.location.href="../html/login.html"
				console.log('User Created!!')
				
				 
			  })
			  .catch(function(error) {
				// Firebase will use this to alert of its errors
				var error_code = error.code
				var error_message = error.message
			
				alert(error_message)
			  })
			}
			
			// Set up our login function
			function login () {
			  // Get all our input fields
			  email = document.getElementById('email').value
			  password = document.getElementById('password').value
			
			  // Validate input fields
			  if (validate_email(email) == false || validate_password(password) == false) {
				alert('Email or Password is Outta Line!!')
				return
				// Don't continue running the code
			  }
			
			  firebase.auth().signInWithEmailAndPassword(email, password)
			  .then(function() {
				// Declare user variable
				var user = firebase.auth().currentUser
			
				// Add this user to Firebase Database
				var database_ref = database.ref()
			
				// Create User data
				var user_data = {
				  last_login : Date.now()
				}
			
				// Push to Firebase Database
				database_ref.child('users/' + user.uid).update(user_data)
			
				// DOne
				window.location.href="../index.html";
				console.log('User Logged In!!')

				
			  })
			  .catch(function(error) {
				// Firebase will use this to alert of its errors
				var error_code = error.code
				var error_message = error.message
			
				alert(error_message)
			  })
			}
			
			
			
			
			// Validate Functions
			function validate_email(email) {
			  expression = /^[^@]+@\w+(\.\w+)+\w$/
			  if (expression.test(email) == true) {
				// Email is good
				return true
			  } else {
				// Email is not good
				return false
			  }
			}
			
			function validate_password(password) {
			  // Firebase only accepts lengths greater than 6
			  if (password < 6) {
				return false
			  } else {
				return true
			  }
			}
			
			function validate_field(field) {
			  if (field == null) {
				return false
			  }
			
			  if (field.length <= 0) {
				return false
			  } else {
				return true
			  }
			} 

			document.getElementById("reset").addEventListener("click", function(){
				document.getElementById("email").value = "";
				document.getElementById("full_name").value = "";
				document.getElementById("date").value = "";
				document.getElementById("password").value = "";
			  }); 

			//   export default function logout(){
						  
			// 	e.preventDefault();
			// 	auth.signOut().then(()=>{
			// 	  console.log("user logged out")
			// 	});
			 
			//   }
	
			  