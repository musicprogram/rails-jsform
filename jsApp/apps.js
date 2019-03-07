(()=>{
	let form = document.querySelector("#form");
	form.innerHTML = formularioVista()
})()

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
			listaUsuarios.innerHTML += itemUser(user.name,user.id)
		}

	})

userForm,addEventListener("submit", crearUser) // formulario

function crearUser(evento){
	evento.preventDefault();
	// console.log(name.value);

	postRails(name.value)



	userForm.reset()
}
//////////////////////////////

function postRails(username){ //crear en la BD en rails

	(async () => {
	  const rawResponse = await fetch(urlJson, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({name: username})
	  });
	  const content = await rawResponse.json(); // el dato que se guardó
	  // console.log(content.id);
	  let userid = content.id //id creado en rails
	  agregandoUser(username,userid)// agregar vista
	  // console.log(content);
	})();


}
////////////////////////////////agregando a la vista

function agregandoUser(username,userid){
	const elemento = document.createElement('div')
	elemento.innerHTML = itemUser(username,userid)
	listaUsuarios.appendChild(elemento)
}


function itemUser(username,userid){
	return  `
					<div class="alert alert-secondary" role="alert" id="${userid}">
						 <p>
							 	${username}
							 	<a class="btn btn-dark text-info float-right" name="delete">destroy<a/>
						 </p>
			
							

							
					</div>
				`
}



////////////////////////eliminar


listaUsuarios.addEventListener("click", seleccionarEliminar)

function seleccionarEliminar(e){
	// console.log(e.target);
	eliminarUser(e.target)
}

function eliminarUser(target){
	// console.log(target)
	if(target.name === 'delete'){
		// remover vista
		target.parentElement.parentElement.remove()
		/////
		console.log(target.parentElement.parentElement.id); //identificar id de cada objeto en el div principal
		
		//////// remover de rails 
		fetch(`${urlJson}/${target.parentElement.parentElement.id}`, { 
		  method: 'DELETE' 
		});
		//// eliminar funciona ///////// 
	}
}



///////////////////



////////////////////////editar y actualizar


// listaUsuarios.addEventListener("click", seleccionarEditar)

// function seleccionarEditar(e){
// 	  // console.log(e.target.parentElement.id);
// 	  // actualizarUser(e.target);

// 	  form.innerHTML = formularioVista('formEdit'); // clase del formulario edit, de cada un objeto

// 	  console.log(name.value) //input agregar el valor al input

// }

// function actualizarUser(target){
// 	// console.log(target)
// 	if(target.name === 'editar'){
		
// 		/////
// 		console.log(target.parentElement.id); //identificar id de cada objeto en el div principal
		
// 		//////// remover de rails 
		
// 		//// 
// 	}
// }



/////////////////  formulario vista 

function formularioVista(editar){
	console.log(editar)
	return `
		<form id="${(editar !== undefined) ? 'formEdit' : 'userForm'}">
			<div class="form-group">
				<input type="text" placeholder="name" id="name" class="form-control" required>
			</div>
			<div class="form-group">
				<input type="submit" value="${(editar !== undefined) ? 'Edit' : 'save'}" class="btn btn-info btn-block">
			</div>
		</form>	
	`
}


