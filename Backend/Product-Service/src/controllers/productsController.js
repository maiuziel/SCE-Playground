export const updateProduct = async (res, req) => {
    try {
        res.status(200).json("update products controller")
    } catch (error) {
        res.status(500).json({error: "error from update function", details: error})
    }
}

export const deleteProduct = async (res, req) => {
    try {
        res.status(200).json("delete products controller")
    } catch (error) {
        res.status(500).json({error: "error from delete function", details: error})
    }
}

export const createProduct = async (res, req) => {
    try {
        res.status(200).json("create products controller")
    } catch (error) {
        res.status(500).json({error: "error from create function", details: error})
    }
}

export const readProduct = async (res, req) => {
    try {
        res.status(200).json("read product controller")
    } catch (error) {
        res.status(500).json({error: "error from read function", details: error})
    }
}

export const readAllProducts = async (res, req) => {
    try {
        res.status(200).json("read all products controller")
    } catch (error) {
        res.status(500).json({error: "error from read all function", details: error})
    }
}
