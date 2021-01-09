import { EntityRepository, Repository } from "typeorm";
import { ICreateRefreshToken } from "../../common/models/auth/ICreateRefreshToken";
import { RefreshToken } from "../entities/RefreshToken";

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends Repository<RefreshToken> {
    addToken(data: ICreateRefreshToken) {
        const token = this.create(data);
        return token.save();
    }   

    deleteToken(id: string) {
        return this.delete(id);
      }
    
    getById(id: string) {
        return this.findOne(id);
    }
}

export default RefreshTokenRepository;