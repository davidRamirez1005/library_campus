import genCollection from '../helpers/db.js';

/**
 * ! GET
 */
/**
 * * encontrar los productos que esten disponibles. agotados y proximos
*/
export const findAvailable = [
    {
        $match: {
            $or: [
                { status: 'disponible' },
                { status: 'agotado' },
                { status: 'proximo' },
            ]
        }
    }
]
/**
 * * encontrar los productos que esten disponibles de la categoria libros
*/
export const findAvaliableBooks = [
    {
        $match: {
            status: "disponible",
            type: "libros"
        }
    }
];
/**
 * * encontrar los productos que esten prestados con la informacion del usuario
*/
export const findBorrowed = [
    {
    $match: {
        status: "prestado",
    }
    },
    {
    $lookup: {
        from: "User",
        localField: "user_identification",
        foreignField: "_id",
        as: "user"
    }
    },
    {
    $project: {
        _id: 1,
        title: 1,
        description: 1,
        type: 1,
        status: 1,
        user_identification: 1,
        start_date : 1,
        final_date : 1,
        user: {
        username: 1,
        identification: 1,
        email : 1,
        phone : 1,
        team : 1
        }
    }
    }
]
/**
 * * listar el historial de productos prestados por un usuario en especifico de la fecha mas reciente hacia atras
*/
export const findIdUser = (user_id2) => [
    {
        $match: {
            identification: user_id2,
        },
    },
    {
        $project: {
            _id: 1,
        },
    },
]
export const aggregateProduct = (userIdentification) => [
        {
        $match: {
            status: "prestado",
            user_identification : userIdentification,
        },
        },
        {
        $lookup: {
            from: "User",
            localField: "user_identification",
            foreignField: "_id",
            as: "user",
        },
        },
        {
        $sort: {
            final_date: -1,
        },
        },
        {
        $project: {
            _id: 1,
            title: 1,
            description: 1,
            type: 1,
            status: 1,
            user_identification: 1,
            start_date: 1,
            final_date: 1,
            user: {
            username: 1,
            identification: 1,
            email: 1,
            phone: 1,
            team: 1,
            },
        },
        },
    ]
/**
 * * encontrar los productos con final_date mas cercanos a la fecha actual con la informacion del user
*/
export const findProductCloseDate = [
    {
        $match: {
            status: "prestado"
        }
    },
    {
        $sort: {
            final_date: -1
        }   
    },
    {
        $lookup: {
            from: "User",
            localField: "user_identification",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $project: {
            _id: 1,
            title: 1,
            description: 1,
            type: 1,
            status: 1,
            user_identification: 1,
            start_date : 1,
            final_date : 1,
            user: {
            username: 1,
            identification: 1,
            email : 1,
            phone : 1,
            team : 1
            }
        }
    },
    {
        $limit: 30
    }
]
/**
 * * listar los productos libros con status entregado
*/
export const findBooksDelivered = [
    {
        $match: {
            status: "entregado",
            type: "libros"
        }
    },
    {
        $lookup: {
            from: "User",
            localField: "user_identification",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $project: {
            _id: 1,
            title: 1,
            description: 1,
            type: 1,
            status: 1,
            user_identification: 1,
            start_date : 1,
            final_date : 1,
            user: {
            username: 1,
            identification: 1,
            email : 1,
            phone : 1,
            team : 1
            }
        }
    },
    {
        $limit: 30
    }
]
/**
 * * listar los productos libros con status reservado
*/
export const findBooksReserved = [
    {
        $match: {
            status: "reservado",
            type: "libros"
        }
    },
    {
        $lookup: {
            from: "User",
            localField: "user_identification",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $project: {
            _id: 1,
            title: 1,
            description: 1,
            type: 1,
            status: 1,
            user_identification: 1,
            start_date : 1,
            final_date : 1,
            user: {
            username: 1,
            identification: 1,
            email : 1,
            phone : 1,
            team : 1
            }
        }
    },
    {
        $limit: 30
    }
]
/**
 * * listar todos los users
*/
export const findUsers = {
    rol : 0
}
/**
 *  * obtener el historial por usuario especificado por medio de la identificacion
 */
export const userHistoryCompleted = (id_user) => [
    {
        $match: {
            user_identification: id_user
        }
    },
]
/**
 * ! POST
 */
/**
 * * insertar un nuevo producto
*/
export const insertNewProduct = {
    title: "libro nuevo",
    description: "libro en excelentes condiciones",
    type: "libros",
    status: "disponible"
}
/**
 * * insertar un nuevo producto en condicion de prestado
*/
// const user_id = "1096065071"
// export const insertProductBorrowed = {
//     title: "libro nuevo prestado2",
//     description: "libro en excelentes condiciones",
//     type: "libros",
//     status: "prestado",
//     start_date : new Date('2023-09-20'),
//     final_date : new Date('2023-10-30'),
//     user_identification: Number(db.User.findOne({
//         identification: user_id
//     })._id)
// }
/**
 * * agregar un nuevo Admin
*/
export const insertNewAdmin = {
    full_name: "admin nuevo",
    identification : "2222222",
    email: "adminnuevo@gmail.com",
    password: "jose1005",
    rol : 3
}
/**
 * * obtener el producto favorito, el mas prestado
*/
export const productFavorite = [
    {
    $match: {
        type: "libros"
    }
    },
    {
    $group: {
        _id: {
        title: "$title"
        },
        count: {
        $sum: 1
        }
    }
    },
    {
    $sort: {
        count: -1
    }
    },
    {
    $limit: 1
    }
]
/**
 * ! PUT
 */
/**
 * * actualizar un status de producto de prestado a entregado por medio del id
*/
// const product_id = 5;
// export const updateStatusDelivery = [
//     {
//         _id: product_id
//     },
//     {
//         $set: {
//             status: "entregado"
//         }
//     }
// ]
/**
 * * actualizar un status de producto de disponible a agotado por medio del _id
*/
// const product_id2 = 5;
// export const updateStatusSpend = [
//     {
//         _id: product_id2
//     },
//     {
//         $set: {
//             status: "agotado"
//         }
//     }
// ]
/**
 * ! DELETE
 */
/**
 * * eliminar un Admin por medio de la cedula
*/
// const deleteId = "2222222"
// export const deleteAdmin = {
//     identification: deleteId
// }