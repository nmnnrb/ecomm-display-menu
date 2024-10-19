const express = require('express');
const cors = require('cors');
const Product  = require('./Models/productsmodel');

const app = express();

app.use(cors());
app.use(express.json());



app.get("/" , (req,res)=> {
    res.send("Hello World");
})


// addproducts
app.post("/addproducts" , async (req,res)=> {
    const {title, price, category, image, description } = req.body;
try {
    const newProduct = new Product({title, price, category, image, description});
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct }); 
} catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
}
})



//get all products routes

app.get('/products/' , async (req,res)=> {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
    }
    })


    //get category products only 
app.get('/products/category/:id' , async (req,res)=> {
    const search = req.params.id;
    try {
        const products = await Product.find({category: search});
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
    }
    })

//edit product
    app.put('/products/edit/:id', async (req, res) => {
        const { title, price, description, image } = req.body;
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                { title, price, description, image },
                { new: true } // Return the updated document
            );
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });
    


app.listen(8080);