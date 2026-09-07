const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
    slidingAds: {
        type: [String],
        default: [
            "50% Off Weekend Special!",
            "Try our New Cheese Burst crust!",
            "Fastest Delivery in Town - Guaranteed!"
        ]
    }
});

const PlatformModel = mongoose.model('Platform', platformSchema);

module.exports = PlatformModel;
