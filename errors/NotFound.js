import {StatusCodes} from 'http-status-codes';
import CustomAPIError from './CustomAPI.js';

class NotFound extends CustomAPIError{
    constructor(message)
    {
        super(message);
        this.statusCode=StatusCodes.NOT_FOUND;
    }
}
export default NotFound;