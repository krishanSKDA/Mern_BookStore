import express from 'express';
import {Book} from '../models/bookModel.js';
const router = express.Router();
   //Route for save a new Book
   router.post('/', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'All fields are required:title,author,publishYear',
        });
  
      }
      //Create a new book object from the request body
      const newbook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newbook);
      return response.status(201).send(book);
  
    }
    catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
    // Route for get all books from database
    router.get('/', async (request, response) => {
      try {
        const books = await Book.find({});
        return response.status(200).json({
          count: books.length,
          data: books,
        });
      }
      catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
  });
  
    // Route for get one book from database by id
    router.get('/:id', async (request, response) => {
      try {
  
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
      }
      catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
    });
  
    //Route for Update a Book
    router.put('/:id',async(request,response)=>{
      try{
        if(
          !request.body.title ||
         !request.body.author ||
         !request.body.publishYear
        )
        {
         return response.status(400).send({
           message:'All fields are required:title,author,publishYear',
         });
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);
  
        if(!result)
        {
          return response.status(404),json({message:'Book not Found'});
        }
        return response.status(200).send({message:'Book updatedt successfully'});
      }
      catch(error)
      {
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
    });
  
    //Route for Delete a Book
    router.delete('/:id',async(request,response)=>{
      try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result)
        {
          return response.status(404).json({message:'Book not Found'});
        }
        return response.status(200).send({message:'Book deleted successfully'});
      }
      catch(error)
      {
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
    });

export default router;