(()=>{
	let form = document.querySelector("#form");
	form.innerHTML = formularioVista()
})()

const listaUsuarios = document.querySelector("#listaUsuarios");
const userForm = document.querySelector("#userForm");
const name = document.querySelector("#name");

const formEdit = document.querySelector("#formEdit");
const nameEdit = document.querySelector("#nameEdit");
const userFormEdit = document.querySelector("#userFormEdit")


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
							 	<a class="btn btn-dark text-info float-right mr-2" name="delete">destroy<a/>
							 	<a class="btn btn-info text-dark float-right mr-2" name="edit">edit<a/>
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


listaUsuarios.addEventListener("click", seleccionarEditar)

function seleccionarEditar(e){
	 
	  let idUser = e.target.parentElement.parentElement.id; // id del div del objeto

	  //console.log(idUser); // id del div del objeto
	  let useFormName;
	  fetch(`${urlJson}/${idUser}`) // traigo el objeto para ponerlo en el formulario
	  	.then(function(response){
				return response.json();
			})
			.then(function(user){
				// console.log(users);
				useFormName = user.name 
				formEdit.innerHTML = formularioVista('userFormEdit',useFormName); // clase del formulario edit, de cada un objeto
				console.log(formEdit.childNodes[3])
			})// trayenfo el objeto 
	 

}




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

function formularioVista(editar,useFormName){
	//console.log(editar)
	return `
		<h3>${(editar !== undefined) ? 'Editar' : 'Agregar'}</h3>
		<form id="${(editar !== undefined) ? 'userFormEdit' : 'userForm'}">
			<div class="form-group">
			<label>Nombre</label>
				<input type="text" value="${(editar !== undefined) ? (useFormName) : 'Agregar'}" id="${(editar !== undefined) ? 'nameEdit' : 'name'}" class="form-control" required>
			</div>
			<div class="form-group">
				<input type="submit" value="${(editar !== undefined) ? 'Edit' : 'save'}" class="btn btn-info btn-block">
			</div>
		</form>	
	`
}


