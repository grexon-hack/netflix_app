import { Router } from 'express';
import fetch from 'node-fetch';
import { Category, Content, Favorities, User } from '../models/tableModels.js';
import dotenv from 'dotenv';

const { REACT_APP_ADMIN, REACT_APP_API_KEY } = dotenv.config().parsed;

const router = Router();

router.get('/login/:email/:password', async (req, res) => {
    const { email, password } = req.params;

    try {
        const data = await User.findOne({
            where: {
                email,
                password
            },
            include:["Favorities"]
        })

        if (data) return res.send(data);
        res.status(404).send({ message: 'not found' })

    } catch (error) {
        res.json({ message: error.message })

    }
})

router.post('/', async (req, res) => {
    const { ID, name, email, password } = req.body;

    try {
        const [user, created] = await User.findOrCreate({
            where: {
                email
            },
            defaults: {

                id: ID,
                name,
                password,
                isAdmin: email === REACT_APP_ADMIN && true
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

        const data = await fetch(`http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&s=${categoria}`)
        const dataFull = await data.json();
        dataFull.Search.forEach(async element => {
            const data = await fetch(`http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&i=${element.imdbID}`)
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

        res.send({ message: 'Ok' });
    }
    catch (error) {
        res.json({ message: error.message })

    }
});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const dataUser = await User.findOne({
            where: {
                id
            },
            include:["Favorities"]
        });
        
        res.send(dataUser)
    } catch (error) {
        res.status(404).send({ message: error.message })
    }

})

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

router.post('/favorite', async (req, res) => {
    const {UserId, id, name, image} = req.body;
    
    try {
        const [user, created ] = await Favorities.findOrCreate({
            where: {
                id
            },
            defaults: {
                name,
                image,
                UserId
            }
        })
        
        if (!created) return res.send({ message: `Favorite movie ${user.name} already exists` })
        res.send({ message: 'Favorite movie has been created successfully' })
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
            id: parseInt(id),
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

        res.send({ message: 'was created your content succesfully' });
    } catch (error) {
        res.json({ message: error.message })

    }

});


router.delete('/admin/:id', async (req, res) => {
    const { id } = req.params;

    try {

        await User.destroy({
            where: {
                id
            }
        });

        res.send({ message: 'User was deleted' })

    } catch (error) {
        res.json({ message: error.message })
    }

})


export default router;