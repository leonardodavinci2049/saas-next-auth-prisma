
import cnxDataBase from "./dbConnection";
import { compareSync } from "bcrypt-ts";

type UserType = {
    id?: number;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | null;
 
};

export async function findUserByCredentials(
    email:string, 
    password:string
    ): Promise<UserType | null> {
        const user = await cnxDataBase.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            return null;
        }

        const passwordMatch = compareSync(password, user.password ?? '')
        
        if(passwordMatch){
            return user;
        }

        return null;
        
}