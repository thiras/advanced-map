
var path=require("path");


module.exports={


    entry:['./scripts/controllers/index.js'],
    output:{

        path:path.resolve(__dirname+"dist"),
        filename:'bundle.js'

    }



};