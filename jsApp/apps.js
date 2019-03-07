const listaUsuarios = document.querySelector("#listaUsuarios");
const userForm = document.querySelector("#userForm");
const name = document.querySelector("#name");

let urlJson = 'http://localhost:3000/api/v1/users'

fetch(urlJson)
	.then(function(response){
		return response.json();
	})
	.then(function(users){
		// console.log(users);
		for(let user of users){
			listaUsuarios.innerHTML += itemUser(user.name)
		}

	})

userForm,addEventListener("submit", crearUser)

function crearUser(evento){
	evento.preventDefault();
	console.log(name.value);

	postRails(name.value)

	agregandoUser(name.value)

	userForm.reset()
}


function postRails(username){

	(async () => {
	  const rawResponse = await fetch(urlJson, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({name: username})
	  });
	  const content = await rawResponse.json();

	  console.log(content);
	})();


}


function agregandoUser(username){
	const elemento = document.createElement('div')
	elemento.innerHTML = itemUser(username)
	listaUsuarios.appendChild(elemento)
}


function itemUser(username){
	return  `
					<div class="alert alert-secondary" role="alert">
					  ${username}
					</div>
				`
}