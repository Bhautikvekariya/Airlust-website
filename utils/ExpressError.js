module.exports=class ExpressError extends Error{
    constructor(StatusCode,message){
        super();
        this.StatusCode=StatusCode;
        this.message=message;
    }
}
