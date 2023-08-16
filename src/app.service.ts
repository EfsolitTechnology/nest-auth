import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async create(data: any): Promise<User> {
        return this.userRepository.save(data);
    }

   

    //   async update(mobile: any): Promise<User> {
    //     let foundProduct = await this.userRepository.findOne({mobile: mobile});
    
        
    
    //     foundProduct = { ...foundProduct,  updated_at: new Date() };
      
    //     return this.userRepository.save(foundProduct);
    //   }
    async otpVerify(condition: any): Promise<User> {
        return this.userRepository.findOne(condition);
    }
    async findOne(mobile: any): Promise<User> {
         let otp = ("" + Math.random()).substring(2, 6);
         let otpData = {otp:otp}
        await this.userRepository.update( mobile , otpData);
        return await this.userRepository.findOne( mobile );
    }

}
