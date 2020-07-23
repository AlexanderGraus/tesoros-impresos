const borrar = (id) =>{
    fetch('/admin/citas/baja', {
        method: 'UPDATE',
        id
    })
        .then(response => response.json())
        .then(data => message(data));
}

const message = (datos) =>{
    if(datos.success){
        alert('cita eliminada');
    }else{
        alert('error');
    }
}