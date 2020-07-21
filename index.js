const mongoose = require('mongoose');

//database connection
const mongoDB = 'mongodb://localhost/playground';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB Server : ', err));

//Create database schema
const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5, //no need to be explained you have alreday know the function of this line right?
        maxlength: 255
    }, //to set the data type to be String and required (not null)
    category: {
        type: String,
        required: true,
        enum: ['Web Dev', 'Mobile Dev', 'Desktop App'] //to make an enum
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(valueLength) {
                return valueLength && valueLength.length > 0; //if tags has value and more than zero then true
            },
            message: 'Tags should not be empty!' //but if not return an error message
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 20,
        max: 200
    } //to set the price property to required if isPublished is true Note: you can't use arrow function in here, because arrow function don't have key "this"
}); 

const Course = mongoose.model('Course', courseSchema);

//this is how to insert data into the database
async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        category: 'Web Dev',
        author: 'Ouka',
        tags: ['Angular', 'frontend'],
        isPublished: true,
        price: 40
    });

    try{
        const result = await course.save();
        console.log(result);
    } catch(err){
        console.log('There\'s an error : ', err.message);
    }
}

createCourse();