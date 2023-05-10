const Pool=require('pg').Pool
const ResturantsPool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eataway',
    password: 'teciz1234',
    port: 5432,
});

module.exports=ResturantsPool

 