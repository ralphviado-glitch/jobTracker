import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
  {
    user: { 
	    type: mongoose.Schema.Types.ObjectId, 
		  ref: "User", 
		  required: true 
	  },

    company: { 
	    type: String, 
		  required: true 
	  },

    position: { 
    	type: String, 
    	required: true 
    },

    status: { 
    	type: String, 
    	enum: ["Applied", "Interview", "Offer", "Rejected"], 
    	default: "Applied" 
    },

    appliedAt: { 
      type: Date, 
	    default: Date.now 
    },

    followUpDate: {
      type: Date
    },

    notes: {
      type: String,
      default: ""
    }
  },

    { timestamps: true },
    
);

export default mongoose.model("JobApplication", JobApplicationSchema);
