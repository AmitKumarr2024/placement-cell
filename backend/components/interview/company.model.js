import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, {
  timestamps: true
});

const CompanyModel = mongoose.model('Company', companySchema);

export default CompanyModel;
