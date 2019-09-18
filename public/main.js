var token="";

function start() {
    let bodyParameters = {
        token: token
    };
    axios.post(
        '/request/user/get',
        bodyParameters,
    ).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error);
    });
}

function create() {
    axios.post('/request/login/login', {login: "infernet", password: "admin"})
        .then(response=>console.log(response))
        .catch(reason => console.log(reason))
}