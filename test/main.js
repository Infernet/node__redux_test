function start() {
    var token="12345"
    // axios.defaults.headers.common = {
    //     'Authorization': 'Bearer ' + token
    // };


    var bodyParameters = {
        key: "value"
    };

    axios.post(
        '/login',
        {},
        {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    ).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    });
}