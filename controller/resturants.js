
const ResturantsPool=require('../model/resturants')
exports.getAllResturants = (request, response) => {
    ResturantsPool.query('SELECT * from resturants', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
