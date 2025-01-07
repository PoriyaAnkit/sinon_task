const Task = require( '../models/Task' );
const mongoose = require( 'mongoose' );

exports.createTask = async ( req, res ) => {
    try {
        const { title, description, completed } = req.body;

        if ( title === undefined || description === undefined || completed === undefined ) {
            return res.status( 400 ).json( { error: 'All fields are required' } );
        }

        const task = await Task.create( req.body );
        res.status( 201 ).json( task );
    } catch ( err ) {
        res.status( 400 ).json( { error: err.message } );
    }
};

exports.getAllTasks = async ( req, res ) => {
    try {
        const tasks = await Task.find();
        res.status( 200 ).json( tasks );
    } catch ( err ) {
        res.status( 500 ).json( { error: err.message } );
    }
};

exports.getTaskById = async ( req, res ) => {
    try {
        if ( !mongoose.Types.ObjectId.isValid( req.params.id ) ) {
            return res.status( 400 ).json( { error: 'Invalid Task ID' } );
        }

        const task = await Task.findById( req.params.id );
        if ( !task ) return res.status( 404 ).json( { error: 'Task not found' } );
        res.status( 200 ).json( task );
    } catch ( err ) {
        res.status( 500 ).json( { error: err.message } );
    }
};

exports.updateTask = async ( req, res ) => {
    try {
        const { title, description, completed } = req.body;

        if ( !mongoose.Types.ObjectId.isValid( req.params.id ) ) {
            return res.status( 400 ).json( { error: 'Invalid Task ID' } );
        }

        if ( title === undefined || description === undefined || completed === undefined ) {
            return res.status( 400 ).json( { error: 'All fields are required' } );
        }

        const task = await Task.findByIdAndUpdate( req.params.id, req.body, { new: true } );
        if ( !task ) return res.status( 404 ).json( { error: 'Task not found' } );
        res.status( 200 ).json( task );
    } catch ( err ) {
        res.status( 500 ).json( { error: err.message } );
    }
};

exports.deleteTask = async ( req, res ) => {
    try {
        if ( !mongoose.Types.ObjectId.isValid( req.params.id ) ) {
            return res.status( 400 ).json( { error: 'Invalid Task ID' } );
        }

        const task = await Task.findByIdAndDelete( req.params.id );
        if ( !task ) return res.status( 404 ).json( { error: 'Task not found' } );
        res.status( 200 ).json( { message: 'Task deleted successfully' } );
    } catch ( err ) {
        res.status( 500 ).json( { error: err.message } );
    }
};
