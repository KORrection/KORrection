import pkg from 'mongoose';
const { Schema, model } = pkg;

const GecSchema = new Schema(
  {
    sentence: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GecModel = model('GEC', GecSchema);

export { GecModel };
