var mongoose = require('mongoose')
var Schema = mongoose.Schema


var todoSchema = new Schema ({
    name: String,
    description : String,
    status: String,
    due_date : Date,
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true}
})


var Todo = mongoose.model('Todo', todoSchema)


module.exports = Todo