const mongoose = require('mongoose');


mongoose.connect("CONNECTION_STRING" ,{              /* this line contain the mongodb/daatabase url */
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongodb local host")
}).catch((error) => console.log(error) );

const productSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String, 
        required: true,
        trim: true
    },
    image: {
        type: String, 
        required: true,
        trim: true,
        // validate: {
        //     validator: (url) => url.startsWith('https://') || url.startsWith('http://'),
        //     message: 'Please provide a valid URL (https:// or http://)'
        // }
    }
});

module.exports = mongoose.model('Product', productSchema);
