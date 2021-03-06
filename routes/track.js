const express = require('express')
const trackRouter = express.Router()
const models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op



trackRouter.post('/track', (req, res) => {
    models
        .Track
        .create(req.body, {
            include : [models.Playlist]
        })
        .then(result => {
            res.json(result)
        })
})

trackRouter.put('/track/:id', (req, res) => {
    models
        .Track
        .update(req.body, {
            where : {
                id : req.params.id
            }
        })
        .then(res.send('Ok'))
})

trackRouter.get('/track/:id', (req, res) => {
    models
        .Track
        .findByPk(req.params.id, {
            include: [models.Playlist]
        })
        .then(playlist => res.json(playlist))
})

trackRouter.get('/track', (req, res) => {
    if(req.query.title){
        models
            .Track
            .findAll({
                where : {
                    title : {
                        [Op.like] : `%${req.query.title}%`
                    }
                },
                include : [models.Playlist]
            })
            .then(track => res.json(track))
    }
    else if(req.query.artiste){
        models
            .Track
            .findAll({
                where : {
                    artiste : {
                        [Op.like] : `%${req.query.artiste}%`
                    }
                },
                include : [models.Playlist]
            })
            .then(track => res.json(track))
    }
    else{
        models
            .Track
            .findAll({include : [models.Playlist]})
            .then(track => res.json(track))
    }
})




module.exports = trackRouter