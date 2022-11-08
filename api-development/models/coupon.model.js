var mongoose = require("mongoose");
const { Schema } = mongoose;

const CouponSchema = new mongoose.Schema(
  {
    coupopnCode: String,
    generatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    validTill: {
      type: Date,
    },
    isVerified: Boolean,
    discountAmt: Number,
    userData: {
      usedBy: {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
      usedOnDate: Date,
    },
    occasion: String,
    isUsed: {
      type: Boolean,
      default: false,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
CouponSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, rec) => {
    delete rec._id;
  },
});
module.exports = mongoose.model("Coupon", CouponSchema, "Coupon");
