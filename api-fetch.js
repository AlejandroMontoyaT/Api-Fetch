
const url = "https://reqres.in/api/users?delay=3"


const getUsersUsingAsyncAwait = async (url) => {

    const resolve = await fetch(url); //JSON CRUDO
    const objetoUsuarios = await resolve.json(); //covertit de JSON a Object
    console.log(objetoUsuarios); // data, page, paginas
    const arregloUsuarios = objetoUsuarios.data; //Guardamos el valor de data en arreglo usuarios que contiene la informacion de cada uno de los usuarios
    console.log(arregloUsuarios); // [{nombre, email, apellido},{nombre, email, apellido},{nombre, email, apellido}...]
    //const valorPagina = objetoUsuarios.page;
    //console.log(valorPagina); // 1

    // Guardar en el Local Storage con la marca de tiempo
    const timestamp = new Date(); //Falta convertir a hora local
    const dataToStore = { info: objetoUsuarios.data, hora: timestamp };
    localStorage.setItem("PrimerRequest", JSON.stringify(dataToStore));

    imprimirCartasEnElHtml( crearCardsDeUsuarios(arregloUsuarios) );

}


const crearCardsDeUsuarios = ( arregloDondeEstanLosUsuarios ) => {
    // [ "<div>...</div", "", "" ];
return arregloDondeEstanLosUsuarios.map( porCadaUsuario => `    
<div class="col-12 col-md-4">
<div class="card mb-2" >
<img src="${porCadaUsuario.avatar}" class="card-img-top rounded-circle" alt="...">
<div class="card-body justify-content-center bg-dark text-light">
<h5 class="card-title">${ porCadaUsuario.first_name} ${porCadaUsuario.last_name}</h5>
<h6 class="card-subtitle mb-2">${ porCadaUsuario.email}</h6>
<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
</div>
</div>
</div>
`  );
}
// [ "<div>...</div", "", "" ]; //Genera un arreglo de cards por cada Usuario

const imprimirCartasEnElHtml = ( arregloDeCartas ) => document.getElementById("user-cards").innerHTML= arregloDeCartas.join("");
                                              //  "<div>...</div" "" "" ;


getUsersUsingAsyncAwait(url);