import { User } from "./user.entity";
import { Repository } from "typeorm";
export declare class AppService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(data: any): Promise<User>;
    otpVerify(condition: any): Promise<User>;
    findOne(mobile: any): Promise<User>;
}
