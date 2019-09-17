function start() {
    let bodyParameters = {
        token:"test"
    };
    axios.post(
        '/request/users/get',
        bodyParameters,
    ).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error);
    });
}