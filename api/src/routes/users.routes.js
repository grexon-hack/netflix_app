import { Router } from 'express';
import fetch from 'node-fetch';
import { Category, Content, User } from '../models/tableModels.js';



const router = Router();

router.get('/login/:email/:password', async (req, res) => {
    const { email, password } = req.params;

    try {
        const data = await User.findOne({
            where: {
                email,
                password
            }
        })

        if (data) return res.send(data);
        res.send({ message: 'not found' })

    } catch (error) {
        res.json({ message: error.message })

    }
})

router.post('/', async (req, res) => {
    const { ID, name, email, password} = req.body;
    
    try {
        const [user, created] = await User.findOrCreate({
            where: {
                email
            },
            defaults: {

                id: ID,
                name,
                password,
                isAdmin: email === "jsarabialugo@gmail.com" && true
            }
        });
        if (!created) return res.send({ message: `user ${user.email} already exists` })
        res.send({ message: 'User has been created successfully' })
    } catch (error) {
        res.json({ message: error.message })

    }


})


router.post('/home', async (req, res) => {
    
    const { categoria, ID } = req.body;

    try {
        const user = await User.findOne({
            where: {
                id: ID
            }
        })

        const data = await fetch("http://www.omdbapi.com/?apikey=508ad5e2&s=" + categoria)
        const dataFull = await data.json();
        dataFull.Search.forEach(async element => {
            const data = await fetch("http://www.omdbapi.com/?apikey=508ad5e2&i=" + element.imdbID)
            const dataFull = await data.json();
            let arrayCategory = dataFull.Genre.length > 1 ? dataFull.Genre.split(' ') : data.Genre;
            let num = Math.floor(((Math.random() * 100) * parseInt(dataFull.imdbID.slice(2))))

            await Content.create({
                id: num,
                name: dataFull.Title,
                image: dataFull.Poster,
                UserId: user.id
            });

            arrayCategory.forEach(async elem => {
                await Category.create({
                    nameCategory: elem,
                    ContentId: num
                })
            })
        });

        res.send({message: 'Ok'});
    }
    catch (error) {
        res.json({ message: error.message })

    }
});

router.get('/home/:ID', async (req, res) => {
    
    const { ID } = req.params;
    
    try {

        const data = await Content.findAll({
            include: [{
                model: User,
                where: {
                    id: ID
                }
            }]
        })

        res.send(data)
    } catch (error) {
        res.json({ message: error.message })
    }
});

router.get('/admin', async (req, res) => {

    try {

        const data = await User.findAll({
            include: [{
                model: Content,
                include: ["Categories"]
            }]
        });

        res.send(data)
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.post('/admin', async (req, res) => {
    const { UserId, id, name, image, nameCategory } = req.body;

    try {
        await Content.create({
            id : parseInt(id),
            name,
            image,
            UserId
        })

        nameCategory.forEach(async element => {

            await Category.create({
                nameCategory: element,
                ContentId: parseInt(id)
            })

        });

        res.send({message: 'was created your content succesfully'});
    } catch (error) {
        res.json({ message: error.message })

    }

});

// router.patch('/admin/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, image } = req.body;
//     try {
//         await Content.update({
//             name, image
//         }, {
//             where: {
//                 id: parseInt(id)
//             }
//         });

//         res.send({message: 'User updated'})
//     } catch (error) {
//         res.json({ message: error.message })
//     }
// })

// router.post('/admin/createUser', async (req, res) => {
//     const { id, name, email, password, picture } = req.body;
//     try {
//         await User.create({
//             id,
//             name,
//             email,
//             password,
//             picture: picture && picture
//         });
//         res.send({message: 'User is Ok'})
//     } catch (error) {
//         res.json({ message: error.message })
//     }

// });

router.delete('/admin/:id', async (req, res) => {
    const { id } = req.params;

    try {

        await User.destroy({
            where: {
                id
            }
        });

        res.send({message: 'User was deleted'})

    } catch (error) {
        res.json({ message: error.message })
    }

})


export default router;