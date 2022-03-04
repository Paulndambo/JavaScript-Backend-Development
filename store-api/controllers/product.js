const Product = require("../models/product");


const getAllProductsStatic =  async(req, res) => {
    const search = 'wo'
    try {
        const products = await Product.find().sort("name price").limit(4)
        res.status(200).json({products})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}


const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {}
 
    try {
        if (featured) {
            queryObject.featured = featured === 'true' ? true : false
        }
        if (company) {
            queryObject.company = company
        } 
        if (name) {
            queryObject.name = { $regex: name, $options: 'i' }
        }

        //numerical filtering
        if (numericFilters) {
            const operatorMap = {
                ">": "$gt",
                ">=": "$gte",
                "<": "$lt",
                "<=": "$lte",
                "=": "$eq"
            }

            const regEx = /\b(<|>|>=|=|<|<=)\b/g
            let filters = numericFilters.replace(regEx, (match) => {
                `-${operatorMap[match]}-`
            })
            
            const options = ['price', 'rating']

            filters.split(",").forEach(item => {
                const [field, operator, value] = item.split("-");
                if (options.includes(field)) {
                    queryObject[field] = {[operator]:Number(value)}
                }
            });

        }


       console.log(queryObject)
       //
       //Sorting
        let result = Product.find(queryObject);
        if (sort) {
            const sortList = sort.split(",").join(' ')
            result = result.sort(sortList)
        } else {
            result = result.sort('createdAt')
        }

        //select certain fields
        if (fields) {
            const fieldsList = fields.split(",").join(" ")
            result = result.select(fieldsList)
        }

        //pagination and limit
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit


        result = result.skip(skip).limit(limit);
        const products = await result

        res.status(200).json({products, nbHits: products.length})

    } catch (error) {
        res.status(500).json({msg: error})
    }
}


const getSingleProduct = async (req, res) => {
    try {
        const {id:productId} = req.params;
        const product = await Product.findOne({_id: productId});
        if (!product) {
            res.status(404).json({msg: `Product with id: ${productId} not found`})
        }
        res.status(200).json({product})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}


const createProduct = async (req, res) => {
    try {
        const productDetails = req.body
        const product = await Product.create(productDetails)
        res.status(201).json({product})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}


const updateProduct = async (req, res) => {
    try {
        const {id:productId} = req.params;
        const product = await Product.findOneAndUpdate({_id: productId}, req.body,{
            new: true,
            runValidators: true
        })
        if (!product) {
            res.status(404).json({msg: `Product with id ${productId} not found`})
        }
        res.status(201).json({product})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}


const deleteProduct = async (req, res) => {
    try {
        const {id:productId} = req.params;
        const product = await Product.findOneAndDelete({_id: productId})
        if (!product) {
            res.status(404).json({msg: `Product with id ${productId} not found`})
        }
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}


module.exports = {
    getAllProducts,
    getAllProductsStatic,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}