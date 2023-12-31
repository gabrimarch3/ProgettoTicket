import mongoose, { Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://gabrimarche:Piffioman99@cluster0.mpcku3x.mongodb.net/Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;
