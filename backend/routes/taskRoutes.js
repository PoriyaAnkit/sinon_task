const express = require( 'express' );
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require( '../controller/taskctrl' );

const router = express.Router();

router.post( '/', createTask );

router.get( '/', getAllTasks );

router.get( '/:id', getTaskById );

router.put( '/:id', updateTask );

router.delete( '/:id', deleteTask );

module.exports = router;
