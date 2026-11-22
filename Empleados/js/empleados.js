window.onload = init;
var headers = {};
var empleados = [];
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        document.getElementById('btn-logout').addEventListener('click', logout);
        document.getElementById('btn-save').addEventListener('click', saveEmpleado);
        document.getElementById('btn-cancel').addEventListener('click', clearForm);
        document.getElementById('btn-search').addEventListener('click', searchEmpleado);
        document.getElementById('btn-all').addEventListener('click', loadEmpleados);
        loadEmpleados();
    }
    else {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

function loadEmpleados() {
    document.getElementById('input-search').value = "";
    axios.get(url + "/empleado", headers).then(function (res) {
        displayEmpleados(res.data.message);
    }).catch(handleError);
}

function searchEmpleado() {
    var name = document.getElementById('input-search').value;
    if (!name) return loadEmpleados();

    axios.get(url + "/empleado/" + name, headers).then(function (res) {
        displayEmpleados(res.data.message);
    }).catch(handleError);
}

function displayEmpleados(lista) {
    empleados = lista;
    var tbody = document.getElementById('table-body');
    tbody.innerHTML = "";
    for (var i = 0; i < lista.length; i++) {
        tbody.innerHTML += `<tr>
            <td>${lista[i].emp_name}</td>
            <td>${lista[i].emp_lastname}</td>
            <td>${lista[i].emp_phone}</td>
            <td>${lista[i].emp_mail}</td>
            <td>${lista[i].emp_address}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editEmpleado(${i})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteEmpleado(${lista[i].emp_id})">Eliminar</button>
            </td>
        </tr>`;
    }
}

function saveEmpleado() {
    var id = document.getElementById('input-id').value;
    var data = {
        emp_name: document.getElementById('input-name').value,
        emp_lastname: document.getElementById('input-lastname').value,
        emp_phone: document.getElementById('input-phone').value,
        emp_mail: document.getElementById('input-mail').value,
        emp_address: document.getElementById('input-address').value
    };

    var request = id ?
        axios.put(url + "/empleado/" + id, data, headers) :
        axios.post(url + "/empleado", data, headers);

    request.then(function (res) {
        alert(res.data.message);
        clearForm();
        loadEmpleados();
    }).catch(handleError);
}

function editEmpleado(i) {
    document.getElementById('form-title').innerText = "Modificar empleado";
    document.getElementById('input-id').value = empleados[i].emp_id;
    document.getElementById('input-name').value = empleados[i].emp_name;
    document.getElementById('input-lastname').value = empleados[i].emp_lastname;
    document.getElementById('input-phone').value = empleados[i].emp_phone;
    document.getElementById('input-mail').value = empleados[i].emp_mail;
    document.getElementById('input-address').value = empleados[i].emp_address;
}

function deleteEmpleado(id) {
    if (!confirm("¿Seguro que deseas eliminar este empleado?")) return;

    axios.delete(url + "/empleado/" + id, headers).then(function (res) {
        alert(res.data.message);
        loadEmpleados();
    }).catch(handleError);
}

function clearForm() {
    document.getElementById('form-title').innerText = "Agregar empleado";
    document.getElementById('input-id').value = "";
    document.getElementById('input-name').value = "";
    document.getElementById('input-lastname').value = "";
    document.getElementById('input-phone').value = "";
    document.getElementById('input-mail').value = "";
    document.getElementById('input-address').value = "";
}

function handleError(err) {
    if (err.response && err.response.status == 401) {
        return logout();
    }
    if (err.response && err.response.status == 404) {
        return displayEmpleados([]);
    }
    alert(err.response ? err.response.data.message : "Ocurrio un error");
}
