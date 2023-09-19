const validatePermissions = (req, res, next) => {
    const dataUser = req.user
    console.log({"datauser": dataUser});
    const urlFormat = req.baseUrl.split('/')[1]
    console.log({"validacion": dataUser.rol_access[urlFormat]});
    if(!(urlFormat in dataUser.rol_access)) return res.json({status:401,message: 'This endpoint is not allowed for this user'});

    const allowedMethod = dataUser.rol_access[urlFormat]
    console.log({"allowedMethods": allowedMethod});
    const currentMethod = req.method.toLowerCase();
    console.log({"currentMethod": currentMethod});
    if (!(currentMethod in allowedMethod)) return res.json({status:405, message: 'The method is not allowed'});


    console.log({"url": req.baseUrl});
    let versions = dataUser.rol_access[urlFormat][currentMethod];
    console.log({"versions": versions});
    console.log({"headers": req.headers["accept-version"]});
    if(!(versions.includes(req.headers["accept-version"]))) return res.json({status:505,message: 'This version is not allowed'})
    next()
}    

export {
    validatePermissions
}