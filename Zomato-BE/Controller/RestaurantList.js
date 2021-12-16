const restList=require('../Model/restaurant');


exports.getAllRestaurants=(req,res)=>{
    restList.find().then(
        result=>{
            res.status(200).json({
                message:"Restaurant names loaded successfully",
                restaurantList :result
            });
        }
    ).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
   
}

exports.getAllLocations=(req,res)=>{
    restList.distinct("city_name").then(
        result=>{
            
            res.status(200).json({
                message:"City names loaded successfully",
                restaurantList :result
            });
        }
    ).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });

}

exports.getAllRestaurantsByLocation=(req,res)=>{
    const city=req.params.cityName;
    restList.find({"city_name":city}).then(
        result=>{
            res.status(200).json({
                message:`Restaurant of ${city} are loaded successfully`,
                restaurantList : result
            });
        }
    ).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
    
}



exports.getRestaurantByName=(req,res)=>{
    const restName=req.params.restName;
    restList.find({"name":restName}).then(
        result=>{
            res.status(200).json({
                message:`Restaurant  loaded successfully`,
                restaurant : result
            });
        }
    ).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
    
}

exports.filterRestaurants=(req,res)=>{
    let { location,
        mealtype,
        cuisine,
        lcost,
        hcost,
        sort=1,
        page=1}=req.body;
    let filters={};
    const itemPerPage=2;
    let startIndex=itemPerPage*(page-1);
    let endIndex=startIndex+2;

    if(location){
        filters.city_name=location;
    }
    if(mealtype){
        filters['type.mealtype']=mealtype;
    }
    if(cuisine){
        filters['Cuisine.name']={ $in : cuisine };
    }
    if(hcost){
        if(lcost){
            filters.cost={$lte : hcost, $gte : lcost };
        }else{
            filters.cost={$lte : hcost};
        }
    }


    restList.find(filters).sort({cost:sort}).then(result=>{
        const filteredResult=result.slice(startIndex,endIndex);
       let pagesCount=Math.round((result.length)/2);
        res.status(200).json({
            message:"Restaurant loaded successfully",
            pageSize:pagesCount,
            page:page,
            totalResultCount:result.length,
            filteredRestaurantList : filteredResult
        });
    }).catch(error=>{
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });  
}