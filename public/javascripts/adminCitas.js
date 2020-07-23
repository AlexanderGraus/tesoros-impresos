const borrar = (id) =>{
    fetch(`/admin/citas/baja/${id}`, {
        method: 'PUT'
    })
        .then(response => response.json())
        .then(data => message(data));
}

const message = (datos) =>{
    if(datos.success){
        alert('cita eliminada');
        //find(buscar la row con el id eliminado)
        
    }else{
        alert('error');
    }
}
const eliminar =(id) =>{
    
    //borrar elemento

}