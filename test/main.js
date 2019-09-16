function start() {
    var token="12345"
    // axios.defaults.headers.common = {
    //     'Authorization': 'Bearer ' + token
    // };


    var bodyParameters = {
        key: "value"
    };

    axios.post(
        '/request/login',
        bodyParameters,
        {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    ).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error);
    });
}