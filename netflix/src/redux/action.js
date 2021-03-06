
export function getUser(email, password) {
    return function (dispath) {

        return fetch(`http://localhost:3001/login/${email}/${password}`)
            .then(data => data.json())
            .then(data => {
                dispath({ type: 'GETUSER', payload: data })
                return data;
            })
    }

}

export function getUserById(id) {
    return function (dispatch) {
        return fetch('http://localhost:3001/user/' + id)
            .then(data => data.json())
            .then(data => dispatch({ type: 'GETUSER', payload: data }))
    }
}

export function postUser(value) {

    return function (dispath) {
        return fetch('http://localhost:3001/', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }
        })


    }
}

export function postCategories(value) {

    return function (dispath) {
        value.categoria.map(async (elem) => {

            return fetch('http://localhost:3001/home', {
                method: 'POST',
                body: JSON.stringify({ categoria: elem, ID: value.ID.props }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })

    }
}

export function getContentUser({ ID }) {

    return function (dispath) {
        return fetch('http://localhost:3001/home/' + ID)
            .then(data => data.json())
            .then(data => dispath({ type: 'CONTENTUSER', payload: data }))
    }
}

export function postFavorite(value) {
    return function (dispatch) {
        return  fetch('http://localhost:3001/favorite', {
                method: "POST",
                body: JSON.stringify(value),
                headers: {
                'Content-Type': 'application/json'
                }

            }).then(data => data.json())
            .then(data => {
                return data.message
            })
         
    }
}

export function detailCard(id) {
    return {
        type: 'DETAILCARD',
        payload: id
    }
}

export function adminUsers() {
    return function (dispath) {
        return fetch('http://localhost:3001/admin')
            .then(data => data.json())
            .then(data => dispath({ type: 'CONTENTUSER', payload: data }))
    }
}

export function deleteUser(val) {
    return function (dispath) {
        return fetch('http://localhost:3001/admin/' + val, {
            method: 'DELETE'
        })
            .then(data => data.json())
            .then(data => {
                if (data.message === 'User was deleted')
                    dispath({ type: 'DELETEUSER', payload: val })
            })
    }
}

export function postCreateMovie(value) {

    return function (dispath) {
        const data = fetch('http://localhost:3001/admin', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                alert(data.message)
            })



    }
}