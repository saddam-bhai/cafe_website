// ----------------------------Sign-In------------------------------
const signinform = document.getElementById('login-in')
signinform.addEventListener('submit', login)

async function login(event) {
	event.preventDefault()
	const email = document.getElementById('lemail').value
	const password = document.getElementById('lpassword').value

	const result = await fetch('/api/auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	}).then((res) => res.json())

	if (result.status === 'ok') {
		// alert(result.message)
		// swal("Ok!", result.message, "success");
		window.location.href = '/main';
	} else {
		// alert(result.error)
		if(result.error === "Wrong Password")
			swal("Opps!", result.error, "error");
		else
			swal("Opps!", result.error, "warning"); 
	}
}
// ----------------------------Sign-Up------------------------------
var form2 = document.getElementById('login-up')
form2.addEventListener('submit', registerUser)

async function registerUser(event) {
	event.preventDefault()
	const name = document.getElementById('name').value
	const number = document.getElementById('number').value
	const email = document.getElementById('email').value
	const password = document.getElementById('password').value

	const result = await fetch('/api/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			number,
			email,
			password
		})
	}).then((res) => res.json())

	if (result.status === 'ok') {
		alert(result.message)
		window.location.href = '/';
	} else {
		// alert(result.error)
		swal("Opps!", result.error, "warning");
	}
}

var signUp = document.getElementById('sign-up'),
	signIn = document.getElementById('sign-in'),
	loginIn = document.getElementById('login-in'),
	loginUp = document.getElementById('login-up');

signUp.addEventListener('click', function () {
	loginUp.classList.remove('none');
	loginUp.classList.add('block');

	loginIn.classList.remove('block');
	loginIn.classList.add('none');
});


signIn.addEventListener("click", function () {
	loginUp.classList.remove('block');
	loginUp.classList.add('none');

	loginIn.classList.remove('none');
	loginIn.classList.add('block');
});
