
// const nuevolibro=required("./classlibro.js");
class libros{
	constructor(titulo,autor,precio){
		this.titulo=titulo;
		this.autor=autor;
		this.precio=precio;
		this.almacennarlibros=[]
	}
	getResumen(){
		let Resumen=`El libro "${this.titulo}" fue escrita por ${this.autor} y tiene un precio de s/${this.precio}`
		return Resumen
	}
	alamcenlibros(libro){
		this.almacennarlibros.push(...Array(libro))
	}
	mostrarlibrosalmacenados(){
		return this.almacennarlibros
	}
}

const libro1=new libros("Los cachorros","Mario Vargas Llosa",59)
const libro2=new libros("Yawar Fiesta","Jose Maria Arguedas",130)
const libro3=new libros("Romeo y Julieta","William Shakespeare",120)
const libro4=new libros("Cien Años de soledad","Gabriel Garcia",140)
const libro5=new libros("Crónica de una muerte anunciada","Gabriel Garcia",100)
const libro6=new libros("El caballero Carmelo","Abraham Valdelomar",90)
const libro7=new libros("Los jefes","Mario vargas",70)
const libro8=new libros("Poema-heraldos negros","Cesar vallejo",90)
const libro9=new libros("La odisea","Homero",90)

const mislibros=new libros("Loa jefes","Mario Vargas",149)
console.log(mislibros.getResumen())
mislibros.alamcenlibros(libro1)
mislibros.alamcenlibros(libro2)
mislibros.alamcenlibros(libro3)
mislibros.alamcenlibros(libro4)
mislibros.alamcenlibros(libro5)
mislibros.alamcenlibros(libro6)
mislibros.alamcenlibros(libro7)
mislibros.alamcenlibros(libro8)
mislibros.alamcenlibros(libro9)
console.log(mislibros.mostrarlibrosalmacenados())
console.log(mislibros)

// console.log(libro3.getResumen())
// console.log(libro1.titulo)
// console.log(libro3)

// const todoslibros=[libro1,libro2,libro3,libro4,libro5,libro6];
const todoslibros=mislibros.mostrarlibrosalmacenados()


class carrito{
	añadircarrito(id){
		// this.listacarrito.push(...Array(lista))
		let listalibros=localStorage.getItem("listacarrito")
		let nwarray=JSON.parse(listalibros)
		let myarray=[]
		let agregarlibro=true
		if (listalibros==null) {
			myarray.push({
			"titulo":todoslibros[id].titulo,
			"autor":todoslibros[id].autor,
			"precio":todoslibros[id].precio
			})
			let array=JSON.stringify(myarray)
			localStorage.setItem("listacarrito",array)
		}else{
			myarray=nwarray
			for (var i = 0; i < myarray.length; i++) {
			if (todoslibros[id].titulo==myarray[i].titulo && todoslibros[id].autor==myarray[i].autor && todoslibros[id].precio==myarray[i].precio) {
				alert("este libro ya esta en el carrito")
				agregarlibro=false
				}
			}
			if (agregarlibro) {
				myarray.push({
				"titulo":todoslibros[id].titulo,
				"autor":todoslibros[id].autor,
				"precio":todoslibros[id].precio
				})
				let array=JSON.stringify(myarray)
				localStorage.setItem("listacarrito",array)
			}
			
		}
	}
	vercarrito(){

		let listalibrosventa=document.querySelector(".listalibros")
		listalibrosventa.innerHTML=""
		let listalibros=localStorage.getItem("listacarrito")
		if (listalibros==null) {
			
		}else{
			let myarray=JSON.parse(listalibros)
			var preciototal=0
			for (var i = 0; i < myarray.length; i++) {
			listalibrosventa.innerHTML+=`
				<div class="libroventa">
					<h2>${myarray[i].titulo}</h2>
					<p>Author: ${myarray[i].autor}</p>
					<p>Precio: ${myarray[i].precio}</p>
					<button type="button" class="btncancelar" data-id="${i}">cancelar</button>
				</div>
				`
			preciototal=preciototal+myarray[i].precio
			}

			listalibrosventa.innerHTML+=`<button type="button" data-preciofinal="${preciototal}"  id="finalizarcompra">finalizar compra</button>`
			listalibrosventa.innerHTML+=`<p>precio total: s/ ${preciototal}</p>`
			listalibrosventa.innerHTML+=`<button type="button" id="cerrarcarrito">cerrar</button>`
			
		}
	}
	quitardelcarrito(indice){
		let arreglo=JSON.parse(localStorage.getItem("listacarrito"))
		let nuevalista=[]
		for (var i = 0; i < arreglo.length; i++) {
			if (i==indice) {
				
			}else{
				nuevalista.push({
					"titulo": arreglo[i].titulo,
					"autor":arreglo[i].autor,
					"precio":arreglo[i].precio
				})
			}
		}	
		localStorage.setItem("listacarrito",JSON.stringify(nuevalista))
	}
	vercantidadcarrito(){
		let arregocarrito=JSON.parse(localStorage.getItem("listacarrito"))
		document.querySelector(".cantidadlibros").innerHTML=arregocarrito.length
	}
	mostrarlista(){
		let listalibros=localStorage.getItem("listacarrito")
		let listaAvender=document.querySelector(".listaventalibros")
		if (listalibros==null) {
		}else{
			let nuevalista=JSON.parse(listalibros)
			if (nuevalista.length==0) {
				listaAvender.classList.remove("mostrar")
			}else{
				listaAvender.classList.add("mostrar")
			}
		}
	}
	finalizarcompra(){
		let listalibros=localStorage.getItem("listacarrito")
		let nuevalista=JSON.parse(listalibros)
		return nuevalista.length
	}
}
	
var accion=new carrito();

window.addEventListener("load",function(){
	
	var seccionlibros=document.querySelector(".libros");
	for (var i = 0; i < todoslibros.length; i++) {
	seccionlibros.innerHTML+=`<div class="libro">
		<h2>${todoslibros[i].titulo}</h2>
		<p>Author: ${todoslibros[i].autor}</p>
		<p>Precio: ${todoslibros[i].precio}</p>
		<button type="button" class="btnvender" data-id="${i}">Comprar</button>
	</div>`
	}	

	let textcantidad=document.querySelector(".cantidadlibros")
	let listalibros=localStorage.getItem("listacarrito")
	let nwarray=JSON.parse(listalibros)		
	if (listalibros==null) {
		textcantidad.innerHTML=0
	}else{
		textcantidad.innerHTML=nwarray.length
	}
})

document.addEventListener("click",function(e){
	if (e.target.matches(".btnvender")) {
		let id=e.target.dataset.id
		accion.añadircarrito(id)//añadiendo al carrito//
		accion.vercantidadcarrito()		
	}else if(e.target.matches(".cantidadlibros")){
		accion.vercarrito()//ver carrito//
		accion.mostrarlista()
	}else if(e.target.matches(".btncancelar")){
		let indice=e.target.dataset.id
		accion.quitardelcarrito(indice)//quitar libro de carrito//
		accion.vercantidadcarrito()
		accion.vercarrito()
		accion.mostrarlista()
	}else if(e.target.matches("#cerrarcarrito")){
		let listaAvender=document.querySelector(".listaventalibros")
		listaAvender.classList.remove("mostrar")
	}else if(e.target.matches("#finalizarcompra")){
		let pfinal=e.target.dataset.preciofinal
		let cantidadlibros=accion.finalizarcompra()
		let nombrecliente=prompt("ingrese su nombre para finalizar la compra")
		if(nombrecliente==null){}else{
			alert("cliente: "+nombrecliente+" ,el costo total es $"+pfinal+" por "+cantidadlibros+" libros")
			localStorage.setItem("listacarrito","[]")
			let listaAvender=document.querySelector(".listaventalibros")
			listaAvender.classList.remove("mostrar")
			accion.vercantidadcarrito()	
		}
	}
})
