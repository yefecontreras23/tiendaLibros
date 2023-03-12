class libr1h{
	constructor(){
		this.almacennarlibros=[]
	}
	alamcenlibros(titulo,autor,precio){
		this.almacennarlibros.push(...Array({
			"titulo":titulo,
			"autor":autor,
			"precio":precio
		}))
	}
	eliminarlibro(id){
		let nuevalista=[]
		for (var i = 0; i < this.almacennarlibros.length; i++) {
			if (i==id) {
				
			}else{
				nuevalista.push({
					"titulo": this.almacennarlibros[i].titulo,
					"autor":this.almacennarlibros[i].autor,
					"precio":this.almacennarlibros[i].precio
				})
			}
		}
		this.almacennarlibros=nuevalista
	}
	editarlibro(id,ntitulo,nautor,nprecio){
		let nuevalista=[]
		for (var i = 0; i < this.almacennarlibros.length; i++) {
			if (i==id) {
				nuevalista.push({
					"titulo": ntitulo,
					"autor":nautor,
					"precio":nprecio
				})
			}else{
				nuevalista.push({
					"titulo": this.almacennarlibros[i].titulo,
					"autor":this.almacennarlibros[i].autor,
					"precio":this.almacennarlibros[i].precio
				})
			}
		}
		this.almacennarlibros=nuevalista
	}
	mostrarlibrosalmacenados(){
		return this.almacennarlibros
	}
}

const nuevolibr1h=new libr1h()
var indexlibro

function recargarlibros(lista){
	var seccionlibros=document.querySelector(".libros");
	seccionlibros.innerHTML=""
	for (var i = 0; i < lista.length; i++) {
	seccionlibros.innerHTML+=`<div class="libro">
		<h2>${lista[i].titulo}</h2>
		<p>Author: ${lista[i].autor}</p>
		<p>Precio: ${lista[i].precio}</p>
		<button type="button" class="editar" data-id="${i}">Editar</button>
		<button type="button" class="eliminar" data-id="${i}">Eliminar</button>
	</div>`
	}	
}


document.addEventListener("click",function(e){
	if (e.target.matches(".editar")) {
		let id=e.target.dataset.id
		indexlibro=e.target.dataset.id
		let libro=nuevolibr1h.mostrarlibrosalmacenados()
		document.querySelector("#index").value=1
		document.querySelector("#titulo").value=libro[id].titulo
		document.querySelector("#autor").value=libro[id].autor
		document.querySelector("#precio").value=libro[id].precio

	}else if(e.target.matches(".eliminar")){
		let id=e.target.dataset.id

		nuevolibr1h.eliminarlibro(id)
		recargarlibros(nuevolibr1h.mostrarlibrosalmacenados())
		document.querySelector("#titulo").value=""
		document.querySelector("#autor").value=""
		document.querySelector("#precio").value=""

	}else if(e.target.matches("#enviar")){
		if (document.querySelector("#index").value==1) {
			let ntitulo=document.querySelector("#titulo").value
			let nautor=document.querySelector("#autor").value
			let nprecio=document.querySelector("#precio").value
			nuevolibr1h.editarlibro(indexlibro,ntitulo,nautor,nprecio)
			document.querySelector("#index").value=0
		} else {
			let titulo=document.querySelector("#titulo").value
			let autor=document.querySelector("#autor").value
			let precio=document.querySelector("#precio").value
		
			nuevolibr1h.alamcenlibros(titulo,autor,precio)
		}
		recargarlibros(nuevolibr1h.mostrarlibrosalmacenados())
		document.querySelector("#titulo").value=""
		document.querySelector("#autor").value=""
		document.querySelector("#precio").value=""
	}
})
