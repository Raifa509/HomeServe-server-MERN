const Users = require('../../models/userModel');
const Bookings = require('../../models/bookingModel');
const Providers = require('../../models/providerModel');

exports.getDashboardStatsController = async (req, res) => {
  try {

    const totalBookings = await Bookings.countDocuments();

    const pendingBookings = await Bookings.countDocuments({ status: 'Confirmed' });


    const completedBookings = await Bookings.countDocuments({ status: 'Completed' });


    const emergencyBookings = await Bookings.countDocuments({ isEmergency: true });


    const totalCustomers = await Users.countDocuments({ role: 'user' });

    const totalProviders = await Providers.countDocuments({ status: 'Active' });

    const year = new Date().getFullYear();
    const monthlyBookingsAgg = await Bookings.aggregate([
      {
        $match: {
          date: { 
            $gte: new Date(`${year}-01-01`), 
            $lte: new Date(`${year}-12-31`) 
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          total: { $sum: 1 }
        }
      }
    ]);

    // Prepare full 12 months array with 0 if no bookings
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      totalBookings: 0
    }));

    monthlyBookingsAgg.forEach(stat => {
      const index = stat._id.month - 1;
      months[index].totalBookings = stat.total;
    });


    res.status(200).json({
      totalBookings,
      pendingBookings,
      completedBookings,
      emergencyBookings,
      totalCustomers,
      totalProviders,
      monthlyBookings: months
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
};

// Get total bookings per service
exports.getBookingsPerServiceController = async (req, res) => {
    try {
        const bookingsPerService = await Bookings.aggregate([
            {
                $group: {
                    _id: "$serviceName",          
                    totalBookings: { $sum: 1 }   
                }
            },
            {
                $project: {
                    serviceName: "$_id",
                    totalBookings: 1,
                    _id: 0
                }
            },
            {
                $sort: { totalBookings: -1 }      
            }
        ]);

        res.status(200).json(bookingsPerService);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
