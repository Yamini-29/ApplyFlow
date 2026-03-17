import mongoose from "mongoose"

const YetToApplySchema = new mongoose.Schema({

company: String,

role: String,

jobLink: String,

stage: {
type:String,
enum:[
"Resume Editing",
"Looking Referral",
"Referral Requested",
"Waiting Referral Apply",
"Ready to Apply"
]
},

referralName: String,

referralContact: String,

reminderDate: Date,

notes: String

},{
timestamps:true
})

export default mongoose.models.YetToApply ||
mongoose.model("YetToApply",YetToApplySchema)